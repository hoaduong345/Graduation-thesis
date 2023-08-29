
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const morgan = require("morgan")
const path = require('path')
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/AuthRoutes")
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

app.listen(process.env.APP_PORT, () =>{
    console.log('Server up and running....');
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());

app.use(path.join(__dirname, ""), express.static(path.join(__dirname, "")))

app.use(express.static(path.join(__dirname, "")));

app.use("/buyzzle/auth", AuthRouter)