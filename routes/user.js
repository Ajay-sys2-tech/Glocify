const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

require("../db/conn");

const user = require("../models/user");
const auth = require("../middlewares/auth");
const Product = require("../models/product");



//to show all the items 
router.get("/display", async (req, res) => {
    const allProducts = await Product.find();
    
    res.render("users/display", { products: allProducts });
})


router.get("/register", (req, res) =>{
    res.render("users/register");
} );

router.get("/secret", auth, (req, res) =>{
    return res.render("users/secret");
} );

router.get("/cart", auth, (req, res) =>{
    return res.render("users/cart");
} );



//create a new user
router.post("/register", async(req, res) =>{
    try {

        
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if(password === confirmpassword){
            const newuser = new user({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                // gender: req.body.gender
            });

            const token = await newuser.generateAuthToken();

            res.cookie("jwt", token, { 
                expires: new Date(Date.now() + 3000000),
                httpOnly: true
        });

        // console.log(cookie);


            const savedUser = await newuser.save();
            res.send("User added successfully!!!");
        }else{
            res.send("Incorrect email or password!");
        }

    }catch (error){
        console.log(error);
        res.status(400).send(error);
    }
} );


// Login form
router.get("/login", (req, res) => {
    res.render("users/login");
});

//user login 
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const curruser = await user.findOne({email:email});
        if(!curruser)return res.send("User doesn't exist");

        const chkpassword = await bcrypt.compare(password, curruser.password
            // , (err, data) => {
            // if(err) throw err;
            // if(data)return res.status(200).send("User Logged in Successfulluy");
            // else return res.status(400).send("Invalid password");
        // }
        ) ;
        const token = await curruser.generateAuthToken();

        res.cookie("jwt", token, { 
            expires: new Date(Date.now() + 3000000),
            httpOnly: true
    });

        // console.log(curruser);
        if(chkpassword){
            return res.send("User Logged in");
        }else{
            return res.status(400).send("Invalid  password");
        }

    } catch (error) {
        return res.status(400).send("Invalid username or password");
    }
});

module.exports = router;