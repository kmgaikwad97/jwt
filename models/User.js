const mongoose = require('mongoose');

// Defining Schema
const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    // password_confirmation:{type:String,required:true,trim:true},
    tc:{type:Boolean,required:true},
})

// Model
const UserModel = mongoose.model('userDetail',userSchema)

// exp
module.exports = UserModel