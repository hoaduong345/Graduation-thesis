const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const VoucherController = {
    get: async (req, res) => {
        try {
            const pageCurr = parseInt(req.query.page);

            const keyword = req.query.name;

            const limit = 5;

            const startIndex = (pageCurr - 1) * limit;

            const totalProduct = (await prisma.voucher.findMany()).length;

            const products = await prisma.voucher.findMany({
                // where: {
                //     name: {
                //         contains: keyword || '',
                //     },
                // },
                include: {
                    fK_category: true,
                },
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
            const { code, quantity, startDay, endDay, categoryId } = req.body;

            const newVoucher = {
                code,
                quantity: parseInt(quantity),
                startDay,
                endDay,
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: parseInt(categoryId),
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

            await prisma.voucher.delete({
                where: {
                    id: voucherId,
                },
            });

            res.status(200).json('thành công');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
};

module.exports = VoucherController;
