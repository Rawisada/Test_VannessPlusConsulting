const express = require("express") //import ตัว express
const router = express.Router() //สร้าง router
const {register,login, findUser} = require("../controllers/authController")
const {requireLogin} = require("../controllers/authController")

router.post('/login', login) 
router.post('/register', register)
router.get('/info/:email', findUser)

module.exports=router