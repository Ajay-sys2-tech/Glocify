const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

require("../db/conn");
const user = require("../models/user");

router.get("/register", (req, res) =>{
    res.render("users/register");
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
                gender: req.body.gender
            });

            const savedUser = await newuser.save();
            res.send("User added successfully!!!");
        }else{
            res.send("Incorrect email or password!");
        }

    }catch (error){
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

        const chkpassword = bcrypt.compare(password, curruser.password) 
        // console.log(curruser);
        if(chkpassword){
            res.send("User Logged in");
        }else{
            res.status(400).send("Invalid  password");
        }

    } catch (error) {
        res.status(400).send("Invalid username or password");
    }
});

module.exports = router;