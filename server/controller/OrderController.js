const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OderController = {
    createOrder: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            const cartItems = req.body.cartItems;
            const orders = [];

            for (const cartItem of cartItems) {
                let order = await prisma.order.findFirst({
                    where: {
                        userId: userId,
                    },
                });

                if (!order) {
                    order = await prisma.order.create({
                        data: {
                            userId,
                            OrderDetail: {
                                create: {
                                    productId: cartItem.productId,
                                },
                            },
                        },
                        include: { OrderDetail: true },
                    });
                } else {
                    const updateOrder = await prisma.order.update({
                        where: {
                            userId: userId,
                        },
                        data: {
                            OrderDetail: {
                                upsert: {
                                    where: {
                                        productId: cartItem.productId,
                                    },
                                    create: {
                                        productId: cartItem.productId,
                                    },
                                },
                            },
                        },
                    });
                    orders.push(updateOrder);
                }
            }

            res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            res.status(404).json('Add orders to the database failed');
        }
    },

    getOrderDetails: async (req, res) => {
        try {
            const userid = parseInt(req.cookies.id);
            const order = await prisma.order.findFirst({
                where: {
                    userId: userid,
                },
                include: {
                    OrderDetail: {
                        include: {
                            productOrder: {
                                include: {
                                    ProductImage: true,
                                },
                            },
                        },
                    },
                },
            });
            res.status(200).json(order);
        } catch (error) {
            console.log('error', error);
            res.status(404).send('Get order failed');
        }
    },
};

module.exports = OderController;
