import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import otpModel from "../../db/otpSchema";
import { Request, Response } from 'express';
import userModel from '../../db/userSchema';
import sendVerificationOTP from '../../controllers';
import cloudinary from '../../utils/cloudinary';

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await userModel.find();
        res.status(200).json({ users: users })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function signUp(req: Request, res: Response) {
    try {
        let { userName, email, password } = req.body;

        // Validate required fields
        if (!userName || !email || !password) {
            res.status(400).json({ message: "Username, email, and password are required" });
            return;
        }

        password = await bcrypt.hash(password, 10);

        const createdOTP = await sendVerificationOTP({ email })

        const newUser = new userModel({
            userName,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            otp: createdOTP,
            data: newUser,
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error: " + error });
    }
}

export async function verifyOTP(req: Request, res: Response) {
    try {
        const { userOtp, email } = req.body;

        if (!userOtp || !userOtp) {
            res.status(404).json({ message: "userOtp and email is required" });
            return;
        }
        const storedOtp = await otpModel.findOne({ email })

        if (!storedOtp) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const matched = await bcrypt.compare(userOtp, storedOtp.otp!)

        if (matched) {
            const userDoc = await userModel.findOne({ email });
            if (!userDoc) {
                res.status(404).json({
                    "message": "User not found"
                });
                return;
            }
            const token = jwt.sign(
                { userId: userDoc._id },
                process.env["JWT_SECRET"]!,
                { expiresIn: '1h' }
            )
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Unauthorized" })
        }
    } catch (error) {
        res.status(500).json({ message: `Unhandled Exception: ${error}` })
    }
}

export async function login(req: Request, res: Response) {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                "message": "Email and password is required"
            });
            return;
        };

        const userDoc = await userModel.findOne({ email });

        if (!userDoc) {
            res.status(404).json({
                "message": "User not found"
            });
            return;
        }

        const matched = await bcrypt.compare(password, userDoc.password);

        if (!matched) {
            res.status(401).json({
                "msg": "invalid credentials"
            });
            return;
        };

        const token = jwt.sign(
            { userId: userDoc._id },
            process.env["JWT_SECRET"]!,
            { expiresIn: '1h' }
        )

        res.status(200).json({ msg: "Logged In", token: token })

    } catch (error) {
        res.status(500).json({
            msg: "something went wrong"
        });
    };
}

export async function alterUsrDetails(req: Request, res: Response) {
    try {
        const { age, country, userName, languages, profilePic, description,
            studentNumber, contactNumber, professionalTitle
        } = req.altUsrDetails;

        // Create an update object, excluding null/undefined fields
        const updateData: Record<string, any> = {};

        if (req.file) {
            try {
                const picture = await cloudinary.uploader.upload(req.file.path)
                updateData.profilePic = picture.url;
            } catch (error) {
                res.status(500).json({ msg: "Failed to upload image" });
            }
        }

        if (age !== null && age !== undefined) updateData.age = age;
        if (country !== null && country !== undefined) updateData.country = country;
        if (userName !== null && userName !== undefined) updateData.userName = userName;
        if (languages !== null && languages !== undefined) updateData.languages = languages;
        if (description !== null && description !== undefined) updateData.description = description;
        if (profilePic !== null && profilePic !== undefined) updateData.profilePic = updateData.profilePic;
        if (studentNumber !== null && studentNumber !== undefined) updateData.studentNumber = studentNumber;
        if (contactNumber !== null && contactNumber !== undefined) updateData.contactNumber = contactNumber;
        if (professionalTitle !== null && professionalTitle !== undefined) updateData.professionalTitle = professionalTitle;

        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({ msg: "No valid fields provided for update" });
            return;
        }

        // Update the document (assuming `req.userId` contains the user's ID)
        const updatedUser = await userModel.findByIdAndUpdate(
            req.userId,
            updateData,
            { new: true } // Return the updated document
        );


        if (!updatedUser) {
            res.status(404).json({ msg: "User not found" });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ err: JSON.stringify(error) })
    }
}

export async function getUsrDetails(req: Request, res: Response) {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId)

        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }

        res.status(200).json({ usr: user })
    } catch (error) {
        res.status(500).json({ err: error })
    }
}