const express = require("express")
const Todo = require("../model/todoList")
const verifyToken = require("../middleware/verifyUser")
const router = express.Router() 
router.get("/todolist", verifyToken, async (req, res)=>{ 
  console.log(req.header)
  const page = +req.query.page || 1;
  const sorted = +req.query.sorted || 1;
    try{
  const totalData = await Todo.find().countDocuments();
  const dataToShowPerReq = 3;
  const totalDataPart = Math.ceil(totalData/dataToShowPerReq);   //Math.ceil(totalData/dataToShowPerReq)
  const dataToShow = dataToShowPerReq * page;
      const data = await Todo.find().limit(dataToShow).sort({name:sorted}) //.find({name:tränna}) => det kan söka key word  //  .limit(siffror) => 頭幾個 //  .skip(siffror) => jump over
      //  .select({name: 1}) => det visar bara en infor från objekt  //  .sort({name:1})   det kan sortera   -1  mot  descending, asending  // .count()

      //Todo.filter()
      res.render("todoList.ejs", {data:data, errors:"empty", dataToShow, dataToShowPerReq, totalDataPart, totalData})
    }
    catch(err){
        const error = err
        res.render("error.ejs", { error:error})
    }
  })
  router.post("/todolist",verifyToken, async (req, res)=>{
      console.log(req.body.name)
      try{
      await new Todo({
          name: req.body.name
      }).save()
      res.redirect("/todolist")
    }
    catch(err){
        res.render("error.ejs",{error:err})
    }
  })
  router.get("/todolist/edit/:id", async (req, res)=>{         
    const todo =  await Todo.findOne({_id:req.params.id})
    res.render("edit.ejs" , {todo:todo})
  })
  router.post("/todolist/edit", async (req, res)=>{
      console.log(req.body)
      await Todo.updateOne({_id:req.body.id},{name:req.body.name})
      //post request
      res.redirect("/todolist")
  })
  router.get("/todolist/delete/:id", async (req, res)=>{  
     const id = req.params.id 
      await  Todo.deleteOne({_id:id})
    res.redirect("/todolist")
  })
  module.exports = router