const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ShippingController = {
    // Set lại status khi có thao tác
    setStatus: async (req, res) => {
        try {
            const orderId = parseInt(req.body.id);
            const statusOrder = parseInt(req.body.status)
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
                    status: statusOrder,
                },
            });
            res.status(200).send('Update status successfully');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    
    // Render toàn bộ đơn hàng có status = 1 ra giao diện nhận hàng thành công của đơn vị giao hàng
    getAllStatus: async (req, res) => {
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
