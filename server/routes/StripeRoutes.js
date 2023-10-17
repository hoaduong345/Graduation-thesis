const express = require('express');
const app = express();
const stripe = require('stripe')(
    'sk_test_51O0ahrIKIIhc6ETSN0E3p8O9RiVBg4AnNoQCwtvdNZuYq3yc1K8TwG5rcYSKPOuJJKDIzj3aXEvx4Zv71nKlfLvS00JFCLvX5t'
);

app.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.cartItems.map((item) => {
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
                unit_amount: item.total,
            },
            quantity: item.quantity,
        };
    });
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: 'http://localhost:5173/orderdetail',
        cancel_url: 'http://localhost:5173/cart',
    });
    res.send({ url: session.url });
});

module.exports = app;
