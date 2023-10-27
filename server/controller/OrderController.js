const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const userId = parseInt(req.cookies.id);
      console.log("userId", userId);
      const cartItems = req.body.cartItems;
      const orders = [];

      // Find the existing order for the user
      const order = await findUserOrder(userId);

      for (const cartItem of cartItems) {
        if (!order) {
          const newOrder = await createNewOrder(userId, cartItem.product.id);
          orders.push(newOrder);
        } else {
          await createOrderDetailIfNotExists(order.id, cartItem.product.id);
        }
      }

      res.status(200).json(orders);
    } catch (error) {
      handleOrderCreationError(error, res);
    }
  },

  getOrderDetails: async (req, res) => {
    try {
      const userId = parseInt(req.cookies.id);
      const order = await findUserOrder(userId, true);
      res.status(200).json(order);
    } catch (error) {
      handleOrderDetailError(error, res);
    }
  },
};

async function findUserOrder(userId, includeDetails = false) {
  return prisma.order.findFirst({
    where: {
      userId: userId,
    },
    include: includeDetails
      ? {
          OrderDetail: {
            include: {
              productOrder: {
                include: {
                  ProductImage: true,
                },
              },
            },
          },
        }
      : {},
  });
}

async function createNewOrder(userId, productId) {
  return prisma.order.create({
    data: {
      userId,
      OrderDetail: {
        create: {
          productId,
        },
      },
    },
    include: { OrderDetail: true },
  });
}

async function createOrderDetailIfNotExists(orderId, productId) {
  const existingOrderDetail = await prisma.orderDetail.findFirst({
    where: {
      orderId,
      productId,
    },
  });

  if (!existingOrderDetail) {
    await prisma.orderDetail.create({
      data: {
        orderId,
        productId,
      },
    });
  }
}

function handleOrderCreationError(error, res) {
  console.error(error);
  res.status(500).json({ error: 'Add orders to the database failed' });
}

function handleOrderDetailError(error, res) {
  console.error('error', error);
  res.status(404).send('Get order failed');
}

module.exports = OrderController;
