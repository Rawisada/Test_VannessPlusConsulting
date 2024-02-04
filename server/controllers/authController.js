const jwt = require("jsonwebtoken")
const UserInfo = require("../models/user")
const bcrypt = require("bcryptjs")
const {expressjwt: expressjwt} = require("express-jwt")
//check login
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserInfo.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ token, email });
      } else {
        return res.status(400).json({ error: "Invalid email or password" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err});
    }
  };

//ตรวจสอบ troken
exports.requireLogin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
})

//ลงทะเบียน email
exports.register=async (req,res)=>{
    const {fname, lname , bday, gender, tel, email, password} = req.body
    const encryptedPassword  = await bcrypt.hash(password,10);
    const birthday = new Date(bday);
    switch(true){
        case !email:
            return res.status(400).json({error:"Please enter an email"})
            break;
        case !fname:
            return res.status(400).json({error:"Please enter your first name"})
            break;
        case !lname:
            return res.status(400).json({error:"Please enter your last name"})
            break;
        case !password:
            return res.status(400).json({error:"Please enter a password"})
            break;
        case !tel:
            return res.status(400).json({error:"Please enter a phone number"})
            break;
        case !gender:
            return res.status(400).json({error:"Please select a gender"})
            break;
        // case !bday:
        //     return res.status(400).json({error:"Please enter your birthday"})
        //     break;
            
        
    }
    //save data
    UserInfo.create({email,fname, lname, password:encryptedPassword,birthday:birthday,gender,tel})
    .then((result)=>{res.json(result)})
    .catch((err)=>{res.status(400).json({error:err})})

}

exports.findUser=async (req,res)=>{
    //const {email} = req.body
    const {email} = req.params
    const user = await UserInfo.findOne({email});
    return res.json(user)

}
