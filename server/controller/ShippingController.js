const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const errorResponse = (res, error) => {
    console.error(error);
    res.status(500).json(error.message);
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
    // GET ALL status 2 cho bên đơn vị vận chuyển
    getAllStatusForDelivery: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;
            const pageSize = parseInt(req.body.pageSize) || 40;
            const keyword = req.body.keyword;
            const status = parseInt(req.body.status);

            let skip = (page - 1) * pageSize;
            if (keyword) {
                skip = 0;
            }
            let sortStatus = {};
            if (status) {
                sortStatus = status;
            } else {
                sortStatus = {
                    gte: 3,
                };
            }

            const whereClause = {
                name: {
                    contains: keyword,
                },
                status: sortStatus,
            };
            const totalOrdersCount = await prisma.order.count({
                where: whereClause,
            });

            const getAll = await prisma.order.findMany({
                where: {
                    status: {
                        gte: 3,
                    },
                },
            });
            const allOrderAdmin = await prisma.order.findMany({
                where: whereClause,
                skip,
                take: pageSize,
                include: {
                    OrderDetail: true,
                },

                orderBy: {
                    id: 'desc',
                },
            });
            // Tạo một đối tượng chứa thông tin về từng trạng thái
            const statusCounts = {};

            // Lặp qua mảng `getAll` để đếm số lượng đơn hàng cho từng trạng thái
            getAll.forEach((order) => {
                const orderStatus = order.status;
                if (!statusCounts[`orderStatus${orderStatus}`]) {
                    statusCounts[`orderStatus${orderStatus}`] = 1;
                } else {
                    statusCounts[`orderStatus${orderStatus}`]++;
                }
            });
            const results = {
                page: page,
                pageSize: pageSize,
                totalPage: Math.ceil(totalOrdersCount / pageSize),
                totalOrderShipping: getAll.length,
                statusCounts: statusCounts,
                data: allOrderAdmin,
            };
            res.status(200).json(results);
        } catch (error) {
            errorResponse(res, error);
        }
    },
    // GET ALL status từ 1-5 cho quản lý admin
    getAllStatusForAdmin: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;
            const pageSize = parseInt(req.body.pageSize) || 40;
            const keyword = req.body.keyword;
            const status = parseInt(req.body.status);

            let skip = (page - 1) * pageSize;

            if (keyword) {
                skip = 0;
            }

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

            const whereClause = {
                status: sortStatus,
            };

            if (keyword) {
                whereClause.name = {
                    contains: keyword,
                };
            }

            const totalOrdersCount = await prisma.order.count({
                where: whereClause,
            });

            const getAll = await prisma.order.findMany({
                where: {
                    status: {
                        gte: 0,
                    },
                },
            });
            const allOrderAdmin = await prisma.order.findMany({
                where: whereClause,
                skip,
                take: pageSize,
                include: {
                    OrderDetail: true,
                },
                orderBy: {
                    id: 'desc',
                },
            });
            const statusCounts = {};

            getAll.forEach((order) => {
                const orderStatus = order.status;
                if (!statusCounts[`orderStatus${orderStatus}`]) {
                    statusCounts[`orderStatus${orderStatus}`] = 1;
                } else {
                    statusCounts[`orderStatus${orderStatus}`]++;
                }
            });

            const results = {
                page: page,
                pageSize: pageSize,
                totalPage: Math.ceil(totalOrdersCount / pageSize),
                totalOrderShipping: getAll.length,
                statusCounts: statusCounts,
                data: allOrderAdmin,
            };
            res.status(200).json(results);
        } catch (error) {
            errorResponse(res, error);
        }
    },

    requestDeleteOrder: async (req, res) => {
        try {
            const orderId = parseInt(req.body.orderId);
            const order = await prisma.order.findFirst({
                where: {
                    id: orderId,
                },
            });
            if (!order) return res.send('Order is not undifined');

            const requestDeleteOrder = await prisma.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    status: 0,
                },
            });
            res.status(200).json(requestDeleteOrder);
        } catch (error) {
            errorResponse(res, error);
        }
    },
    confirmDeleteOrder: async (req, res) => {
        try {
            const orderId = parseInt(req.body.orderId);
            console.log("🚀 ~ file: ShippingController.js:219 ~ confirmDeleteOrder: ~ orderId:", orderId)
            const order = await prisma.order.findFirst({
                where: {
                    id: orderId,
                },
            });
            if (!order) return res.send('Order is not undifined');
            await prisma.order.update({
                where:{
                    id : order.id
                },
                data:{
                    deletedAt : new Date()
                }
            })
            res.status(200).json("Request delete order successfully")
        } catch (error) {
            errorResponse(res, error);
        }
    },
};

module.exports = ShippingController;
