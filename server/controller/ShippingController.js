const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ShippingController = {
    // giao hàng cho đơn vị vận chuyển thành công
    setStatusTo1: async (req, res) => {
        try {
            const orderId = parseInt(req.body.id);
            const order = await prisma.order.findFirst({
                where: orderId,
            });
            if (!order) {
                return res.status(404).send('Order is undefined');
            }
            await prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: 1,
                },
            });
            res.status(200).send('Update status to 1 successfully');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    // Đang vận chuyển
    setStatusTo2: async (req, res) => {
        try {
            const orderId = parseInt(req.body.id);
            const order = await prisma.order.findFirst({
                where: orderId,
            });
            if (!order) {
                return res.status(404).send('Order is undefined');
            }
            await prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: 2,
                },
            });
            res.status(200).send('Update status to 2 successfully');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    // Giao hàng thành công ở UI bên giao hàng
    setStatusTo3: async (req, res) => {
        try {
            const orderId = parseInt(req.body.id);
            const order = await prisma.order.findFirst({
                where: orderId,
            });
            if (!order) {
                return res.status(404).send('Order is undefined');
            }
            await prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: 3,
                },
            });
            res.status(200).send('Update status to 3 successfully');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    // Giao hàng thành công ở UI người dùng
    setStatusTo4: async (req, res) => {
        try {
            const orderId = parseInt(req.body.id);
            const order = await prisma.order.findFirst({
                where: orderId,
            });
            if (!order) {
                return res.status(404).send('Order is undefined');
            }
            await prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: 3,
                },
            });
            res.status(200).send('Update status to 4 successfully');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    // Render toàn bộ đơn hàng có status = 1 ra giao diện nhận hàng thành công của đơn vị giao hàng
    getAllStatus1: async (req, res) => {
        try {
            const whereClause = {
                status: 1,
            };
            const ProductFromOrder = await prisma.order.findMany({
                where: whereClause,
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
            res.status(200).json(ProductFromOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
};
module.exports = ShippingController;
