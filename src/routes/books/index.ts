import { Router } from 'express';
import { uploadBook } from './bookControllers';
import { bookValidator } from '../../middlewares/bookValidation';

const router = Router();

router.post('/upload', bookValidator(), uploadBook)

export default router;