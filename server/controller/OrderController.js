const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OderController = {
    createOrder: async (req, res) => {
        try {
            const orderData = req.body.order;

            const order = await prisma.order.create({
                data: {
                    userId: orderData.iduser,
                    subtotal: orderData.amount_subtotal,
                    shipping: orderData.shipping,
                    discount: orderData.discount,
                    amountTotal: orderData.amount_total,
                },
            });
            orderData.cartItems.map(async (e) => {
                await prisma.orderDetail.create({
                    data: {
                        orderId: order.id,
                        productId: e.productid,
                        name: e.name,
                        image: e.image,
                        price: e.price,
                        quantity: e.quantity,
                        total: e.total,
                    },
                });
            });

            res.status(200).json(order ?? {});
        } catch (error) {
            console.log(error);
            res.status(404).json('Add orders to the database failed');
        }
    },

    getOrderUser: async (req, res) => {
        try {
            const userid = parseInt(req.cookies.id);
            const order = await prisma.order.findMany({
                where: {
                    userId: userid,
                },
                include: {
                    OrderDetail: true,
                },
            });
            res.status(200).json(order);
        } catch (error) {
            console.log('error', error);
            res.status(404).send('Get order failed');
        }
    },

    getOrderDetails: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const order = await prisma.order.findFirst({
                where: {
                    id: id,
                },
                include: {
                    OrderDetail: true,
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
