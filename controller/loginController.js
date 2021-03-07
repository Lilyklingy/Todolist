const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const loginRender = (req,res)=>{
    res.render("login.ejs", {err:" "})
}
const loginSubmit = async (req,res)=>{
    //read from req.body
    const {email, password} = req.body;
    //kolla upp i databasen om användare finns
    const user = await User.findOne({email:email});
    //connect-flash npm  //middleware för att kunna spara fel meddelandet när man redirecter
    if(!user) return res.rendirect("/register");
    //jämför vi lösenord bcrypt.compare
    const validUser = await bcrypt.compare(password, user.password);
    console.log(validUser);
    if(!validUser) return res.rendirect("/login");
    //låter användare logga in
    //http är stateless, jwtToken som består payload/userdata, secret kkey
    //token     payload, secret key
    const jwtToken = await jwt.sign({user:user}, process.env.SECRET_KEY);
    if(jwtToken){
        const cookie = req.cookies.jwtToken;
        if(!cookie){
            res.cookie("jwtToken", jwtToken, {maxAge:360000000, httpOnly:true});
        }
        return res.redirect("/");
    }
    return res.rendirect("login")
}
module.exports = {
    loginRender,
    loginSubmit
}