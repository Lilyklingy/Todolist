const mongoose = require("mongoose");
//name, email, password, role:Boolean, true ->lärare
const userSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:String,
    token:String,
    date:Date,
    tokenExpiration:Date
})
const User = mongoose.model("user", userSchema);
module.exports=User;