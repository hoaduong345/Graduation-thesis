const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ShippingController = {
    // Set lại status khi có thao tác
    setStatus: async (req, res) => {
        try {
            const orderId = parseInt(req.body.id);
            const statusOrder = parseInt(req.body.status);
            const order = await prisma.order.findFirst({
                where: {
                    id: orderId,
                },
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
            const page = parseInt(req.query.page);
            const limit = 4;
            const startIndex = (page - 1) * limit;
            const totalOrder = (await prisma.order.findMany()).length;
            const whereClause = {
                status: {
                    gte: 1,
                }
            };
            const ProductFromOrder = await prisma.order.findMany({
                where: whereClause,
                skip: startIndex,
                take: limit,
                include: {
                    OrderDetail: true
                },
                orderBy:{
                    id : "desc"
                }
            });
            const results = {
                page: page,
                pageSize: limit,
                totalPage: Math.ceil(totalOrder / limit),
                data: ProductFromOrder,
                totalOrder: totalOrder,
            };
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    // SORT theo status
    sortByStatus: async (req, res) => {
        try {
            const orderID = parseInt(req.body.id);
            const orderStatus = parent(req.body.status);
            const order = await prisma.order.findFirst({
                where: {
                    id: orderID,
                },
            });
            if (!order) return res.status(404).send('Order is undifined');

            const whereClause = {
                status: orderStatus,
            };
            const sortByStatus = await prisma.order.findMany({
                where: whereClause,
            });
            res.send(200).json(sortByStatus);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    // SORT theo ngày mới nhất
    sortByNewDay: async (req, res) => {
        try {
            const orderId = parseInt(req.body.id);
            const order = await prisma.order.findFirst({
                where: {
                    id: orderId,
                },
            });
            if (!order) return res.status(404).send('Order is undifined');

            const latestOrders = await prisma.order.findMany({
                where: {
                    id: order.id,
                },
                orderBy: {
                    createdAt: 'desc', // Sort by createdAt in descending order
                },
            });
            res.status(200).json(latestOrders);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },
    // SEARCH đơn hàng orderId và tên khách hàng
    searchWithNameAndOrderId: async (req, res) => {
        try {
            const keyword = req.body.keyword;
            const whereClause = {
                id : {
                    contains : keyword
                },
                name: {
                    contains: keyword,
                },
                deletedAt: null,
            };
            const searchOrder = await prisma.order.findMany({
                where: whereClause,
            });
            res.status(200).json(searchOrder);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },

    // Huỷ đơn hàng
    requestDeleteOrder: async (req, res) => {
        try {
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
};
module.exports = ShippingController;
