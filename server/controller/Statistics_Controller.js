const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const StatisticsController = {
    getStatictics: async (req, res) => {
        //     try {
        //         const allOrderDetails = await prisma.orderDetail.findMany({
        //             include: {
        //                 fK_productOrder: {
        //                     select: {
        //                         id: true,
        //                         name: true,
        //                         price: true,
        //                     },
        //                 },
        //             },
        //         });

        //         const productStats = {};

        //         allOrderDetails.forEach((orderDetail) => {
        //             const product = orderDetail.fK_productOrder;
        //             const createdAt = orderDetail.createdAt.toDateString(); // Lấy ngày tạo đơn hàng

        //             if (!productStats[createdAt]) {
        //                 productStats[createdAt] = [];
        //             }

        //             productStats[createdAt].push({
        //                 id: product.id,
        //                 name: product.name,
        //                 price: product.price,
        //             });
        //         });

        //         res.json(productStats);
        //     } catch (error) {
        //         console.error('Error:', error);
        //         res.status(500).json({ error: 'An error occurred while fetching product stats.' });
        //     }
        // },
        try {
            const allOrderDetails = await prisma.orderDetail.findMany({
                include: {
                    fK_productOrder: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        },
                    },
                },
            });

            const productStats = {};

            allOrderDetails.forEach((orderDetail) => {
                const product = orderDetail.fK_productOrder;
                const createdAt = orderDetail.createdAt.toDateString(); // Lấy ngày tạo đơn hàng

                if (!productStats[createdAt]) {
                    productStats[createdAt] = [];
                }

                // Kiểm tra xem sản phẩm đã tồn tại trong thông tin thống kê chưa
                const existingProduct = productStats[createdAt].find((item) => item.id === product.id);

                if (existingProduct) {
                    // Nếu sản phẩm đã tồn tại, cập nhật số lượng và tổng tiền
                    existingProduct.quantity++;
                    existingProduct.totalPrice += product.price;
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào thông tin thống kê
                    productStats[createdAt].push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        totalPrice: product.price,
                    });
                }
            });

            res.json(productStats);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while fetching product stats.' });
        }
    },
};

module.exports = StatisticsController;
