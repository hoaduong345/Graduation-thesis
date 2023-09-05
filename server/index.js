
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const morgan = require("morgan")
const path = require('path')
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/AuthRoutes")

const ProductRoutes = require("./routes/ProductRoutes")

dotenv.config();

const app = express();

app.listen(process.env.APP_PORT, () =>{
    console.log('Server up and running....');
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("common"));

app.use(path.join(__dirname, ""), express.static(path.join(__dirname, "")))

app.use(express.static(path.join(__dirname, "")));

app.use("/buyzzle/auth", AuthRouter)


// sản phẩm
app.use("/buyzzle/product/add", ProductRoutes)

app.use("/buyzzle/product/delete", ProductRoutes); 

app.use("/buyzzle/product/update", ProductRoutes); 

app.use("/buyzzle/product/detail", ProductRoutes);

app.use('/buyzzle/product/getall', ProductRoutes);

app.use('/buyzzle/product/page', ProductRoutes);

app.use('/buyzzle/product/search', ProductRoutes);

// danh mục
app.use("/buyzzle/product/addcategory", ProductRoutes);

app.use("/buyzzle/product/deletecategory", ProductRoutes);

app.use("/buyzzle/product/updatecategory", ProductRoutes);

