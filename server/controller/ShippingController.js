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
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 40;
            const keyword = req.query.keyword;
            const status = parseInt(req.query.status)
            const skip = (page - 1) * pageSize;
            
            const whereClause = {
                name: {
                    contains: keyword
                },
            };
            const whereClauseOrder = {
                status: {
                    gte: 2,
                }
            };
            const allOrderAdmin = await prisma.order.findMany({
                where: whereClauseOrder,
                skip,
                take: pageSize,
                include: {
                    OrderDetail: true
                },
                orderBy: {
                    id: "desc"
                }
            });

            const searchOrder = await prisma.order.findMany({

                where: whereClause,
            });

            const statusOrder = await prisma.order.findMany({
                skip,
                take: pageSize,
                where:{
                    status : status
                },
                orderBy:{
                    id : "desc"
                }
            })
            const results = {
                statusOrder : statusOrder,
                searchOrder : searchOrder,
                page: page,
                pageSize: pageSize,
                totalPage: Math.ceil(allOrderAdmin.length / pageSize),
                data: allOrderAdmin,
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
            const keyword = req.query.keyword;
            const whereClause = {
                id: {
                    contains: keyword
                },
                name: {
                    contains: keyword,
                },
                deletedAt: null,
            };
        
            res.status(200).json(searchOrder);
        } catch (error) {
            errorResponse(res, error);
        }
    },

    requestDeleteOrder: async (req, res) => {
     
    },
};

module.exports = ShippingController;
