import bcrypt from "bcryptjs";
import otp from "../db/otpSchema"
import sendEmail from "../utils/deliverEmail";
import { generateOtp } from "../utils/otpGenerator";

const sendVerificationOTP = async ({ email, duration = 1 }) => {
    try {
        await otp.deleteOne({ email })

        const generatedOtp = await generateOtp();

        const message = "Enter the number's below to verify your registration into SwapShelf"

        const mailOptions = {
            from: process.env["AUTH_EMAIL"]!,
            to: email,
            subject: "OTP Verification",
            html: /*html*/
            `
                <p>${message}</p>
                <p style="color"></p>
                <b>${generatedOtp}</b>
                <p>This code expires in ${duration} hour</p>
            `
        };

        await sendEmail(mailOptions);

        // Store-otp after being hashed/encrypted
        const hashedOTP = await bcrypt.hash(generatedOtp, 10);
        const newOTP = new otp({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * + duration
        });

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
    } catch (error) {
        throw error;
    }
}

export default sendVerificationOTP;