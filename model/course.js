const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:String,
    price:{type:String, required:true}
});
const Course = mongoose.model("course", courseSchema);
module.exports = Course;