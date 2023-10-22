const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OderController = {
    createOrder: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            const cartItems = req.body.cartItems;
            const order = await prisma.order.findFirst({
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
                                productId: cartItems.producid,
                            },
                        },
                    },
                    include: { OrderDetail: true },
                });
                return res.status(200).json(order);
            }
            const updateOrder = await prisma.order.update({
                where: {
                    userId: userId,
                },
                data: {
                    OrderDetail: {
                        upsert: {
                            where: {
                                productId: cartItems.producid,
                            },
                            create: {
                                productId: cartItems.producid,
                            },
                        },
                    },
                },
            });
            res.status(200).json(updateOrder);
        } catch (error) {
            console.log(error);
            res.status(404).json('Add order to db failed');
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
            res.status(200).json(order)
        } catch (error) {
            console.log("error", error)
            res.status(404).send("Get order failed")
        }
    },
};

module.exports = OderController;
