const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const StatisticsController = {
    getStatictics: async (req, res) => {
        try {
            // Thêm thông số skip và take để phân trang
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 40;
            const skip = (page - 1) * pageSize; // Số lượng sản phẩm được bỏ qua (trang đầu tiên)
            const take = pageSize; // Số lượng sản phẩm được lấy

            const { date } = req.query; // Ngày cần thống kê (ví dụ: '2023-10-01')
            const selectedDate = new Date(date);

            // Tính ngày đầu và cuối tháng từ ngày đã chọn
            const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
            const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

            // Lấy danh sách sản phẩm
            const products = await prisma.product.findMany();

            // Tạo một đối tượng để lưu trữ số lượng sản phẩm ban đầu
            let initialProductQuantities = {};

            // Truy vấn cơ sở dữ liệu để lấy các chi tiết đơn hàng trong tháng
            const orderDetails = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                        lte: lastDayOfMonth,
                    },
                },
                include: {
                    productOrder: {
                        select: {
                            id: true,
                            name: true,
                            quantity: true,
                            createdAt: true,
                        },
                    },
                },
            });

            // Tính tổng doanh thu, tổng số lượng sản phẩm đã bán và thông tin thêm từ sản phẩm cho tháng truyền vào
            let totalRevenueSelectedMonth = 0;
            let totalQuantitySoldSelectedMonth = 0;
            let productsInfoSelectedMonth = {};

            orderDetails.forEach((orderDetail) => {
                const productInfo = orderDetail.productOrder;

                if (productInfo) {
                    const productId = productInfo.id;

                    if (!initialProductQuantities[productId]) {
                        initialProductQuantities[productId] =
                            products.find((product) => product.id === productId)?.quantity || 0;
                    }

                    totalQuantitySoldSelectedMonth += orderDetail.quantity;

                    // Tính toán totalQuantityBought dựa trên số lượng sản phẩm ban đầu trừ đi số lượng đã bán
                    productsInfoSelectedMonth[productId] = {
                        name: productInfo.name,
                        totalQuantityBought: initialProductQuantities[productId] - totalQuantitySoldSelectedMonth,
                        createdAt: productInfo.createdAt,
                    };

                    // Tính tổng doanh thu
                    totalRevenueSelectedMonth += orderDetail.price * orderDetail.quantity;
                }
            });

            // Tính toán doanh thu cho tháng hiện tại realtime (ví dụ: tháng hiện tại là tháng 10, 2023)
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const firstDayOfCurrentMonth = new Date(currentYear, currentMonth - 1, 1);
            const lastDayOfCurrentMonth = new Date(currentYear, currentMonth, 0);

            const orderDetailsCurrentMonth = await prisma.orderDetail.findMany({
                where: {
                    createdAt: {
                        gte: firstDayOfCurrentMonth,
                        lte: lastDayOfCurrentMonth,
                    },
                },
            });

            // doanh thu trong thang
            let totalRevenueCurrentMonth = 0;
            // so luong san pham duoc ban ra trong thang
            let totalQuantitySoldCurrentMonth = 0;

            orderDetailsCurrentMonth.forEach((orderDetail) => {
                totalRevenueCurrentMonth += orderDetail.price * orderDetail.quantity;
                totalQuantitySoldCurrentMonth += orderDetail.quantity;
            });

            // Tính toán phần trăm tăng trưởng giữa tháng truyền vào và tháng hiện tại
            const revenueGrowthPercentage =
                ((totalRevenueCurrentMonth - totalRevenueSelectedMonth) / totalRevenueSelectedMonth) * 100;

            // Tính toán phần trăm so sánh số lượng sản phẩm đã bán giữa hai tháng
            const quantitySoldComparisonPercentage =
                (totalQuantitySoldCurrentMonth / totalQuantitySoldSelectedMonth) * 100;

            // Lấy danh sách sản phẩm hot (lượng mua cao nhất trong 30 ngày trước)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const topProducts = await prisma.orderDetail.findMany({
                orderBy: {
                    quantity: 'desc',
                },
                skip, // Bỏ qua sản phẩm
                take, // Lấy số lượng sản phẩ
            });

            res.status(200).json({
                totalRevenue: totalRevenueSelectedMonth, // Tổng doanh thu trong tháng
                totalQuantitySold: totalQuantitySoldSelectedMonth, // Tổng số lượng đã bán trong tháng
                productsInfo: productsInfoSelectedMonth, // Thông tin sản phẩm (số lượng còn lại, ngày sản phẩm được mua trong tháng, tên sản phẩm)
                totalRevenueCurrentMonth, // Doanh thu tháng hiện tại
                revenueGrowthPercentage, // Phần trăm tăng trưởng doanh thu giữa hai tháng
                totalQuantitySoldCurrentMonth, // SO luong san pham tháng hiện tại
                quantitySoldComparisonPercentage, // Phần trăm tăng trưởng SO luong san pham giữa hai tháng
                hotProducts: topProducts, // Danh sách sản phẩm hot (lượng mua cao nhất trong 30 ngày trước)
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    },
};

module.exports = StatisticsController;
