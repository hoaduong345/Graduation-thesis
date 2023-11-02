const { PrismaClient } = require('@prisma/client');
const { prototype } = require('events');
const prisma = new PrismaClient();

const StatisticsController = {
    getStatictics: async (req, res) => {
        try {
            const { startDate: from, endDate: to, filterValue, page, pageSize } = req.body;

            const skip = (page - 1) * pageSize; // Số lượng sản phẩm được bỏ qua (trang đầu tiên)
            const take = pageSize; // Số lượng sản phẩm được lấy

            const currentDate = new Date();

            const yesterday = new Date(currentDate);
            yesterday.setHours(23, 59, 59, 999);
            yesterday.setDate(currentDate.getDate() - 1);

            const oneWeekAgo = new Date(yesterday);
            oneWeekAgo.setHours(0, 0, 0, 0);
            oneWeekAgo.setDate(yesterday.getDate() - 7);

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

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            const dataByDay = {};

            while (yesterday > oneWeekAgo) {
                const startOfDay = new Date(yesterday);
                startOfDay.setHours(0, 0, 0, 0);

                const endOfDay = new Date(yesterday);
                endOfDay.setHours(23, 59, 59, 999);

                const categories = await prisma.category.findMany({
                    select: {
                        name: true,
                        products: {
                            where: {
                                date: {
                                    gte: startOfDay,
                                    lte: endOfDay,
                                },
                            },
                            select: {
                                soldcount: true,
                            },
                        },
                    },
                });

                // Tính tổng số lượng sản phẩm bán được cho từng danh mục trong ngày
                const topSellingProductsByCategory = categories.map((category) => {
                    const totalSoldCount = category.products.reduce(
                        (acc, product) => acc + (product.soldcount || 0),
                        0
                    );
                    return { name: category.name, totalSoldCount };
                });

                topSellingProductsByCategory.sort((a, b) => b.totalSoldCount - a.totalSoldCount);

                dataByDay[yesterday.toISOString().split('T')[0]] = topSellingProductsByCategory;

                yesterday.setDate(yesterday.getDate() - 1); // Chuyển sang ngày trước đó
            }
            const labelsLine = Object.keys(dataByDay).reverse();
            const datasets = Object.values(dataByDay[labelsLine[0]]).map((category) => ({
                label: category.name,
                data: labelsLine.map((date) => {
                    const categoryData = dataByDay[date].find((item) => item.name === category.name);
                    return categoryData ? categoryData.totalSoldCount : 0;
                }),
            }));

            const initialDataChartLine = {
                labels: labelsLine,
                datasets,
            };

            res.status(200).json({
                totalRevenueInRange,
                totalQuantitySoldInRange: totalQuantitySoldInRange._sum.quantity,
                purchaseOrShoppingInRange: totalOrdersInRange,
                revenuePercentageInRange: revenuePercentageInRange,
                percentageQuantitySold: percentageQuantitySold,
                hotProductsInRange: topProductsInRange,

                initialDataChartLine: initialDataChartLine,

                // initialDataChartVertical: initialDataChartVertical,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    },
};

module.exports = StatisticsController;
