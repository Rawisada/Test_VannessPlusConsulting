const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')
const app = express()

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log("conectin complete"))
.catch((err)=>console.log(err))

app.use('/profiles', express.static('profiles'))
app.use(express.json()) //server respond .json for client
app.use(cors())
app.use(morgan("dev"))
app.use('/api', authRoute)
app.use('/api', profileRoute)



const port = process.env.PORT || 8080 // จะใช้ 8080 ถ้าไม่ระบุ port
app.listen(port,()=>console.log(`start server in port ${port}`))