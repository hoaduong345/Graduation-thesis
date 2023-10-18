const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51O0ahrIKIIhc6ETSN0E3p8O9RiVBg4AnNoQCwtvdNZuYq3yc1K8TwG5rcYSKPOuJJKDIzj3aXEvx4Zv71nKlfLvS00JFCLvX5t')

app.post('/create-checkout-session', async (req, res) => {
  
  const line_items = req.body.cartItems.map(item => {
    
    return{
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.ProductImage],
          metadata:{
            id: item.id
          }
        },
        unit_amount: item.sellingPrice,
      },
      quantity: item.quantity,
    }
  })
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/checkout-success',
      cancel_url: 'http://localhost:5173/cart',
    });
    res.send(303, session.url);
  });

  module.exports = app