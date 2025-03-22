import { Request, Response } from "express";
import bookModel from "../../db/bookSchema";

export async function getAllBooks(req: Request, res: Response) {
    const books = await bookModel.find()

    res.status(200).json({ books: books })
}

export async function uploadBook(req: Request, res: Response) {
    try {
        const data = req.bkData;

        const newBook = new bookModel({
            file: data.file,
            title: data.title,
            genre: data.genre,
            userId: data.userId,
            author: data.author,
            description: data.desc,
            coverArt: data.coverArt,
            softCopy: data.softCopy,
        })

        const book = await newBook.save();

        res.status(201).json({ createdBook: book })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}