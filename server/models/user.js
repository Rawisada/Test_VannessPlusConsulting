const mongoose = require("mongoose")
//โครงส้รางในการเก็บข้อมูล
const userDetailSchema =  mongoose.Schema({
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
        required:true //ห้ามป้อนเป็นค่าว่าง หรือระบุ default:"Admin"
    },
    password:{
        type:String,
        required:true //ห้ามป้อนเป็นค่าว่าง หรือระบุ default:"Admin"
    },
    birthday:{
        type:Date,
        required:true 
    },
    gender:{
        type:String,
        required:true //ห้ามป้อนเป็นค่าว่าง หรือระบุ default:"Admin"
    },
    tel:{
        type:Number, 
        required:true
    },


},{timestamps:true})// timestamps เก็บบันทึกเวลาตอนสร้างและอัปเดต

module.exports=mongoose.model("UserInfo", userDetailSchema)