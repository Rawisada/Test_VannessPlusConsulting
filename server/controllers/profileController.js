const internshipInfo = require("../models/internship")
const nodemailer = require('nodemailer');
exports.create=async (req,res)=>{
    const {email, fname, lname, tel, university, position,date,gpax,profile} = req.body
    // profile = profile.name;
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
        case !tel:
            return res.status(400).json({error:"Please enter a phone number"})
            break;
        case !university:
            return res.status(400).json({error:"Please enter a university"})
            break;
        case !position:
            return res.status(400).json({error:"Please enter a position"})
            break;
        case !date:
            return res.status(400).json({error:"Please enter a date"})
            break;
        case !gpax:
            return res.status(400).json({error:"Please enter a gpax"})
            break;
        case !profile:
            return res.status(400).json({error:"Please enter a profile"})
            break;
    }
    //save data
    internshipInfo.create({email, fname, lname, tel, university, position, date, gpax, profile})
    .then(
        (result)=>{res.json(result)
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-password'
                }
            });
    
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: email,
                subject: 'Internship',
                text: 'application'
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info);
                }
            });
                
            }
    )
    .catch((err)=>{res.status(400).json({error:err})})

}
