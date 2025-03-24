import { Request, Response } from 'express';
import bookModel from '../../db/bookSchema';
import cloudinary from '../../utils/cloudinary';

export async function getAllBooks(req: Request, res: Response) {
    const books = await bookModel.find()

    res.status(200).json({ books: books })
}

export async function uploadBook(req: Request, res: Response) {
    try {
        const data = req.bkData;

        if (!req.file) {
            res.status(400).json({ msg: 'No cover art uploaded'});
            return;
        }

        const genres = data.genre.split(',')

        const result = await cloudinary.uploader.upload(req.file.path);

        console.log('Result: ', result)

        if (!result) {
            res.status(500).json({ status: 'Result variable is empty'})
            return;
        }

        const newBook = new bookModel({
            genre: genres,
            file: data.file,
            title: data.title,
            coverArt: result.url,
            userId: data.userId,
            author: data.author,
            description: data.desc,
            softCopy: data.softCopy,
        })

        const book = await newBook.save();

        res.status(201).json({ createdBook: book })
    } catch (error) {
        res.status(500).json({ err: JSON.stringify(error) })
    }
}

export async function modifyBook(req: Request, res: Response) {
    try {
        const { genre, author, title, softCopy, desc, file } = req.bkData;
    } catch (error) {

    }
}