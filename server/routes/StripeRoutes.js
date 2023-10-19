const express = require('express');
const app = express();
const stripe = require('stripe')(
    'sk_test_51O0ahrIKIIhc6ETSN0E3p8O9RiVBg4AnNoQCwtvdNZuYq3yc1K8TwG5rcYSKPOuJJKDIzj3aXEvx4Zv71nKlfLvS00JFCLvX5t'
);

app.post('/create-checkout-session', async (req, res) => {
    const cartItems = req.body.cartItems;
    const discount = req.body.discount;

    const initialTotal = cartItems.reduce((total, item) => {
        return total + item.product.sellingPrice * item.quantity;
    }, 0);

    let finalTotal = initialTotal;
    if (discount != 0) {
        finalTotal = initialTotal * (discount / 100);
    }

    const line_items = cartItems.map((item) => {
        return {
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: item.product.name,
                    images: [item.product.ProductImage[0].url],
                    metadata: {
                        id: item.productid,
                    },
                },
                unit_amount: item.product.sellingPrice,
            },
            quantity: item.quantity,
        };
    });

    const coupon = await stripe.coupons.create({
        percent_off: discount == 0 ? 0.01 : discount,
        duration: 'once',
    });
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        discounts: [{ coupon: coupon.id }],
        success_url: 'http://localhost:5173/orderdetail',
        cancel_url: 'http://localhost:5173/cart',
    });
    res.send({ url: session.url });
});

module.exports = app;
