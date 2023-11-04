const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const AuthRouter = require('./routes/AuthRoutes');
const CartRouter = require('./routes/CartRoutes');
const UserRouter = require('./routes/UserRoutes');
const InvoiceRouter = require('./routes/InvoiceRoutes');
const StatisticsRouter = require('./routes/Statistics_Router');
const CategoriesRouter = require('./routes/CategoriesRoutes');
const ShippingRouter = require("./routes/ShippingRoutes")
const ProductRoutes = require('./routes/ProductRoutes');
const VoucherRouter = require('./routes/VoucherRoutes');
const SripeRouter = require('./routes/StripeRoutes');
const OrderRouter = require('./routes/OrderRoutes');

const AdminRouter = require('./routes/AdminRouter');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('common'));

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

app.use(path.join(__dirname, ''), express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, '')));

// Routes
app.use('/buyzzle/auth', AuthRouter);
app.use('/buyzzle/user', UserRouter);
app.use('/buyzzle/product', ProductRoutes);
app.use('/buyzzle/cart', CartRouter);
app.use('/buyzzle/categories', CategoriesRouter);
// app.use('/buyzzle/chat', ChatRouter);
app.use("/buyzzle/shipping", ShippingRouter)
app.use('/buyzzle/voucher', VoucherRouter);
app.use('/buyzzle/statistics', StatisticsRouter);

app.use('/buyzzle/invoice', InvoiceRouter);
app.use('/buyzzle/stripe', SripeRouter);
app.use('/buyzzle/order', OrderRouter);

app.use('/admin', AdminRouter);

// Setup socket.io
// const chatController = require('./controller/ChatController')(io);
const server = http.createServer(app);
const io = socketIo(server);

// const chatController = require('./controller/ChatController')(io);

io.on('connection', (socket) => {
    console.log('Một người dùng đã kết nối');

    socket.on('disconnect', () => {
        console.log('Người dùng đã ngắt kết nối');
    });

    socket.on('send message', (message) => {
        io.emit('receive message', message);
    });
});

server.listen(process.env.APP_PORT || 5000, () => {
    console.log('Server up and running on port ' + process.env.APP_PORT);
});
