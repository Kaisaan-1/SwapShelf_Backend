import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    hardOrSoft: {
        type: Boolean,
        required: true,
    },
    coverArt: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    }
});

const bookModel = new mongoose.Model('Books', bookSchema);
export default bookModel;