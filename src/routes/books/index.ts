import { Router } from 'express';
import upload from '../../middlewares/multer';
import { bookValidator } from '../../middlewares/bookValidation';
import { authenticateToken } from '../../middlewares/authValidator';
import { getAllBooks, modifyBook, uploadBook } from './bookControllers';

const router = Router();

router.get('/', authenticateToken(), getAllBooks);

router.post('/upload', upload.single('coverArt'), bookValidator(),
    authenticateToken(), uploadBook);

router.patch('/patch', bookValidator(), authenticateToken(), modifyBook);

export default router;