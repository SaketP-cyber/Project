const mongoose = require("mongoose");
const mySchema=new mongoose.Schema({
  name:{
      type:String,
      sparse:true
  },
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
    BirthMonth:{
        type:String,
        sparse:true,
        unique:false
       
    },
    BirthDay:{
        type:String,
      sparse:true,
      unique:false  
      
    },
    BirthYear:{
        type:String,
       sparse:true,
       unique:false
    },
    gender:{
        type:String,
        required:true,
        unique:false
    },
    phone:{
        type:String,
        unique:true
    },

})

const Register=new mongoose.model("newregister",mySchema);
module.exports=Register;