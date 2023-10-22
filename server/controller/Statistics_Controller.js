const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const StatisticsController = {
    getStatictics: async (req, res) => {
        try {
            const { date } = req.query; // Ngày cần thống kê (ví dụ: '2023-10-01')
            // Chuyển ngày thành dạng Date object
            const selectedDate = new Date(date);

            // Tính ngày đầu và ngày cuối tháng từ ngày đã chọn
            const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
            const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

            // Truy vấn cơ sở dữ liệu để lấy tất cả OrderDetails trong khoảng thời gian đã chọn
            const allOrderDetails = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                        lte: lastDayOfMonth,
                    },
                },
                include: {
                    fK_productOrder: true, // Lấy thông tin sản phẩm
                },
            });

            // Khởi tạo đối tượng thống kê
            const productStats = {};

            // Lặp qua danh sách OrderDetails và tính toán thông tin thống kê
            allOrderDetails.forEach((orderDetail) => {
                const product = orderDetail.fK_productOrder;
                const createdAt = orderDetail.createdAt.toDateString(); // Lấy ngày tạo đơn hàng

                if (!productStats[createdAt]) {
                    productStats[createdAt] = [];
                }

                // Kiểm tra xem sản phẩm đã tồn tại trong thông tin thống kê chưa
                const existingProduct = productStats[createdAt].find((item) => item.id === product.id);

                if (existingProduct) {
                    // Nếu sản phẩm đã tồn tại, cập nhật số lượng, tổng tiền và số lượng sản phẩm
                    existingProduct.quantity++;
                    existingProduct.totalPrice += product.sellingPrice;
                    existingProduct.totalQuantity += 1;
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào thông tin thống kê
                    productStats[createdAt].push({
                        id: product.id,
                        name: product.name,
                        sellingPrice: product.sellingPrice,
                        quantity: 1,
                        totalPrice: product.sellingPrice,
                        totalQuantity: 1,
                    });
                }
            });

            res.json(productStats);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while fetching product stats.' });
        }
    },
    //     try {
    //         const { date } = req.query; // Ngày cần thống kê (ví dụ: '2023-10-01')
    //         // Chuyển ngày thành dạng Date object
    //         const selectedDate = new Date(date);

    //         // Tính ngày đầu và ngày cuối tháng từ ngày đã chọn
    //         const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    //         const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    //         // Truy vấn cơ sở dữ liệu để thống kê sản phẩm
    //         const sales = await prisma.$queryRaw`
    // SELECT p.name AS productName,
    //        SUM(od.quantity) AS quantitySold,
    //        SUM(od.price) AS totalRevenue,
    //        od.createdAt AS saleDate,
    //        (p.quantity - SUM(od.quantity)) AS remainingQuantity
    // FROM OrderDetail od
    // JOIN Product p ON od.productId = p.id
    // WHERE od.createdAt >= ${firstDayOfMonth} AND od.createdAt <= ${lastDayOfMonth}
    // GROUP BY p.name, od.createdAt, p.quantity
    // ORDER BY od.createdAt`;

    //         res.json(sales);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // },
};

module.exports = StatisticsController;
