import { Router } from "express";
import { getAllUsers, login, signUp, verifyOTP } from "./userControllers";

const router = Router();

router.get('/', getAllUsers)

router.post('/signUp', signUp);

router.post('/verifyOTP', verifyOTP);

router.post('/login', login);

export default router;