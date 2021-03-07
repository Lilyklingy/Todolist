const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./router/userRouter");
const homeRouter = require("./router/homeRouter");
//const todoRouter = require("./router/todoRouter")
require("dotenv").config();
const app = express();
//app middlewares
app.set("view engine", "ejs");
app.use(express.json());//för att kunna parsa/konvertera json data till js
app.use(express.urlencoded({extended:false}));//för att kunna parsa/konvertera ejs data till js
app.use(cookieParser())//för att kunna läsa cookies// behövs npm i cookie-parser
app.use(userRouter);//router middlewares
app.use(homeRouter);
//app.use(todoRouter);
const options = {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex: true
}
mongoose.connect(process.env.DATABASE_URL, options, (err)=>{
    if(err){
        console.log(err)
        return
    };
    app.listen(3001, ()=>{
    console.log("App is works");})
});