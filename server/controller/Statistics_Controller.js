const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const StatisticsController = {
    getStatictics: async (req, res) => {
        try {
            // Lấy ngày hiện tại
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, và mili giây về 00:00:00.000

            // Lấy danh sách đơn hàng trong ngày
            const orders = await prisma.order.findMany({
                where: {
                    AND: [
                        {
                            createdAt: {
                                gte: currentDate, // Lớn hơn hoặc bằng ngày bắt đầu ngày hiện tại
                            },
                        },
                        {
                            createdAt: {
                                lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Nhỏ hơn ngày kết thúc ngày hiện tại
                            },
                        },
                    ],
                },
                include: {
                    OrderDetail: {
                        include: {
                            Product: true,
                        },
                    },
                },
            });

            // Tính tổng doanh thu
            let totalRevenue = 0;
            const productStats = {};

            for (const order of orders) {
                for (const orderDetail of order.OrderDetail) {
                    const product = orderDetail.Product;
                    const revenue = orderDetail.price * orderDetail.quantity;
                    totalRevenue += revenue;

                    if (productStats[product.id]) {
                        productStats[product.id].revenue += revenue;
                        productStats[product.id].quantity += orderDetail.quantity;
                    } else {
                        productStats[product.id] = {
                            name: product.name,
                            revenue,
                            quantity: orderDetail.quantity,
                        };
                    }
                }
            }

            res.status(200).json({
                totalRevenue,
                productStats,
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = StatisticsController;
