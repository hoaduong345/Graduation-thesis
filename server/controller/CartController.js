const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CartController = {
    // ADD ITEM TO CART ////
    addToCart: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            const { productId: prodId, quantity: qty } = req.body;

            const productId = parseInt(prodId);
            const quantity = parseInt(qty || 1); // default to 1 if not provided

            let cart = await CartController.findCart(userId, productId);

            if (!cart) {
                cart = await CartController.createCart(userId, productId, quantity);
                cart.subtotal += cart.item.price * quantity;
                return res.status(201).json(cart);
            }

            const updatedCart = await CartController.updateCart(cart, productId, quantity);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error('error', error);
            res.status(500).json({
                error: 'An error occurred while adding the product to the cart.',
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
                subtotal: product.sellingPrice * quantity,
                item: {
                    create: {
                        productid: productId,
                        quantity,
                        price: product.sellingPrice,
                        total: product.sellingPrice * quantity,
                    },
                },
            },
            include: { item: true },
        });
    },

    updateCart: async (cart, productId, quantity) => {
        const existingCartItem = cart.item.find((item) => item.productid === productId);
        // const newQuantity = existingCartItem.quantity + quantity
        // const newtotal = newQuantity * existingCartItem.price
        if (existingCartItem) {
            await prisma.itemCart.update({
                where: { id: existingCartItem.id },
                data: {
                    quantity: existingCartItem.quantity + quantity,
                    price: existingCartItem.sellingPrice,
                    // total: newtotal
                },
            });
        } else {
            const product = await prisma.product.findUnique({
                where: { id: productId },
            });

            if (!product) {
                throw new Error(`Product with ID ${productId} not found.`);
            }

            await prisma.itemCart.create({
                data: {
                    quantity,
                    price: product.sellingPrice,
                    total: quantity * product.sellingPrice,
                    cartschema: { connect: { id: cart.id } },
                    product: { connect: { id: product.id } },
                },
            });
        }
        const updatedCartItems = await prisma.itemCart.findMany({
            where: { cartid: cart.id },
        });

        // Calculate the updated subtotal of the cart
        const updatedSubtotal = updatedCartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        return prisma.cart.update({
            where: { id: cart.id },
            data: { subtotal: updatedSubtotal },
            include: { item: true },
        });
    },
    // DELETE ITEM FROM CART

    deleteItem: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            const productId = parseInt(req.params.id);
            const cart = await prisma.cart.findFirst({
                where: {
                    userId: userId,
                },
            });
            if (!cart) {
                return res.send('Cart is not valid');
            }
            const cartItem = await prisma.itemCart.findFirst({
                where: {
                    cartid: cart.id,
                    productid: productId,
                },
            });
            if (!cartItem) {
                return res.send('Product not found in the cart');
            }
            await prisma.itemCart.delete({
                where: {
                    id: cartItem.id,
                },
            });
            res.status(200).send('Delete item successfully');
        } catch (error) {
            console.log('error', error);
            res.status(404).send('Delete item failed');
        }
    },
    // DELETE ALL ITEM ON CART
    deleteCart: async (req, res) => {
        try {
            const userId = parseInt(req.cookies.id);
            const cart = await prisma.cart.findFirst({
                where: {
                    userId: userId,
                },
            });
            if (!cart) {
                return res.send('Cart is not valid');
            }
            const cartItems = await prisma.itemCart.findMany({
                where: {
                    cartid: cart.id,
                },
            });
            if (cartItems.length === 0) {
                return res.send('No items in the cart to delete');
            }
            for (const cartItem of cartItems) {
                await prisma.itemCart.delete({
                    where: {
                        id: cartItem.id,
                    },
                });
            }
            const updateCart = await prisma.cart.update({
                where: {
                    id: cart.id,
                },
                data: {
                    subtotal: 0,
                },
            });
            res.status(200).send('Delete cart successfully');
        } catch (error) {
            console.log('error', error);
            res.status(404).send('Delete all item failed');
        }
    },
    // UPDATE CART
    updateItem: async (req, res) => {
        try {
        } catch (error) {
            console.log('error', error);
            res.status(404).send('Update item failed');
        }
    },

    getCart: async (req, res) => {
        try {
            const id = parseInt(req.cookies.id);
            let cart = await prisma.cart.findFirst({
                where: {
                    userId: id,
                },
                include: {
                    item: {
                        include: {
                            product: {
                                include: {
                                    ProductImage: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!cart) {
                return res.status(400).json({
                    type: 'Invalid',
                    msg: 'Cart not Found',
                });
            }
            res.status(200).json({
                status: true,
                data: cart,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                type: 'Invalid',
                msg: 'Something went wrong',
                err: err,
            });
        }
    },
};

module.exports = CartController;
