const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CartController = {
  // ADD ITEM TO CART
  addToCart: async (req, res) => {
    try {
      const userId = parseInt(req.cookies.id || 1);
      const { productId: prodId, quantity: qty } = req.body;

      const productId = parseInt(prodId);
      const quantity = parseInt(qty || 1); // default to 1 if not provided

      let cart = await CartController.findCart(userId, productId);

      if (!cart) {
        cart = await CartController.createCart(userId, productId, quantity);
        return res.status(201).json(cart);
      }

      const updatedCart = await CartController.updateCart(
        cart,
        productId,
        quantity
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "An error occurred while adding the product to the cart.",
        });
    }
  },

  findCart: (userId, productId) => {
    return prisma.cart.findFirst({
      where: { userId },
      include: {
        item: { where: { productid: productId } },
      },
    });
  },

  createCart: async (userId, productId, quantity) => {
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    return prisma.cart.create({
      data: {
        userId,
        subtotal: product.price * quantity,
        item: {
          create: {
            productid: productId,
            quantity,
            price: product.price,
            total: product.price * quantity,
          },
        },
      },
      include: { item: true },
    });
  },

  updateCart: async (cart, productId, quantity) => {
    const existingCartItem = cart.item.find(
      (item) => item.productid === productId
    );

    if (existingCartItem) {
      await prisma.itemCart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      await prisma.itemCart.create({
        data: {
          productid: productId,
          quantity,
          total: 0,
          cartschema: { connect: { id: cart.id } },
        },
      });
    }
    const updatedCartItems = await prisma.itemCart.findMany({
      where: { cartschema: cart.id },
    });

    // Calculate the updated subtotal of the cart
    const updatedSubtotal = updatedCartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    return prisma.cartSchema.update({
      where: { id: cart.id },
      data: { subtotal: updatedSubtotal },
      include: { item: true },
    });
  },
  getCart: async (req, res) => {
    try {
      const idCart = parseInt(req.body.id);

      const Cart = await prisma.cart.findFirst({
        where: {
          id: idCart,
        },
        include: {
          item,
        },
      });
      console.log("aaaaa");
      res.status(200).send("Get Cart Successfully");
    } catch (error) {
      console.log("bbbbb", error);
      res.status(404).send("Get Cart failed");
    }
  },
};

module.exports = CartController;
