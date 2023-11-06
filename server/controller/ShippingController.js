const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const errorResponse = (res, error) => {
    console.error(error);
    res.status(500).json(error.message);
};

const getProductsByStatus = async (req, res, status) => {
    try {
        const productByStatus = await prisma.order.findMany({
            where: {
                status: status
            }
        });
        res.status(200).json(productByStatus);
    } catch (error) {
        errorResponse(res, error);
    }
};

const ShippingController = {
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
            errorResponse(res, error);
        }
    },

    getAllStatusForDelivery: async (req, res) => {
        try {
            const page = parseInt(req.query.page);
            const limit = 4;
            const startIndex = (page - 1) * limit;
            const whereClause = {
                status: {
                    gte: 2,
                }
            };
            const ProductFromOrder = await prisma.order.findMany({
                where: whereClause,
                skip: startIndex,
                take: limit,
                include: {
                    OrderDetail: true
                },
                orderBy: {
                    id: "desc"
                }
            });
            const results = {
                page: page,
                pageSize: limit,
                totalPage: Math.ceil(ProductFromOrder.length / limit),
                data: ProductFromOrder,
            };
            res.status(200).json(results);
        } catch (error) {
            errorResponse(res, error);
        }
    },

    sortByStatus: async (req, res) => {
        const status = parseInt(req.query.status); // Get status from query parameter
        getProductsByStatus(req, res, status);
    },

    searchWithNameAndOrderId: async (req, res) => {
        try {
            const keyword = req.body.keyword;
            const whereClause = {
                id: {
                    contains: keyword
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
            errorResponse(res, error);
        }
    },

    requestDeleteOrder: async (req, res) => {
     
    },
};

module.exports = ShippingController;
