const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const StatisticsController = {
    getStatictics: async (req, res) => {
        try {
            const { date } = req.query; // Ngày cần thống kê (ví dụ: '2023-10-01')
            const selectedDate = new Date(date);

            // Tính ngày đầu và cuối tháng từ ngày đã chọn
            const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
            const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
            // Tạo một đối tượng để lưu trữ số lượng sản phẩm ban đầu
            let initialProductQuantities = prisma.product.findMany({
                where: {
                    quantity: true,
                },
            });
            // const initialProductQuantities = {};
            // Truy vấn cơ sở dữ liệu để lấy các chi tiết đơn hàng trong tháng, kết hợp với thông tin sản phẩm và khách hàng
            const orderDetails = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                        lte: lastDayOfMonth,
                    },
                },
                include: {
                    fK_order: {
                        select: {
                            customerId: true,
                            customer: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    fK_productOrder: {
                        select: {
                            name: true,
                            quantity: true,
                            createdAt: true,
                        },
                    },
                },
            });

            // Tính tổng doanh thu, tổng số lượng sản phẩm đã bán và thông tin thêm từ sản phẩm
            let totalRevenue = 0;
            let totalQuantitySold = 0;
            let productsInfo = {};

            orderDetails.forEach((orderDetail) => {
                totalRevenue += orderDetail.price * orderDetail.quantity;

                // Lấy thông tin sản phẩm từ trường include
                const productInfo = orderDetail.fK_productOrder;

                if (productInfo) {
                    const productId = orderDetail.productId; // Lấy ID sản phẩm

                    // Kiểm tra xem sản phẩm đã được thêm vào danh sách sản phẩm ban đầu chưa
                    if (!initialProductQuantities[productId]) {
                        initialProductQuantities[productId] = productInfo.quantity;
                    }

                    totalQuantitySold += orderDetail.quantity;
                    // Tính toán totalQuantityBought dựa trên số lượng sản phẩm ban đầu trừ đi số lượng đã bán

                    productsInfo[productId] = {
                        name: productInfo.name,
                        // totalQuantityBought: initialProductQuantities[productId] - totalQuantitySold,
                        createdAt: productInfo.createdAt,
                    };
                }
            });

            res.json({
                totalRevenue, // Tổng doanh thu trong tháng
                totalQuantitySold, // Tổng số lượng đã bán trong tháng
                productsInfo, // Thông tin sản phẩm (số lượng còn lại, ngày sản phẩm được mua trong tháng, tên sản phẩm)
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            await prisma.$disconnect();
        }
    },
};

module.exports = StatisticsController;
