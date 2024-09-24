const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/base")
    .then(res=>console.log("successfully connected the database"))
    .catch(error=>console.log("caught with an error",error));

const auth_Base=new mongoose.Schema({
    longurl: String,
    shortCode: String
});

module.exports=mongoose.model("base_usee",auth_Base);