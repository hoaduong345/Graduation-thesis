const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const StatisticsController = {
    getStatictics: async (req, res) => {
        try {
            const { startDate } = req.query;
            const { endDate } = req.query;
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 40;
            const skip = (page - 1) * pageSize; // Số lượng sản phẩm được bỏ qua (trang đầu tiên)
            const take = pageSize; // Số lượng sản phẩm được lấy

            const currentDate = new Date();
            const yesterday = new Date(currentDate);
            yesterday.setHours(23, 59, 59, 999);
            yesterday.setDate(currentDate.getDate() - 1);
            const oneWeekAgo = new Date(yesterday);
            oneWeekAgo.setHours(0, 0, 0, 0);
            oneWeekAgo.setDate(yesterday.getDate() - 7);

            const startOfDay = new Date(currentDate);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(currentDate);
            endOfDay.setHours(23, 59, 59, 999);
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const firstDayOfCurrentMonth = new Date(currentYear, currentMonth - 1, 1);
            const lastDayOfCurrentMonth = new Date(currentYear, currentMonth, 0);
            const totalQuantityCurrentMonth = await prisma.orderDetail.aggregate({
                where: {
                    createdAt: {
                        gte: firstDayOfCurrentMonth,
                        lte: lastDayOfCurrentMonth,
                    },
                },
                _sum: {
                    quantity: true,
                },
            });

            const orderCurrentMonth = await prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: firstDayOfCurrentMonth,
                        lte: lastDayOfCurrentMonth,
                    },
                },
                include: {
                    OrderDetail: {
                        select: {
                            productOrder: {
                                select: {
                                    id: true,
                                    name: true,
                                    soldcount: true,
                                    createdAt: true,
                                },
                            },
                        },
                    },
                },
            });

            const topProductsCurrent = await prisma.orderDetail.groupBy({
                by: ['name', 'productId', 'total', 'id', 'quantity', 'price'],
                _sum: {
                    quantity: true,
                },
                where: {
                    createdAt: {
                        gte: firstDayOfCurrentMonth,
                        lte: lastDayOfCurrentMonth,
                    },
                },
                orderBy: {
                    _sum: {
                        quantity: 'desc',
                    },
                },
                skip,
                take,
            });

            let totalRevenueCurrentMonth = 0;
            let totalQuantitySoldCurrentMonth = 0;

            let totalRevenueToday = 0;
            let totalQuantitySoldToday = 0;

            orderCurrentMonth.forEach((order) => {
                totalRevenueCurrentMonth += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldCurrentMonth += order.OrderDetail.reduce(
                        (acc, detail) => acc + detail.productOrder.soldcount,
                        0
                    );
                }
            });

            const productDetailsCurrentMonth = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: firstDayOfCurrentMonth,
                        lte: lastDayOfCurrentMonth,
                    },
                },
                include: {
                    productOrder: {
                        select: {
                            id: true,
                            name: true,
                            soldcount: true,
                            createdAt: true,
                        },
                    },
                },
            });

            // Create a dictionary to store product details
            const productDetailsDictionary = {};

            productDetailsCurrentMonth.forEach((orderDetail) => {
                const productInfo = orderDetail.productOrder;

                if (productInfo) {
                    const productId = productInfo.id;

                    if (!productDetailsDictionary[productId]) {
                        productDetailsDictionary[productId] = {
                            name: productInfo.name,
                            totalQuantityBought: 0,
                            createdAt: productInfo.createdAt,
                        };
                    }

                    productDetailsDictionary[productId].totalQuantityBought += productInfo.soldcount;
                }
            });

            const totalOrdersCurrentMonth = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: firstDayOfCurrentMonth,
                        lte: lastDayOfCurrentMonth,
                    },
                },
            });

            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            // Lấy danh sách đơn hàng trong khoảng 7 ngày trước đến ngày hôm nay
            const ordersLast7Days = await prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: sevenDaysAgo,
                        lte: currentDate,
                    },
                },
            });
            const topProductsLast7Days = await prisma.orderDetail.groupBy({
                by: ['name', 'productId', 'total', 'id', 'quantity', 'price'],
                _sum: {
                    quantity: true,
                },
                where: {
                    createdAt: {
                        gte: sevenDaysAgo,
                        lte: currentDate,
                    },
                },
                orderBy: {
                    _sum: {
                        quantity: 'desc',
                    },
                },
                skip,
                take,
            });

            // Tính tổng doanh thu và tổng số lượng sản phẩm đã bán trong khoảng 7 ngày
            let totalRevenueLast7Days = 0;
            let totalQuantitySoldLast7Dayss = 0;

            ordersLast7Days.forEach((order) => {
                totalRevenueLast7Days += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldLast7Days += order.OrderDetail.reduce(
                        (acc, detail) => acc + detail.productOrder.soldcount,
                        0
                    );
                }
            });
            const totalQuantitySoldLast7Days = await prisma.orderDetail.aggregate({
                where: {
                    createdAt: {
                        gte: sevenDaysAgo,
                        lte: currentDate,
                    },
                },
                _sum: {
                    quantity: true,
                },
            });

            const totalOrdersLast7Days = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: sevenDaysAgo,
                        lte: currentDate,
                    },
                },
            });

            // Tính số % tổng doanh thu trong khoảng 7 ngày trước so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageLast7Days = (totalRevenueLast7Days / totalRevenueCurrentMonth) * 100;

            // Tính phần trăm số lượng sản phẩm đã bán trong khoảng 7 ngày trước so với tổng doanh thu trong tháng hiện tại
            const productSoldPercentageLast7Days =
                (totalQuantitySoldLast7Days._sum.quantity / totalQuantitySoldCurrentMonth) * 100;

            const fifteenDaysAgo = new Date();
            fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

            const topProductsLast15Days = await prisma.orderDetail.groupBy({
                by: ['name', 'productId', 'total', 'id', 'quantity', 'price'],
                _sum: {
                    quantity: true,
                },
                where: {
                    createdAt: {
                        gte: fifteenDaysAgo,
                        lte: currentDate,
                    },
                },
                orderBy: {
                    _sum: {
                        quantity: 'desc',
                    },
                },
                skip,
                take,
            });

            const orderLast15Days = await prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: fifteenDaysAgo,
                        lte: currentDate,
                    },
                },
                include: {
                    OrderDetail: {
                        select: {
                            productOrder: {
                                select: {
                                    id: true,
                                    name: true,
                                    soldcount: true,
                                    createdAt: true,
                                },
                            },
                        },
                    },
                },
            });

            let totalRevenueLast15Days = 0;

            let totalQuantitySoldLast15Dayss = 0;

            orderLast15Days.forEach((order) => {
                totalRevenueLast15Days += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldCurrentMonth += order.OrderDetail.reduce(
                        (acc, detail) => acc + detail.productOrder.soldcount,
                        0
                    );
                }
            });
            const totalQuantitySoldLast15Days = await prisma.orderDetail.aggregate({
                where: {
                    createdAt: {
                        gte: fifteenDaysAgo,
                        lte: currentDate,
                    },
                },
                _sum: {
                    quantity: true,
                },
            });
            const totalOrdersLast15Days = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: fifteenDaysAgo,
                        lte: currentDate,
                    },
                },
            });
            // Tính số % tổng doanh thu trong khoảng 15 ngày trước so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageLast15Days = (totalRevenueLast15Days / totalRevenueCurrentMonth) * 100;

            // Tính phần trăm số lượng sản phẩm đã bán trong khoảng 15 ngày trước so với tổng doanh thu trong tháng hiện tại
            const productSoldPercentageLast15Days =
                (totalQuantitySoldLast15Days._sum.quantity / totalQuantitySoldCurrentMonth) * 100;

            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const topProductsLast30Days = await prisma.orderDetail.groupBy({
                by: ['name', 'productId', 'total', 'id', 'quantity', 'price'],
                _sum: {
                    quantity: true,
                },
                where: {
                    createdAt: {
                        gte: thirtyDaysAgo,
                        lte: currentDate,
                    },
                },
                orderBy: {
                    _sum: {
                        quantity: 'desc',
                    },
                },
                skip,
                take,
            });

            const orderLast30Days = await prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: thirtyDaysAgo,
                        lte: currentDate,
                    },
                },
                include: {
                    OrderDetail: {
                        select: {
                            productOrder: {
                                select: {
                                    id: true,
                                    name: true,
                                    soldcount: true,
                                    createdAt: true,
                                },
                            },
                        },
                    },
                },
            });

            let totalRevenueLast30Days = 0;

            let totalQuantitySoldLast30Dayss = 0;

            orderLast30Days.forEach((order) => {
                totalRevenueLast30Days += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldCurrentMonth += order.OrderDetail.reduce(
                        (acc, detail) => acc + detail.productOrder.soldcount,
                        0
                    );
                }
            });
            const totalQuantitySoldLast30Days = await prisma.orderDetail.aggregate({
                where: {
                    createdAt: {
                        gte: thirtyDaysAgo,
                        lte: currentDate,
                    },
                },
                _sum: {
                    quantity: true,
                },
            });

            const totalOrdersLast30Days = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: thirtyDaysAgo,
                        lte: currentDate,
                    },
                },
            });
            // Tính số % tổng doanh thu trong khoảng 30 ngày trước so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageLast30Days = (totalRevenueLast30Days / totalRevenueCurrentMonth) * 100;

            // Tính phần trăm số lượng sản phẩm đã bán trong khoảng 30 ngày trước so với tổng doanh thu trong tháng hiện tại
            const productSoldPercentageLast30Days =
                (totalQuantitySoldLast30Days._sum.quantity / totalQuantitySoldCurrentMonth) * 100;

            const orderInTimeRange = await prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: startDateObj,
                        lte: endDateObj,
                    },
                },
                include: {
                    OrderDetail: {
                        select: {
                            productId: true,
                            quantity: true,
                        },
                    },
                },
            });

            const productQuantityMap = {};

            orderInTimeRange.forEach((order) => {
                if (order.OrderDetail) {
                    order.OrderDetail.forEach((detail) => {
                        const productId = detail.productId;
                        const quantity = detail.quantity;

                        if (productQuantityMap[productId]) {
                            productQuantityMap[productId] += quantity;
                        } else {
                            productQuantityMap[productId] = quantity;
                        }
                    });
                }
            });

            const topProductsInRange = await prisma.orderDetail.groupBy({
                by: ['name', 'productId', 'total', 'id', 'quantity', 'price'],
                _sum: {
                    quantity: true,
                },
                where: {
                    createdAt: {
                        gte: startDateObj,
                        lte: endDateObj,
                    },
                },
                orderBy: {
                    _sum: {
                        quantity: 'desc',
                    },
                },
                skip,
                take,
            });

            let totalRevenueInRange = 0;
            let totalQuantitySoldInRanges = 0;

            orderInTimeRange.forEach((order) => {
                totalRevenueInRange += order.amountTotal;
                if (order.OrderDetail) {
                    totalRevenueCurrentMonth += order.OrderDetail.reduce((acc, detail) => acc + detail.quantity, 0);
                }
            });
            const totalQuantitySoldInRange = await prisma.orderDetail.aggregate({
                where: {
                    createdAt: {
                        gte: startDateObj,
                        lte: endDateObj,
                    },
                },
                _sum: {
                    quantity: true,
                },
            });
            const totalOrdersInRange = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: startDateObj,
                        lte: endDateObj,
                    },
                },
            });

            // Tính % tổng doanh thu trong khoảng thời gian được chỉ định so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageInRange = (totalQuantitySoldInRange._sum.quantity / totalRevenueCurrentMonth) * 100;

            // Tính phần trăm số lượng sản phẩm đã bán trong khoảng thời gian được chỉ định so với tổng doanh thu trong tháng hiện tại
            const productSoldPercentageInRange = (totalQuantitySoldToday / totalQuantitySoldCurrentMonth) * 100;

            // Tính số lượng sản phẩm đã bán và tổng doanh thu trong ngày hôm nay (hiện tại)
            const ordersToday = orderCurrentMonth.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return (
                    orderDate.getFullYear() === currentYear &&
                    orderDate.getMonth() === currentMonth - 1 &&
                    orderDate.getDate() === currentDate.getDate()
                );
            });

            ordersToday.forEach((order) => {
                totalRevenueToday += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldToday += order.OrderDetail.reduce(
                        (acc, detail) => acc + detail.productOrder.soldcount,
                        0
                    );
                }
            });
            const totalQuantityInToday = await prisma.orderDetail.aggregate({
                where: {
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
                _sum: {
                    quantity: true,
                },
            });
            // Tính % tổng doanh thu trong ngày hôm nay so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageToday = (totalRevenueToday / totalRevenueCurrentMonth) * 100;

            // Tính phần trăm số lượng sản phẩm đã bán trong ngày hôm nay so với tổng số lượng sản phẩm đã bán trong tháng hiện tại
            const productSoldPercentageToday =
                (totalQuantityInToday._sum.quantity / totalQuantitySoldCurrentMonth) * 100;

            // Tính phần trăm số lượng sản phẩm đã bán trong ngày hôm nay so với tổng số lượng sản phẩm đã bán trong tháng hiện tại
            const productSoldPercentageCurrent =
                (totalQuantityCurrentMonth._sum.quantity / totalQuantitySoldToday) * 100;

            // Tính phần trăm doanh thu của tháng hiện tại so với doanh thu trong ngày hôm nay
            const revenuePercentageCurrent = (totalRevenueCurrentMonth / totalRevenueToday) * 100;

            // Lấy ra sản phẩm hot trong ngày hôm nay (dựa trên quantity)
            const productQuantityMapToday = {};

            // Lặp qua các đơn hàng trong ngày hôm nay
            ordersToday.forEach((order) => {
                if (order.OrderDetail) {
                    order.OrderDetail.forEach((detail) => {
                        const productId = detail.productId;
                        const quantity = detail.quantity;

                        // Kiểm tra nếu sản phẩm đã tồn tại trong bản đồ, thì cộng thêm vào số lượng hiện tại
                        if (productQuantityMapToday[productId]) {
                            productQuantityMapToday[productId] += quantity;
                        } else {
                            productQuantityMapToday[productId] = quantity;
                        }
                    });
                }
            });

            const topProductsInToday = await prisma.orderDetail.groupBy({
                by: ['name', 'productId', 'total', 'id', 'quantity', 'price'],
                _sum: {
                    quantity: true,
                },
                where: {
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
                orderBy: {
                    _sum: {
                        quantity: 'desc',
                    },
                },
                skip,
                take,
            });

            const totalOrdersInToday = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            });

            const categoryStatsByDay = {};
            console.log(yesterday);
            for (let date = yesterday; date >= oneWeekAgo; date.setDate(date.getDate() - 1)) {
                const startDate = new Date(date);
                const endDate = date;
                startDate.setHours(0);
                startDate.setMinutes(0);
                startDate.setSeconds(0);

                const categories = await prisma.category.findMany({
                    include: {
                        products: {
                            where: {
                                date: {
                                    gte: startDate, // Ngày bắt đầu là 7 ngày trước ngày hôm qua
                                    lte: endDate, // Ngày kết thúc là ngày hôm qua
                                },
                            },
                        },
                    },
                });

                const topCategories = categories.map((category) => {
                    return {
                        category: category,
                        totalSoldCount: category.products.reduce(
                            (total, product) => total + (product.soldcount || 0),
                            0
                        ),
                    };
                });

                // Sắp xếp danh mục theo số sản phẩm đã bán giảm dần
                topCategories.sort((a, b) => b.totalSoldCount - a.totalSoldCount);

                // Lưu kết quả vào categoryStatsByDay dựa trên ngày tương ứng
                categoryStatsByDay[date.toISOString().split('T')[0]] = topCategories;
            }

            res.status(200).json({
                // totalRevenueCurrentMonth,
                // totalQuantityCurrentMonth: totalQuantityCurrentMonth._sum.quantity,
                // purchaseOrShoppingCurrentMonth: totalOrdersCurrentMonth,
                // revenuePercentageCurrent: revenuePercentageCurrent.toFixed(1), // phan tram doanh thu trong thang hien tai so voi ngay hien tai
                // productSoldPercentageCurrent: productSoldPercentageCurrent.toFixed(1), // phan tram so luong san pham ban ra trong thang hien tai so voi ngay hien tai
                // productDetailsCurrentMonth: Object.values(productDetailsDictionary),
                // hotProductsCurrent: topProductsCurrent, // Danh sách sản phẩm hot (lượng mua cao nhất trong 30 ngày trước)

                // totalRevenueLast7Days,
                // totalQuantitySoldLast7Days: totalQuantitySoldLast7Days._sum.quantity,
                // purchaseOrShoppingLast7Days: totalOrdersLast7Days,
                // revenuePercentageLast7Days: revenuePercentageLast7Days.toFixed(1),
                // productSoldPercentageLast7Days: productSoldPercentageLast7Days.toFixed(1),
                // hotProductLast7days: topProductsLast7Days,

                // totalRevenueLast15Days,
                // totalQuantitySoldLast15Days: totalQuantitySoldLast15Days._sum.quantity,
                // purchaseOrShoppingLast15Days: totalOrdersLast15Days,
                // revenuePercentageLast15Days: revenuePercentageLast15Days.toFixed(1),
                // productSoldPercentageLast15Days: productSoldPercentageLast15Days.toFixed(1),
                // hotProductLast15days: topProductsLast15Days,

                // totalRevenueLast30Days,
                // totalQuantitySoldLast30Days: totalQuantitySoldLast30Days._sum.quantity,
                // purchaseOrShoppingLast30Days: totalOrdersLast30Days,
                // revenuePercentageLast30Days: revenuePercentageLast30Days.toFixed(1),
                // productSoldPercentageLast30Days: productSoldPercentageLast30Days.toFixed(1),
                // hotProductLast30days: topProductsLast30Days,

                totalRevenueInRange,
                totalQuantitySoldInRange: totalQuantitySoldInRange._sum.quantity,
                purchaseOrShoppingInRange: totalOrdersInRange, // tong luot mua hang trong khoang thoi gian
                revenuePercentageInRange: revenuePercentageInRange.toFixed(1),
                productSoldPercentageInRange: productSoldPercentageInRange.toFixed(1),
                hotProductsInRange: topProductsInRange,

                // totalRevenueToday, // Tổng doanh thu trong ngày hôm nay
                // totalQuantity: totalQuantityInToday._sum.quantity, // Số lượng tung sản phẩm đã bán trong ngày hôm nay
                // purchaseOrShoppingInToday: totalOrdersInToday, // tong luot mua hang trong ngay hien tai
                // revenuePercentageToday: revenuePercentageToday.toFixed(1), // phan tram doanh thu trong ngay hien tai so voi thang hien tai
                // productSoldPercentageToday: productSoldPercentageToday.toFixed(1), // phan tram so luong san pham ban ra trong ngay hien tai so voi thang hien tai
                // hotProductsInToday: topProductsInToday,
                // sortedCategoriesToday: categoryStatsByDay,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    },
};

module.exports = StatisticsController;
