const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const AuthRouter = require('./routes/AuthRoutes');
const CartRouter = require('./routes/CartRoutes');

const UserRouter = require('./routes/UserRoutes');

const OrderRouter = require('./routes/OrderRoutes');


const ProductRoutes = require('./routes/ProductRoutes');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();

app.listen((process.env.APP_PORT = 5000), () => {
    console.log('Server up and running....');
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = ['http://localhost:5173', 'https://www.getpostman.com', 'https://app.getpostman.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan('common'));
app.use(cookieParser());

app.use(path.join(__dirname, ''), express.static(path.join(__dirname, '')));

app.use(express.static(path.join(__dirname, '')));

app.use('/buyzzle/auth', AuthRouter);

app.use('/buyzzle/user', UserRouter);

// sản phẩm
app.use('/buyzzle/product', ProductRoutes);
// CART
app.use('/buyzzle/cart', CartRouter);

app.use('/buyzzle/order', OrderRouter);
