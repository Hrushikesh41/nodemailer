const express = require("express");
const mail = require("nodemailer")

const router = express.Router();

const email = {
    userEmail : "",
    from : "hkokardekar@gmail.com"
}

const otp = Math.floor(1000 + Math.random() * 9000)

router.post("/send", (req, res)=>{
    const userMail = req.body.email;

    email.userEmail = userMail;

    const transporter = mail.createTransport({
        service : "gmail",
        auth : {
            user : email.from,
            pass : "rhzwbqiwrcamdnww"
        }
    })

    const mailOption = {
        from : email.from,
        to : email.userEmail,
        subject : "Email Verification",
        html : `<h3>${otp} is the OTP for Your Email Verification </h3>`
    }

    transporter.sendMail(mailOption, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log("OTP Sent to Your EmailID");
        }
    })

});

router.post("/verify", (req, res)=>{
    const otpConfirm = req.body.otp;

    if(otp === otpConfirm){
        const transporter = mail.createTransport({
            service : "gmail",
            auth : {
                user : email.from,
                pass : "rhzwbqiwrcamdnww"
            }
        })

        const mailOption = {
            from : email.from,
            to : email.userEmail,
            subject : "EMAIL Verified",
            html : `<h3>Your Email is Successfully Verified`
        }

        transporter.sendMail(mailOption, (error, info)=>{
            if(error){
                console.log(error);
            }else{
                console.log("Follow Up Email Sent");
            }
        })
    }else{
        return res.status(500).json({error : "Invaid OTP"})
    }
})

module.exports = router