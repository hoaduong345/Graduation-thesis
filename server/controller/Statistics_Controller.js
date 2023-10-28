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
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const firstDayOfCurrentMonth = new Date(currentYear, currentMonth - 1, 1);
            const lastDayOfCurrentMonth = new Date(currentYear, currentMonth, 0);

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

            const topProductsCurrent = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: firstDayOfCurrentMonth,
                        lte: lastDayOfCurrentMonth,
                    },
                },
                orderBy: {
                    quantity: 'desc',
                },
                skip,
                take,
            });

            let totalRevenueCurrentMonth = 0;
            let totalQuantitySoldCurrentMonth = 0;

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

            // const sevenDaysAgo = new Date();
            // sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            // const orderLast7Days = await prisma.order.findMany({
            //     where: {
            //         createdAt: {
            //             gte: sevenDaysAgo,
            //             lte: currentDate,
            //         },
            //     },
            //     include: {
            //         OrderDetail: {
            //             select: {
            //                 productOrder: {
            //                     select: {
            //                         id: true,
            //                         name: true,
            //                         soldcount: true,
            //                         createdAt: true,
            //                     },
            //                 },
            //             },
            //         },
            //     },
            // });

            // let totalRevenueLast7Days = 0;
            // let totalQuantitySoldLast7Days = 0;

            // orderLast7Days.forEach((order) => {
            //     totalRevenueLast7Days += order.amountTotal;
            //     if (order.OrderDetail) {
            //         totalQuantitySoldLast7Days += order.OrderDetail.reduce(
            //             (acc, detail) => acc + detail.productOrder.soldcount,
            //             0
            //         );
            //     }
            // });

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
            const topProductsLast7Days = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: sevenDaysAgo,
                        lte: currentDate,
                    },
                },
                orderBy: {
                    quantity: 'desc',
                },
                skip,
                take,
            });
            // Tính tổng doanh thu và tổng số lượng sản phẩm đã bán trong khoảng 7 ngày
            let totalRevenueLast7Days = 0;
            let totalQuantitySoldLast7Days = 0;

            ordersLast7Days.forEach((order) => {
                totalRevenueLast7Days += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldLast7Days += order.OrderDetail.reduce(
                        (acc, detail) => acc + detail.productOrder.soldcount,
                        0
                    );
                }
            });

            // Tính số % tổng doanh thu trong khoảng 7 ngày trước so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageLast7Days = (totalRevenueLast7Days / totalRevenueCurrentMonth) * 100;

            const fifteenDaysAgo = new Date();
            fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

            const topProductsLast15Days = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: fifteenDaysAgo,
                        lte: currentDate,
                    },
                },
                orderBy: {
                    quantity: 'desc',
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

            let totalQuantitySoldLast15Days = 0;

            orderLast15Days.forEach((order) => {
                totalRevenueLast15Days += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldLast15Days += order.OrderDetail.reduce(
                        (acc, detail) => acc + detail.productOrder.soldcount,
                        0
                    );
                }
            });

            // Tính số % tổng doanh thu trong khoảng 15 ngày trước so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageLast15Days = (totalRevenueLast15Days / totalRevenueCurrentMonth) * 100;

            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const topProductsLast30Days = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: thirtyDaysAgo,
                        lte: currentDate,
                    },
                },
                orderBy: {
                    quantity: 'desc',
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

            let totalQuantitySoldLast30Days = 0;

            orderLast30Days.forEach((order) => {
                totalRevenueLast30Days += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldLast30Days += order.OrderDetail.reduce(
                        (acc, detail) => acc + detail.productOrder.soldcount,
                        0
                    );
                }
            });
            // Tính số % tổng doanh thu trong khoảng 7 ngày trước so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageLast30Days = (totalRevenueLast30Days / totalRevenueCurrentMonth) * 100;
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

            const topProductsInRange = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: startDateObj,
                        lte: endDateObj,
                    },
                },
                orderBy: {
                    quantity: 'desc',
                },
                skip,
                take,
            });

            let totalRevenueInRange = 0;
            let totalQuantitySoldInRange = 0;

            orderInTimeRange.forEach((order) => {
                totalRevenueInRange += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldInRange += order.OrderDetail.reduce((acc, detail) => acc + detail.quantity, 0);
                }
            });

            // Tính % tổng doanh thu trong khoảng thời gian được chỉ định so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageInRange = (totalRevenueInRange / totalRevenueCurrentMonth) * 100;

            // Tính số lượng sản phẩm đã bán và tổng doanh thu trong ngày hôm nay (hiện tại)
            const ordersToday = orderCurrentMonth.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return (
                    orderDate.getFullYear() === currentYear &&
                    orderDate.getMonth() === currentMonth - 1 &&
                    orderDate.getDate() === currentDate.getDate()
                );
            });

            let totalRevenueToday = 0;
            let totalQuantitySoldToday = 0;

            ordersToday.forEach((order) => {
                totalRevenueToday += order.amountTotal;
                if (order.OrderDetail) {
                    totalQuantitySoldToday += order.OrderDetail.reduce(
                        (acc, detail) => acc + detail.productOrder.soldcount,
                        0
                    );
                }
            });
            // Tính % tổng doanh thu trong ngày hôm nay so với tổng doanh thu trong tháng hiện tại
            const revenuePercentageToday = (totalRevenueToday / totalRevenueCurrentMonth) * 100;

            // Lấy ra sản phẩm hot trong ngày hôm nay (dựa trên quantity)
            const productQuantityMapToday = {};

            ordersToday.forEach((order) => {
                if (order.OrderDetail) {
                    order.OrderDetail.forEach((detail) => {
                        const productId = detail.productOrder.id;
                        const quantity = detail.quantity;

                        if (productQuantityMapToday[productId]) {
                            productQuantityMapToday[productId] += quantity;
                        } else {
                            productQuantityMapToday[productId] = quantity;
                        }
                    });
                }
            });
            // Lấy danh sách các sản phẩm hot trong ngày hôm nay (hiện tại) kết hợp với thông tin từ bảng orderDetail
            const topProductsInToday = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: firstDayOfCurrentMonth,
                        lte: lastDayOfCurrentMonth,
                    },
                },
                orderBy: {
                    quantity: 'desc',
                },
                skip,
                take,
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
            res.status(200).json({
                totalRevenueCurrentMonth,
                totalQuantitySoldCurrentMonth,
                productDetailsCurrentMonth: Object.values(productDetailsDictionary),
                hotProductsCurrent: topProductsCurrent, // Danh sách sản phẩm hot (lượng mua cao nhất trong 30 ngày trước)

                totalRevenueLast7Days,
                totalQuantitySoldLast7Days,
                revenuePercentageLast7Days: revenuePercentageLast7Days.toFixed(1),
                hotProductLast7days: topProductsLast7Days,

                totalRevenueLast15Days,
                totalQuantitySoldLast15Days,
                revenuePercentageLast15Days: revenuePercentageLast15Days.toFixed(1),
                hotProductLast15days: topProductsLast15Days,

                totalRevenueLast30Days,
                totalQuantitySoldLast30Days,
                revenuePercentageLast30Days: revenuePercentageLast30Days.toFixed(1),
                hotProductLast30days: topProductsLast30Days,

                totalRevenueInRange,
                totalQuantitySoldInRange,
                revenuePercentageInRange: revenuePercentageInRange.toFixed(1),
                hotProductsInRange: topProductsInRange,

                totalRevenueToday, // Tổng doanh thu trong ngày hôm nay
                totalQuantitySoldToday, // Số lượng sản phẩm đã bán trong ngày hôm nay
                revenuePercentageToday: revenuePercentageToday.toFixed(1),
                hotProductsInToday: topProductsInToday,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    },
};

module.exports = StatisticsController;
