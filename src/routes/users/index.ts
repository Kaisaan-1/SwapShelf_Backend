import bcrypt from "bcryptjs";
import userModel from "../../db/userSchema";
import { Router, Request, Response } from "express";

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

router.post('/login', async (req: Request, res: Response) => {
    try {
        let { email, usrPassword } = req.body;

        if (!email || !usrPassword) {
            res.status(400).json({
                "message": "Email and password is required"
            });
            return;
        };

        const userDoc = await userModel.findOne({ email });

        if (!userDoc) {
            res.status(404).json({
                "message": "User not found"
            })
            return;
        }

        const matched = await bcrypt.compare(usrPassword, userDoc.password);

        if (!matched) {
            res.status(401).json({
                "msg": "invalid credentials"
            });
            return;
        };

    } catch (error) {
        res.status(500).json({
            msg: "something went wrong"
        });
    };
})
export default router;