import bcrypt from "bcryptjs";
import { Router, Request, Response } from "express";
import userModel from "../../db/userSchema";

const router = Router()

// @ts-ignore
router.post('/signUp', async (req: Request, res: Response) => {
    let { userName, email, password } = req.body;
    try {
        password = await bcrypt.hash(password, 10);

        // Validate required fields
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        const newUser = new userModel({
            userName,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            data: newUser
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;