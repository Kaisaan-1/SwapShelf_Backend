import { Router } from 'express';
import { uploadBook } from './bookControllers';
import { bookValidator } from '../../middlewares/bookValidation';
import { authenticateToken } from '../../middlewares/authValidator';

const router = Router();

// @ts-ignore
router.post('/upload', authenticateToken(), bookValidator(), uploadBook)

export default router;