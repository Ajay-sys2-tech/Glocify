const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jwt = require("jsonwebtoken");
require('dotenv').config();



const productSchema = new Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    price: {type: number, required: true},
    sellerID: {type: String, required: true}, 
    rating: {type: number}
});




const Product = new mongoose.model('Product', productSchema);

module.exports = Product;