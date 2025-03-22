import { Router } from 'express';
import { getAllBooks, uploadBook } from './bookControllers';
import { bookValidator } from '../../middlewares/bookValidation';
import { authenticateToken } from '../../middlewares/authValidator';

const router = Router();

router.get('/', authenticateToken(), getAllBooks);

router.post('/upload', bookValidator(), authenticateToken(), uploadBook);

export default router;