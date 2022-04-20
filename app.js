const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
require('dotenv').config()


require("./db/conn");

const user = require("./models/user");
const auth = require("./middlewares/auth");


const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "/public");
const partials_path = path.join(__dirname, "/views/partials");


app.use(express.static(static_path));
app.set("view engine", "hbs");
// app.set("views", views_path);
hbs.registerPartials(partials_path);


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));



app.get("/", (req, res) =>{
    res.render("index");
} );

const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

const shopRoutes = require("./routes/shops");
app.use("/shops", shopRoutes);




app.listen(port, () => console.log(`App listening on port ${port}!`))