const express = require("express") 
const router = express.Router()
const {create} = require("../controllers/profileController")
// const uploadProfile = require("../middleware/uploadProfile")
const multer = require('multer');
const uploadProfile = multer({ dest: 'profiles/' })

router.post('/profile',uploadProfile.single('pdfFile'), create)

module.exports=router