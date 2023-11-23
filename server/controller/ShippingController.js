const { PrismaClient } = require('@prisma/client');
const { Socket } = require('socket.io');
const prisma = new PrismaClient();

const errorResponse = (res, error) => {
    console.error(error);
    res.status(500).json(error.message);
};

const ShippingController = {
    setStatus: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            console.log('🚀 ~ file: ShippingController.js:13 ~ setStatus: ~ userId:', userId);
            const orderId = parseInt(req.body.id);
            const statusOrder = parseInt(req.body.status);

            const order = await prisma.order.findFirst({
                where: {
                    id: orderId,
                },
                include: {
                    User: {
                        select: {
                            name: true,
                            UserImage: {
                                select: {
                                    url: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!order) {
                return res.status(404).send('Order is undefined');
            }
            if (statusOrder === 3) {
                const io = req.app.get('socketio');
                io.emit('setstatus', order);

                await prisma.notification.create({
                    data: {
                        orderId: orderId,
                        message: 'new delivery',
                        status: 3,
                        seen: false,
                    },
                });
            }
            if (statusOrder === 5) {
                const io = req.app.get('socketio');
                io.emit('deliverysuccessfully', order);

                await prisma.notification.create({
                    data: {
                        userId: userId,
                        orderId: orderId,
                        message: 'Delivery Successfully',
                        status: 5,
                        seen: false,
                    },
                });
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
                deletedAt: null,
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
                deletedAt: null,
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
                    OR: [
                        {
                            status: 0,
                            deletedAt: {
                                equals: null,
                            },
                        },
                        {
                            status: {
                                gt: 0,
                            },
                        },
                    ],
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
                totalOrdersCount: totalOrdersCount,
                statusCounts: statusCounts,
                data: allOrderAdmin,
            };
            res.status(200).json(results);
        } catch (error) {
            errorResponse(res, error);
        }
    },
    // REQUEST and CONFIRM delete order
    requestDeleteOrder: async (req, res) => {
        try {
            const orderId = parseInt(req.body.orderId);
            const order = await prisma.order.findFirst({
                where: {
                    id: orderId,
                },
                include: {
                    User: {
                        select: {
                            name: true,
                            UserImage: {
                                select: {
                                    url: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!order) return res.send('Order is undifined');

            const requestDeleteOrder = await prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: 0,
                },
            });

            await prisma.notification.create({
                data: {
                    orderId: order.id,
                    message: 'request delete order',
                    status: 2,
                    seen: false,
                },
            });

            const io = req.app.get('socketio');
            io.emit('requestdelete', order);

            res.status(200).json(requestDeleteOrder);
        } catch (error) {
            errorResponse(res, error);
        }
    },
    confirmDeleteOrder: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            console.log('🚀 ~ file: ShippingController.js:301 ~ confirmDeleteOrder: ~ userId:', userId);
            const orderId = parseInt(req.body.orderId);
            const user = await prisma.user.findFirst({
                where: {
                    id: userId,
                },
            });
            const order = await prisma.order.findFirst({
                where: {
                    id: orderId,
                },
            });

            if (!order) return res.send('Order is undifined');
            if (!user) return res.send('AccessToken is expried');
            await prisma.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    deletedAt: new Date(),
                },
            });
            const noti = await prisma.notification.create({
                data: {
                    userId: user.id,
                    orderId: orderId,
                    message: 'Delete order successfully',
                    status: 4,
                    seen: false,
                },
            });
            const io = req.app.get('socketio');
            io.to().emit('confirmCancelOrder', order);
            res.status(200).json('Delete order successfully');
        } catch (error) {
            errorResponse(res, error);
        }
    },
    // GET noti lên pop ups thông báo cho admin, đơn vị vận chuyển và người dùng
    getNotificationAdmin: async (req, res) => {
        try {
            const whereClause = {
                status: {
                    lte: 2,
                },
                deleteAt: null,
            };

            const whereNotSeen = {
                status: {
                    lte: 2,
                },
                seen: false,
            };

            // Fetch all notifications based on the specified criteria
            const allNotification = await prisma.notification.findMany({
                where: whereClause,
                orderBy: {
                    id: 'desc',
                },
                include: {
                    fk_order: {
                        include: {
                            User: {
                                select: {
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            });

            // Count the number of unseen notifications
            const countNotification = await prisma.notification.count({
                where: whereNotSeen,
            });

            // Prepare the result object
            const result = {
                allNotification: allNotification,
                countNotification: countNotification,
            };

            // Send the result as a JSON response with a status code of 200 (OK)
            res.status(200).json(result);
        } catch (error) {
            // Handle any errors that occur during execution and send an error response
            errorResponse(res, error);
        }
    },
    getNotificationForDelivery: async (req, res) => {
        try {
            const status = 3;
            const whereClause = {
                status: status,
                deleteAt: null,
            };
            // Define the whereNotSeen to filter unseen notifications
            const whereNotSeen = {
                status: status,
                seen: false,
            };
            // Fetch all notifications based on the specified criteria
            const allNotification = await prisma.notification.findMany({
                where: whereClause,
                orderBy: {
                    id: 'desc',
                },
                include: {
                    fk_order: {
                        include: {
                            User: {
                                select: {
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            });
            // Count the number of unseen notifications
            const countNotification = await prisma.notification.count({
                where: whereNotSeen,
            });

            // Prepare the result object
            const result = {
                allNotification: allNotification,
                countNotification: countNotification,
            };

            // Send the result as a JSON response with a status code of 200 (OK)
            res.status(200).json(result);
        } catch (error) {
            errorResponse(res, error);
        }
    },
    getNotificationForUser: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            const user = await prisma.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!user) return res.status(404).send('AccessToken is expried');
            const status = {
                gte: 4,
            };
            const whereClause = {
                userId: userId,
                status: status,
                deleteAt: null,
            };
            const notifi = await prisma.notification.findMany({
                where: whereClause,
            });
            res.status(200).json(notifi);
        } catch (error) {
            errorResponse(res, error);
        }
    },
    // Lọc theo status của notification 1 : có đơn hàng mới,  2 : có yêu cầu huỷ đơn hàng,  3 : Đơn vị vận chuyển đi lấy hàng
    filterWithStatusNotification: async (req, res) => {
        try {
            const status = parseInt(req.body.status);
            const whereClauseStatus = {
                status: status,
            };
            const filterStatus = await prisma.notification.findMany({
                where: whereClauseStatus,
                orderBy: {
                    id: 'desc',
                },
                include: {
                    fk_order: {
                        include: {
                            User: {
                                select: {
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            });
            res.status(200).json(filterStatus);
        } catch (error) {
            errorResponse(res, error);
        }
    },
    // đánh dấu đã đọc
    isMarkAsRead: async (req, res) => {
        try {
            const mark = req.body.id;
            await prisma.notification.update({
                where: {
                    id: mark,
                },
                data: {
                    seen: true,
                },
            });
            res.send('Mark as read successfully');
        } catch (error) {
            errorResponse(res, error);
        }
    },
};

module.exports = ShippingController;
