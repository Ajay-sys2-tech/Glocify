const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const router = express.Router();

require("../db/conn");

const user = require("../models/user");
const auth = require("../middlewares/auth");
const Shop = require("../models/shops");



const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/catalog/")
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname) ; 
    }
})

const upload = multer({storage: fileStorage});

router.get("/register", (req, res) =>{
    // console.log(fileStorage.destination);
    res.render("shops/register");
} );

router.post("/register", upload.single('catalog'), async(req, res) =>{

    console.log(req.file);
   
    try {

        if(req.body.password1 != req.body.password2){
            const message = "Both passwords should match";
            console.log("Password mismatch");
            return res.render("shops/register", {message: message} );
        }

        else if(await Shop.findOne({email: req.body.email})){
            const message = "email already exists";
            console.log("email already exists");
            return res.render("shops/register", {message: message} );
        }
        else{
            const newShop = new Shop({
                name: req.body.name,
                category: req.body.category,
                ownerName: req.body.ownerName,
                email: req.body.email,
                phone: req.body.phone,
                panCard: req.body.panCard,
                password: req.body.password1
                
            });

            if(req.file)
            newShop.catalog = req.file.path;
    
            
              const saved = await newShop.save();
              if(saved)res.send("Shop registered succesfully!");
    
        }  
    } catch (error) {
        res.send(error);
    }
})


module.exports = router