import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface emailData{
    email: string;
    otp:string
}
interface numberData{
    number: string;
    otp:string;
}

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "divyush@f22labs.com",
        pass: "Divyushpoonia1*",
    },
});

interface mailDetail {
   from:string;
   to:string;
   subject:string;
   text:string;
}

const issueToken = (details:any, expiresInHr:string = "1h", secretKey:string = "mysecret") : string =>  jwt.sign({ ...details }, secretKey, { expiresIn: expiresInHr });

const verifyToken = (token: string = "", secretKey:string = "mysecret") => jwt.verify(token, secretKey);

const sendEmail = async (to:string, subject:string, text:string, from:string = "divyush@f22labs.com") => {
    let mailDetails : mailDetail;
    mailDetails= {
        from,
        to,
        subject,
        text,
    };

    
    mailTransporter.sendMail(mailDetails, function (err:any, data:any) : boolean {
        if (err) {
            throw err;
        } else {
            return true;
        }
    });
};

const generateOTP = (min:number = 1, max:number = 10) : number => {
    return Math.floor(Math.random() * (max - min) + min);
};


const emailLogin = async(email:string, jwtSecretKey:string) : Promise<string> =>
{
    
        let otp : number = generateOTP(100000, 999999);
        let hashedOtp : string = await generateHashedOTP(otp);

        console.log("hashed otp = ", hashedOtp);
        sendEmail(email, "OTP", `Your 6 digit otp is ${otp}`);

        let data: emailData = {
            email: email,
            otp: hashedOtp
        }

        return issueToken(data, "10m", jwtSecretKey);
}

const numberLogin  = async (phoneNumber: string, jwtSecretKey:string)=>{
        let otp : number = generateOTP(100000, 999999);
        console.log("number otp -> ", otp);
        let hashedOtp : string = await generateHashedOTP(otp);

        let data : numberData = {
            number: phoneNumber,
            otp: hashedOtp
        }

       return issueToken(data, "10m", jwtSecretKey);
}



const generateHashedOTP = async (otp: number) : Promise<string> => bcrypt.hash(otp.toString(), await bcrypt.genSalt());

const comapareOTP = async (userOtp: string, serverOtp:string) : Promise<boolean> => bcrypt.compare(userOtp.toString(), serverOtp);
export {
    generateOTP,
    sendEmail,
    issueToken,
    verifyToken,
    generateHashedOTP,
    comapareOTP,
    emailLogin,
    numberLogin
};
