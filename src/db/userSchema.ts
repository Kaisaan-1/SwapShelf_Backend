import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    professionalTitle:{
        type: String,
    },
    age:{
        type: Number,
        default: 18,
    },
    description:{
        type: String,
    },
    contactNumber:{
        type: String,
    },
    studentNumber:{
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: 'Ghana',
    },
    languages: {
        type: [String],
        default: 'English',
    },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;