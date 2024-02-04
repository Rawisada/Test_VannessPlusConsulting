const mongoose = require("mongoose")
//โครงส้รางในการเก็บข้อมูล
const internshipDetailSchema =  mongoose.Schema({
    email:{
        type:String,
        required:true, //ห้ามป้อนเป็นค่าว่าง
        unique:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true 
    },
    tel:{
        type:Number, 
        required:true
    },
    university:{
        type:String,
        required:true 
    },
    position:{
        type:String,
        required:true 
    },
    date:{
        type:String,
        required:true 
    },
    gpax:{
        type:Number,
        required:true 
    },
    profile:{
        type:String,
        required:true
    }



},{timestamps:true})// timestamps เก็บบันทึกเวลาตอนสร้างและอัปเดต

module.exports=mongoose.model("internshipInfo", internshipDetailSchema)