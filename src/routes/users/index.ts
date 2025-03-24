import { Router } from "express";
import {
    alterUsrDetails, getAllUsers, getUsrDetails, login, signUp, verifyOTP
} from "./userControllers";
import upload from "../../middlewares/multer";
import { authenticateToken } from "../../middlewares/authValidator";
import { altUserValidator } from "../../middlewares/altUserValidation";

const router = Router();

router.get('/', getAllUsers)

router.post('/signUp', signUp);

router.post('/verifyOTP', verifyOTP);

router.post('/login', login);

router.get('/profile', upload.single('profilePic'), authenticateToken(true), getUsrDetails);

router.patch('/profile', upload.single('profilePic'), authenticateToken(true), altUserValidator(), alterUsrDetails);

export default router;