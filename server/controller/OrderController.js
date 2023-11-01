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
                    paymentMethod: orderData.method,
                    note: orderData.note,
                    invoice: orderData.invoice.toString()
                },
            });
            orderData.cartItems.map(async (e) => {
                await prisma.orderDetail.create({
                    data: {
                        orderId: order.id,
                        productId: e.productId,
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
                orderBy: {
                    id: 'desc',
                },
            });
            res.status(200).json(order);
        } catch (error) {
            console.log('error', error);
            res.status(404).send('Get order failed');
        }
    },

    getOrderAdmin: async (req, res) => {
        try {
            const page = parseInt(req.query.page)
            const limit = 4;
            const startIndex = (page - 1) * limit;
            const totalOrder = (await prisma.order.findMany()).length;

            const orders = await prisma.order.findMany({
                skip: startIndex,
                take: limit,
                include: {
                    OrderDetail: true,
                    User: true
                },
                orderBy: {
                    id: 'desc',
                },
            });

            const results = {
                page: page,
                pageSize: limit,
                totalPage: Math.ceil(totalOrder / limit),
                data: orders,
                totalOrder: totalOrder
            };
            res.status(200).json(results);
        } catch (error) {
            res.status(404).json('error.message', error.message)
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
                    User: true,
                },
            });
            res.status(200).json(order);
        } catch (error) {
            console.log('error', error);
            res.status(404).send('Get order failed');
        }
    },

    isRatingAt: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const productId = parseInt(req.body.productId);
            const orderDetailId = parseInt(req.body.orderDetailId);
            console.log(id, productId)
            const existingCategory = await prisma.orderDetail.findMany({
                where: {
                    orderId: id,
                },
            });
            if (existingCategory) {
                await prisma.orderDetail.update({
                    where: {
                        id: orderDetailId,
                        orderId: id,
                        productId: productId,
                    },
                    data: {
                        ratingAt: new Date(),
                    },
                });
                return res.status(200).json('Đánh giá thành công');
            }
            return res.status(404).json('Đánh giá thất bại');
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
};

module.exports = OderController;
