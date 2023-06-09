const express=require('express')
const router=express.Router()
const Video =require("../Models/videoModel")
const Validation = require("../Validation/Validation")

router.post("/upload",Validation,async(req,resp)=>{
    console.log(req.body)
   try {
    const data=await new Video({...req.body, userid:req.userid})
    await data.save()
    resp.status(200).json({
        status:"saved successfully"    })
   } catch (error) {
    resp.status(400).json({
        message: error.message
    })
   }
    
})

router.get('/home',async (req,resp)=>{
try{
const data = await Video.find()
resp.status(200).json(data)
}catch(err){
resp.json({message:err.message})
}
})

router.get('/myvideos',Validation,async(req, resp)=>{
    try {
        const data = await Video.find({userid:req.userid})
        console.log(data);
        resp.status(200).json(data)
    } catch (err) {
        resp.json({message:err.message})
    }
})

router.delete('/myvideos/:id',async(req, resp)=>{
    try {
        const data = await Video.findByIdAndDelete(req.params.id);
        resp.status(200).json({message:'data deleted succefully'})
    } catch (err) {
        resp.json({message:err.message})
    }
})

module.exports=router

