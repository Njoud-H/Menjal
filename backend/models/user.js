const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    //customer & farmer
    role : {
        type :String , 
        required :true ,
    },
    email : {
        type :String , 
        required :true
    } , 
    name : {
        type :String , 
        required :true
    }, 
    password : {
        type :String , 
        required :true
    },
    // farmer
    farmName: String,
    farmDescription: String,
    farmLocation: String,
    product:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    // customer
    favoriteProducts: Array,
    cart: Array
} , {timestamps :true})


const User = mongoose.model('user' , userSchema)
module.exports = User