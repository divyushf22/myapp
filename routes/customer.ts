import express from "express";
const router = express.Router();
import { isEmailValid, isNumberValid } from "../middlewares/validation";

import * as Utils  from "../utils/index";
// {
//   generateOTP ,
//   sendEmail,
//   generateHashedOTP,
//   issueToken,
//   verifyToken,
//   comapareOTP,
//   emailLogin,
//   numberLogin,
// } 

let jwtSecretKey: string = "mysecret";

router.post("/login", isEmailValid, isNumberValid, async (req:any, res:any) => {
    let type = req.query.type;

    if (type == "email") {
        try {
            let email: string = req.body.email;
            let token = await Utils.emailLogin(email, jwtSecretKey);
            res.status(200).json({ token });
        } catch (err) {
            let message: string = "Error in email login";
            console.log(message, err);
            res.status(401).json({ message: message });
        }
    } else if (type == "number") {
        try {
            let phoneNumber: string = req.body.number;
            let token = await Utils.numberLogin(phoneNumber, jwtSecretKey);
            res.status(200).json({ token });
        } catch (err) {
            let message: string = "Error in Phone Number login";
            console.log(message, err);
            res.status(401).json({ message: message });
        }
    } else {
        res.send({ message: "google login" });
    }
});

router.post("/login/verify", async (req:any, res:any) => {
    try {
        let userOtp: string = req.body.otp;
        const token = req.headers.authorization;
        if (!token)
            return res.status(401).json({ message: "Access denied. Token missing." });

        const decoded = Utils.verifyToken(token, jwtSecretKey);
        const serverOtp = decoded.otp;
        const otpMatch: boolean = await Utils.comapareOTP(userOtp, serverOtp);

        if (otpMatch) {
            console.log("OTP matched.");
            res.status(200).json({ message: "OTP matched." }); // Example response
        } else {
            console.log("OTP does not match.");
            return res.status(400).json({ message: "Invalid OTP." });
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Error in Verifying user" });
    }
});

router.post('/login/google',(req,res)=>{
    res.send("Google login");
})

export default router;
