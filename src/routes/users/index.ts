import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import otpModel from "../../db/otpSchema";
import userModel from "../../db/userSchema";
import sendVerificationOTP from "../../controllers";
import { Router, Request, Response } from "express";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ users: users })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// @ts-ignore
router.post('/signUp', async (req: Request, res: Response) => {
    try {
        let { userName, email, password } = req.body;

        // Validate required fields
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
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
});

router.post('/verifyOTP', async (req: Request, res: Response) => {
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
});

router.post('/login', async (req: Request, res: Response) => {
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
});

export default router;