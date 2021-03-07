//reset render: en resetemailform.ejs
//reset submit: submit formläret
const User = require("../model/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
//skapar en tunnel till från vår app till mail server
const transport =nodemailer.createTransport({service:"gmail",
auth:{user:"a173245655@gmail.com", pass:"lei123zhang"}})
const resetRender = (req, res) =>{
    res.render("reset.ejs", {err:" "});
}
const resetSubmit = async (req, res)=>{
    //check if user exists
    const email = req.body.email;
    //check token and token expiration
    const user = await User.findOne({email:email});
    if(!user) return res.redirect("/register");//if dont have user return register sidan
    //spara token and token expiration
    const token = crypto.randomBytes(32).toString("hex");
    user.token = token;
    user.tokenExpiration = Date.now() + 3600000;
    await user.save();
    //en link med token till användarens mejl adress
    //transport services for mejl: tar data från appen --> majl server --> användare fårn data
    transport.sendMail({
        from:"a173245655@gmail.com",
        to:user.email,
        subject:"Reset password requested",
        html:`<strong> Klick <a href="http://localhost:3001/reset/${user.token}"> link</a> för att kunna återställ lösenord`
    })
    res.render("checkMail.ejs")
}
const resetParams = async (req, res)=>{
//req.params
const token = req.params.token;
try{
const user = await User.findOne({token:token, tokenExpiration:{ $gt: Date.now()}});
if(!user) return res.redirect("/register");
res.render("resetPasswordFrom.ejs", {err:" ", email:user.email});
}
catch(err){
    res.render("/reset.ejs", {err:"Försök igen"});
}
}
const resetFormSubmit = async (req,res)=>{
    const password = req.body.newPassword;
    const email = req.body.email;
    const salt = await bcrypt.genSalt(12);
    const hashadPassword = await bcrypt.hash(password, salt);
    //check user
    const user = await User.findOne({email:email});
    user.password = hashadPassword;
    await user.save();
    res.redirect("/login");
}
module.exports = {
    resetSubmit,
    resetRender,
    resetParams,
    resetFormSubmit
}