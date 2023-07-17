const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express()
app.use(cors())
app.use(express.json())

const PORT=process.env.PORT || 8080;

//schema

const schemaData=mongoose.Schema({

    name:String,
    email:String,
    mobile:String

},{
    timestamps:true
})

const userModel=mongoose.model("user",schemaData)


//read data
app.get("/",async(req,res)=>{
    const data=await userModel.find({})
    res.json({success:true,data:data})
})

// add data in db

app.post("/create",async(req,res)=>{
    console.log(req.body);
    const data=new userModel(req.body)
    await data.save();
    res.send({success:true,message:"data save successfully",data:data});
})


//update the data

app.put("/update", async(req,res)=>{
    console.log(req.body);

    const {id,...rest}=req.body;

    const data=await userModel.updateOne({_id:req.body.id},rest)
    res.send({success:true,message:"data updated successfully",data:data});
    

})


//delete the data

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const data=await userModel.deleteOne({_id:id})
    res.send({success:true,message:"data delete successfully",data:data});

})


// connect with database
mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
.then(()=>{
    console.log("connected with database")
    app.listen(PORT,()=> console.log("server is running"))
})
.catch((err)=>console.log(err));

