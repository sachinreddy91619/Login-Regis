import express from "express"

import cors from 'cors'

import mongoose from 'mongoose'



const app= express()

app.use(express.json())

app.use(express.urlencoded( { extended: true } ))

app.use(cors())




mongoose.connect('mongodb://127.0.0.1:27017/LOginRegisterDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Login-registerDB Connected")
})




// models

const userSchema= new mongoose.Schema({

    name:String,
    email:String,
    password:String,

});

const User= new mongoose.model("User",userSchema)














//Routes:

app.get('/',(req,res)=>{

    res.send("MY API")

})


app.post("/login",async(req,res)=>{
  

    const {email,password}=req.body;
    try{

        const user= await User.findOne({email:email});

        if(user){
            if(password===user.password){

                res.send({message:"Login Successfull",user:user})

            }
            else{
                res.send({message:"Password Didn't Matched"})
            }
            
        }

        else{
            res.send({message:"User not registered"})
        }

    }
    catch (err)
    {
        res.send(err);
    }
});




app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
            const user = await User.findOne({ email: email });
            if (user) {
                res.send({ message: "User already registered" });
                alert(res.data.message)
            }
            else {
                        const newUser = new User({
                        name,
                        email,
                        password
                        });
                        await newUser.save();
                        res.send({ message: "Successful registration, please login now." });
            }
    }
    catch (err)
     {
      res.send(err);
     }
  });




app.listen(4507,()=>{
    console.log("servering is running on 4507...")
})


