const { PrismaClient } = require('@prisma/client');
const { prototype } = require('events');
const prisma = new PrismaClient();

const StatisticsController = {
    getStatictics: async (req, res) => {
        try {
            // const currentDate = new Date();

            const { startDate: from, endDate: to, filterValue, page, pageSize } = req.body;
            console.log('🚀 ~ file: Statistics_Controller.js:11 ~ getStatictics: ~ from:', filterValue.from);
            console.log('🚀 ~ file: Statistics_Controller.js:11 ~ getStatictics: ~ req.body:', req.body);

            const skip = (page - 1) * pageSize; // Số lượng sản phẩm được bỏ qua (trang đầu tiên)
            const take = pageSize; // Số lượng sản phẩm được lấy

            // const yesterday = new Date(currentDate);
            // yesterday.setHours(23, 59, 59, 999);
            // yesterday.setDate(currentDate.getDate() - 1);
            // const oneWeekAgo = new Date(yesterday);
            // oneWeekAgo.setHours(0, 0, 0, 0);
            // oneWeekAgo.setDate(yesterday.getDate() - 7);

            const orderInTimeRange = await prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: filterValue.from,
                        lte: filterValue.to,
                    },
                },
                include: {
                    OrderDetail: {
                        select: {
                            productId: true,
                            quantity: true,
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
                        gte: filterValue.from,
                        lte: filterValue.to,
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

            orderInTimeRange.forEach((order) => {
                totalRevenueInRange += order.amountTotal;
                if (order.OrderDetail) {
                    totalRevenueInRange += order.OrderDetail.reduce((acc, detail) => acc + detail.quantity, 0);
                }
            });

            const totalQuantitySoldInRange = await prisma.orderDetail.aggregate({
                where: {
                    createdAt: {
                        gte: filterValue.from,
                        lte: filterValue.to,
                    },
                },
                _sum: {
                    quantity: true,
                },
            });

            const totalOrdersInRange = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: filterValue.from,
                        lte: filterValue.to,
                    },
                },
            });

            const totalQuantityInRange = orderInTimeRange.reduce((acc, order) => {
                if (order.OrderDetail) {
                    return acc + order.OrderDetail.reduce((acc, detail) => acc + detail.quantity, 0);
                }
                return acc;
            }, 0);

            // Tính phần trăm số lượng sản phẩm đã bán
            const percentageQuantitySold = (totalQuantitySoldInRange._sum.quantity / totalQuantityInRange) * 100;

            const revenuePercentageInRange = (totalQuantitySoldInRange._sum.quantity / totalRevenueInRange) * 100;

            // const categoryStatsByDay = {};

            // for (let date = yesterday; date >= oneWeekAgo; date.setDate(date.getDate() - 1)) {
            //     const startDate = new Date(date);
            //     const endDate = date;
            //     startDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây thành 0:00:00.000
            //     endDate.setHours(23, 59, 59, 999); // Đặt giờ, phút, giây và mili giây thành 23:59:59.999
            //     const categories = await prisma.category.findMany({
            //         include: {
            //             products: {
            //                 where: {
            //                     date: {
            //                         gte: startDate, // Ngày bắt đầu là 7 ngày trước ngày hôm qua
            //                         lte: endDate, // Ngày kết thúc là ngày hôm qua
            //                     },
            //                 },
            //             },
            //         },
            //     });
            //     const topCategories = categories.map((category) => {
            //         return {
            //             category: category,
            //             totalSoldCount: category.products.reduce(
            //                 (total, product) => total + (product.soldcount || 0),
            //                 0
            //             ),
            //         };
            //     });

            //     // Sắp xếp danh mục theo số sản phẩm đã bán giảm dần
            //     topCategories.sort((a, b) => b.totalSoldCount - a.totalSoldCount);

            //     // Lưu kết quả vào categoryStatsByDay dựa trên ngày tương ứng
            //     categoryStatsByDay[date.toISOString().split('T')[0]] = topCategories;
            // }

            res.status(200).json({
                totalRevenueInRange,
                totalQuantitySoldInRange: totalQuantitySoldInRange._sum.quantity,
                purchaseOrShoppingInRange: totalOrdersInRange,
                revenuePercentageInRange: revenuePercentageInRange,
                percentageQuantitySold: percentageQuantitySold,
                hotProductsInRange: topProductsInRange,

                // sortedCategoriesToday: categoryStatsByDay,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    },
};

module.exports = StatisticsController;
