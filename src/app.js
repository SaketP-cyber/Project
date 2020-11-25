const express=require('express');
const app=express()
const path=require('path');
const hbs=require("hbs");
const port=process.env.PORT || 3000;
require("./db/conn");
const bodyParser=require("body-parser");

const Register=require("./models/registers");
const result=Register.find({}).sort({"BirthYear":-1});
const Reg_cust=require("./models/cust");
const { type } = require('os');


const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");

const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(static_path));
app.set('view engine','hbs');
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});


app.get("/register",(req,res)=>{
    res.render("register");
});

app.get("/user_sign",(req,res)=>{
    res.render("user_sign");
});

app.get("/login_cust",(req,res)=>{
    res.render("login_cust");
});
app.get("/login_auth",(req,res)=>{
    res.render("login_auth");
});
app.get("/display_aut",(req,res)=>{
    res.render("display_aut");
});


app.post("/registerUser",async(req,res)=>{
    try{
        const password=req.body.psw;
        const cpsw=req.body.pswrepeat;
        const usernam=req.body.username;

        if(password===cpsw)
        {
           const registerEmployee=new Reg_cust({
          
               email:req.body.email,
               username:usernam,
               psw:password,
               pswrepeat:cpsw,

           })
          const registered= await registerEmployee.save();
          res.status(201).render("index");
        }
        else{
            res.send("Wrong Password!!")
        }
    }catch(error){
        res.status(400).send(error);
    }
});

app.post("/register",async(req,res)=>{
    try{
        const password=req.body.psw;
        const cpsw=req.body.pswrepeat;
        const nam=req.body.name;
        const usernam=req.body.username;
        const bithm=req.body.BirthMonth;
        const bithd=req.body.BirthDay;
        const bithy=req.body.BirthYear;
        const gen=req.body.gender;
        const phn=req.body.phone;

        if(password===cpsw)
        {
           const registerEmployee=new Register({
            name:nam,
               email:req.body.email,
               username:usernam,
               psw:password,
               pswrepeat:cpsw,
               BirthMonth:bithm,
               BirthDay:bithd,
               BirthYear:bithy,
               gender:gen,
               phone:phn,
             

           })
          const registered= await registerEmployee.save();
          res.status(201).render("index");
        }
        else{
            res.send("Wrong Password!!")
        }
    }catch(error){
        res.status(400).send(error);
    }
});
app.post("/login",async(req,res)=>{
    try{
        const user=req.body.username;
        const psw=req.body.psw;
        const userename=await Register.findOne({username:user});
        console.log(userename._id);
        if(userename.psw===psw)
        {
            res.status(201).render("index");
        }
        else{
            res.send('invalid password');
        }
    }catch(error){
        res.status(400).send("invalid username or password");
    }
});

app.post("/logincust",async(req,res)=>{
    try{
        const user=req.body.username;
        const psw=req.body.psw;
        const userename=await Reg_cust.findOne({username:user});
        console.log(userename._id);
        if(userename.psw===psw)
        {
            res.status(201).render("index");
        }
        else{
            res.send('invalid password');
        }
    }catch(error){
        res.status(400).send("invalid username or password");
    }
});



app.get('/display',function(res,req){
    
    result.find(function(err,users){
        if(err){
            console.log(err);
        }
        else{
            req.render('user',{users:users});
           
        }
    })
});

app.get('/show/:id',function(res,req){
    console.log(req.params._id);
    Register.findById(req.params,function(err,user){
        if(err){
            console.log(err);
        }
        else{
            req.render('display_aut',{users:user});
           
        }
    })
  
});
app.listen(port,()=>{
    console.log('Server is running at port');
})

