const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");


require("./db/conn");
const user = require("./models/user");


const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "/public");
const partials_path = path.join(__dirname, "/views/partials");


app.use(express.static(static_path));
app.set("view engine", "hbs");
// app.set("views", views_path);
hbs.registerPartials(partials_path);


app.use(express.json());
app.use(express.urlencoded({ extended: false}));



app.get("/", (req, res) =>{
    res.render("index");
} );

const userRoutes = require("./routes/user");
app.use("/users", userRoutes);


// app.get("/users/register", (req, res) =>{
//     res.render("users/register");
// } );


//create a new user
// app.post("/users/register", async(req, res) =>{
//     try {
//         const password = req.body.password;
//         const confirmpassword = req.body.confirmpassword;

//         if(password === confirmpassword){
//             const newuser = new user({
//                 name: req.body.name,
//                 email: req.body.email,
//                 phone: req.body.phone,
//                 password: password,
//                 gender: req.body.gender
//             });

//             const savedUser = await newuser.save();
//             res.send("User added successfully!!!");
//         }else{
//             res.send("Password not matching!");
//         }

//     }catch (error){
//         res.status(400).send(error);
//     }
// } );


// // Login form
// app.get("/users/login", (req, res) => {
//     res.render("users/login");
// });

// //user login 
// app.post("/users/login", async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         const curruser = await user.findOne({email:email});

//         console.log(curruser);
//         if(curruser.password == password){
//             res.send("User Logged in");
//         }else{
//             res.status(400).send("Invalid  password");
//         }

//     } catch (error) {
//         res.status(400).send("Invalid username or password");
//     }
// });

app.listen(port, () => console.log(`App listening on port ${port}!`))