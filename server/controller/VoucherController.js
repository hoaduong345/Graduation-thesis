const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const schedule = require('node-schedule');



const VoucherController = {

    


    get: async (req, res) => {
        try {
            const pageCurr = parseInt(req.query.page);

            const keyword = req.query.name;

            const limit = 100;

            const startIndex = (pageCurr - 1) * limit;
            const whereClause = {
                deletedAt: null,
            };
            const totalProduct = (await prisma.voucher.findMany()).length;

            const products = await prisma.voucher.findMany({
                where: whereClause,
                skip: startIndex,
                take: limit,
            });

            const results = {
                page: pageCurr,
                pageSize: limit,
                totalPage: totalProduct / limit,
                data: products,
                // name: keyword?.toLowerCase(),
            };

            return res.status(200).json(results ?? []);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },

    add: async (req, res) => {
        try {
            const { code, quantity, startDay, endDay, discount } = req.body;
    
            // Lấy ngày hôm nay
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây thành 0 để so sánh ngày
    
            // Chuyển đổi "startDay" và "endDay" từ dữ liệu đầu vào thành đối tượng ngày
            const startDate = new Date(startDay);
            const endDate = new Date(endDay);
    
            // Kiểm tra startDay
            if (startDate < today) {
                return res.status(400).json({ message: "startDay phải là ngày hôm nay hoặc sau ngày hôm nay" });
            }
    
            // Kiểm tra endDay
            if (endDate < startDate) {
                return res.status(400).json({ message: "endDay phải sau startDay" });
            }
    
            // Tạo voucher
            const newVoucher = {
                code,
                discount: parseInt(discount),
                quantity: parseInt(quantity),
                startDay,
                endDay,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
    
            const neww = await prisma.voucher.create({
                data: newVoucher,
            });
    
            console.log(neww);
            res.status(200).json(neww);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },


    
    
    remove: async (req, res) => {
        try {
            const voucherId = parseInt(req.params.id);
            const voucherFind = await prisma.voucher.findFirst({
                where: {
                    id: voucherId,
                },
            });
            if (voucherFind) {
                await prisma.voucher.update({
                    where: {
                        id: voucherId,
                    },
                    data: {
                        deletedAt: new Date(),
                    },
                });
                return res.status(200).json('thành công');
            }
            return res.status(402).json('that bai');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    update: async (req, res) => {
        try {
            const voucherid = parseInt(req.params.id);

            const { code, quantity, startDay, endDay, discount } = req.body;

              // Lấy ngày hôm nay
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây thành 0 để so sánh ngày
      
              // Chuyển đổi "startDay" và "endDay" từ dữ liệu đầu vào thành đối tượng ngày
              const startDate = new Date(startDay);
              const endDate = new Date(endDay);
      
              // Kiểm tra startDay
              if (startDate < today) {
                  return res.status(400).json({ message: "startDay phải là ngày hôm nay hoặc sau ngày hôm nay" });
              }
      
              // Kiểm tra endDay
              if (endDate < startDate) {
                  return res.status(400).json({ message: "endDay phải sau startDay" });
              }

            const updateVoucher = {
                code,
                discount: parseInt(discount),
                quantity: parseInt(quantity),
                startDay,
                endDay,
                updatedAt: new Date(),
            };

            const updatedProduct = await prisma.voucher.update({
                where: {
                    id: voucherid,
                },
                data: updateVoucher,
            });
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

     SaveVoucher: async (req, res) => {
        try {
            const userIdFromCookies = parseInt(req.cookies.id);
            const voucherId = parseInt(req.params.voucherId);

            const user = await prisma.user.findUnique({
                where: { id: userIdFromCookies },
            });
            

            const voucher = await prisma.voucher.findUnique({
                where: { id: voucherId },
            });

            if (!user || !voucher) {
                return res.status(404).json('Người dùng hoặc voucher không tồn tại.');
            }

            if (!voucher || voucher.quantity === 0) {
                return res.status(400).json("Voucher không tồn tại hoặc đã hết.");
            }

            // Kiểm tra xem người dùng đã lưu voucher này trước đó chưa
            const existingVoucher = await prisma.savedVoucher.findFirst({
                where: {
                    userId  :userIdFromCookies ,
                    voucherId,
                },
            });

            if (existingVoucher) {
                return res.status(400).json('Voucher đã được lưu trước đó.');
            }

            // Nếu chưa lưu, thì lưu voucher cho người dùng
            await prisma.savedVoucher.create({
                data: {
                    userId : userIdFromCookies,
                    voucherId,
                },
            });

            res.status(201).json('Voucher đã được lưu thành công.');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        } finally {
            await prisma.$disconnect();
        }
    },

    getSavedUser: async (req, res) => {
        try {
            const userId = parseInt(req.params.id); 
    
            
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    savedVouchers: {
                        include: {
                            voucher: true,
                        },
                    },
                },
            });
    
            if (user) {
                // Trả về danh sách voucher mà người dùng đã lưu
                const savedVouchers = user.savedVouchers.map((sv) => sv.voucher);
                res.status(200).json(savedVouchers);
            } else {
                res.status(404).json({ message: "Không tìm thấy người dùng" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    UseVoucher: async (req, res) => {
        try {
            const userIdFromCookies = parseInt(req.cookies.id);
            const voucherId = parseInt(req.params.voucherId); 
    
            // Kiểm tra xem voucher có tồn tại và còn lại quantity không
            const voucher = await prisma.voucher.findUnique({
                where: {
                    id: voucherId,
                },
            });
    
            if (!voucher || voucher.quantity === 0) {
                return res.status(400).json({ message: "Voucher không tồn tại hoặc đã hết." });
            }
    
            // Kiểm tra xem người dùng đã lưu voucher chưa
            const savedVoucher = await prisma.savedVoucher.findFirst({
                where: {
                    userId: userIdFromCookies,
                    voucherId: voucherId,
                    used: false,
                },
            });
    
            if (!savedVoucher) {
                return res.status(400).json({ message: "Người dùng chưa lưu voucher này hoặc đã sử dụng." });
            }
    
            // Sử dụng transaction để cập nhật quantity 
            await prisma.$transaction([
                prisma.savedVoucher.update({
                    where: {
                        id: savedVoucher.id,
                    },
                    data: {
                        used: true,
                    },
                }),
                prisma.voucher.update({
                    where: {
                        id: voucherId,
                    },
                    data: {
                        quantity: voucher.quantity - 1, // Giảm quantity đi 1
                    
                    },
                }),
            ]);
    
            res.status(200).json({ message: "Sử dụng voucher thành công." });
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    
    
    
};

module.exports = VoucherController;
