const homeRender = (req, res)=>{
    console.log(req.user);
    res.render("todoList.ejs", {user:req.user});
}
// const homeIntructor = (req, res)=>{
//     consol.log(req.user.user)
//     res.render("instructorHome.ejs", {user:req.user})
// }
module.exports= {
    homeRender
    //homeIntructor
}