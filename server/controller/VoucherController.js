const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
                // where: {
                //     name: {
                //         contains: keyword || '',
                //     },
                // },
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
};

module.exports = VoucherController;
