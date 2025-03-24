import { Router } from "express";
import { alterUsrDetails, getAllUsers, getUsrDetails,
    login, signUp, verifyOTP
} from "./userControllers";
import { authenticateToken } from "../../middlewares/authValidator";

const router = Router();

router.get('/', getAllUsers)

router.post('/signUp', signUp);

router.post('/verifyOTP', verifyOTP);

router.post('/login', login);

router.get('/profile', authenticateToken(true), getUsrDetails)

router.patch('/profile', authenticateToken(true), alterUsrDetails)

export default router;