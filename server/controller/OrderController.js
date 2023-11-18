const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OderController = {
    createOrder: async (req, res) => {
        try {
            const orderData = req.body.order;
            const iduser = req.cookies.id;
            const user = await prisma.user.findFirst({
                where: {
                    id: iduser,
                },
                select: {
                    name: true,
                    image: true,
                },
            });

            const order = await prisma.order.create({
                data: {
                    userId: orderData.iduser,
                    subtotal: orderData.amount_subtotal,
                    shipping: orderData.shipping,
                    discount: orderData.discount,
                    amountTotal: orderData.amount_total,
                    paymentMethod: orderData.method,
                    note: orderData.note,
                    invoice: orderData.invoice.toString(),
                    name: orderData.name,
                    address: orderData.address,
                    phoneNumber: orderData.phoneNumber,
                    status: 1,
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
            await prisma.notification.create({
                data: {
                    userId: iduser,
                    orderId: order.id,
                    message: 'New order',
                    status: 1,
                    seen: false,
                },
            });

            const io = req.app.get('socketio');
            io.emit('newOrder', user);
            res.status(200).json(order ?? {});
        } catch (error) {
            console.log(error);
            res.status(404).json('Add orders to the database failed');
        }
    },

    getOrderUser: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            const page = parseInt(req.body.page) || 1;
            const pageSize = parseInt(req.body.pageSize) || 40;
            const status = parseInt(req.body.status);
            let skip = (page - 1) * pageSize;

            let sortStatus = {};
            if (status == 0) {
                sortStatus = 0;
            } else if (status) {
                sortStatus = status;
            } else {
                sortStatus = {
                    gte: 0,
                };
            }

            const totalOrderPage = await prisma.order.count({
                where: {
                    userId: userId,
                    status: sortStatus,
                },
            });

            const order = await prisma.order.findMany({
                where: {
                    userId: userId,
                    status: sortStatus,
                },
                include: {
                    OrderDetail: true,
                },
                orderBy: {
                    id: 'desc',
                },
                skip,
                take: pageSize,
            });

            res.status(200).json({
                page: page,
                pageSize: pageSize,
                totalPage: Math.ceil(totalOrderPage / pageSize),
                data: order,
            });
        } catch (error) {
            console.error('Lỗi: ', error);
            res.status(404).send('Get order failed');
        }
    },

    getOrderAdmin: async (req, res) => {
        try {
            const page = parseInt(req.query.page);
            const limit = 4;
            const startIndex = (page - 1) * limit;
            const totalOrder = (await prisma.order.findMany()).length;

            const orders = await prisma.order.findMany({
                skip: startIndex,
                take: limit,
                include: {
                    OrderDetail: true,
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
                totalOrder: totalOrder,
            };
            res.status(200).json(results);
        } catch (error) {
            res.status(404).json('error.message', error.message);
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
            res.status(500).json(error.message);
        }
    },
};

module.exports = OderController;
