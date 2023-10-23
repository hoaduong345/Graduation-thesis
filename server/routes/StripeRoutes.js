const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const stripe = require('stripe')(
    'sk_test_51O0ahrIKIIhc6ETSN0E3p8O9RiVBg4AnNoQCwtvdNZuYq3yc1K8TwG5rcYSKPOuJJKDIzj3aXEvx4Zv71nKlfLvS00JFCLvX5t'
);

app.post('/create-checkout-session', async (req, res) => {
   try {
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
        percent_off: discount || 1,
        duration: 'once',
    });
    const shippingRate = await stripe.shippingRates.create({
        display_name: 'Ground shipping',
        type: 'fixed_amount',
        fixed_amount: {
            amount: 30000,
            currency: 'vnd',
        },
    });
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        discounts: !discount ? [] : [{ coupon: coupon.id }],
        shipping_options: [{ shipping_rate: shippingRate.id }],
        success_url: 'http://localhost:5173/orderdetail',
        cancel_url: 'http://localhost:5173/cart',
    });
    res.send({ url: session.url });
   } catch (error) {
    console.log("Cannot check-out",error)
   }
});

const fulfillOrder = (session) => {
    // TODO: fill me in
    console.log('Fulfilling order', session);
};

const createOrder = (session) => {
    console.log('Creating order', session);
    axios.post('http://localhost:5000/buyzzle/invoice', session);
};

const emailCustomerAboutFailedPayment = (session) => {
    // TODO: fill me in
    console.log('Emailing customer', session);
};

const endpointSecret = 'whsec_552c5c038fb79b6ce04ee2655ed10451defd99c0c1195f27953833dbb4d1d032';

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Xử lý sự kiện Payment.session.completed
    if (event.type === 'checkout.session.completed') {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
            expand: ['line_items'],
        });
        const lineItems = sessionWithLineItems.line_items;
        console.log(lineItems);
        // Fulfill the purchase...
        fulfillOrder(lineItems);
    }
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            console.log(session);
            // Lưu đơn hàng vào cơ sở dữ liệu của bạn, được đánh dấu là 'đang chờ thanh toán'
            // createOrder(session);

            // Kiểm tra xem đơn hàng đã được thanh toán chưa (ví dụ: thanh toán bằng thẻ)
            //
            // Thanh toán thông báo bị trì hoãn sẽ có trạng thái `chưa thanh toán`, như
            // tài khoản bạn vẫn đang đợi tiền được chuyển từ tài khoản của khách hàng.
            // if (session.payment_status === 'paid') {
            //     fulfillOrder(session);
            // }

            break;
        }

        case 'checkout.session.async_payment_succeeded': {
            const session = event.data.object;

            // Thực hiện việc mua hàng...
            fulfillOrder(session);

            break;
        }

        case 'checkout.session.async_payment_failed': {
            const session = event.data.object;

            // Gửi email cho khách hàng yêu cầu họ thử lại đơn hàng
            emailCustomerAboutFailedPayment(session);

            break;
        }
    }
    response.status(200).end();
});

module.exports = app;
