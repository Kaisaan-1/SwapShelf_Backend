import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: String,
    createdAt: Date,
    updatedAt: Date,
});

const otp = mongoose.model("OTP", otpSchema);
export default otp;