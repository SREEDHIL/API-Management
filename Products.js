const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:String,
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        required:true
    }
});

const Products = mongoose.model('productCollection', productSchema);
module.exports = {Products};
