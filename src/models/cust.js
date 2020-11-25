const mongoose = require("mongoose");
const mySchema=new mongoose.Schema({
 
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
     required:true,
        unique:true
    },   

    psw:{
        type:String,
        required:true
    },
    pswrepeat:{
type:String,
required:true
    },
   
job:{type:Number}
})

const RegisterCust=new mongoose.model("register",mySchema);
module.exports=RegisterCust;