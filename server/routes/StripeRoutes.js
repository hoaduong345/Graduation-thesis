const express = require('express');
const app = express();
const stripe = require('stripe')(
    'sk_test_51O0ahrIKIIhc6ETSN0E3p8O9RiVBg4AnNoQCwtvdNZuYq3yc1K8TwG5rcYSKPOuJJKDIzj3aXEvx4Zv71nKlfLvS00JFCLvX5t'
);

app.post('/create-checkout-session', async (req, res) => {
    // Assuming you have access to the cart data in req.body.cart (replace this with your actual cart data)
    const cart = req.body.cart;

    // Create an array to store line items
    const lineItems = [];

    // Iterate through the items in the cart and add them to the line_items array
    for (const item of cart) {
        lineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.name,
                },
                unit_amount: item.product.price, 
            },
            quantity: item.quantity,
        });

        // You can also add custom data to the metadata for each item
        lineItems[lineItems.length - 1].price_data.product_data.metadata = {
            quantity: item.quantity,
            price: item.product.price,
            // Add more custom data as needed
        };
    }

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/checkout-success',
        cancel_url: 'http://localhost:5173/cart',
    });

    res.redirect(303, session.url);
});

module.exports = app;
