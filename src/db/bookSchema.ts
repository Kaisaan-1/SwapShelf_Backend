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
        type: [String],
        required: true,
    },
    softCopy: {
        type: Boolean,
        // required: true,
    },
    coverArt: {
        type: String,
        // required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    file: {
        type: String,
        // required: true
    }
});

const bookModel = mongoose.model("Books", bookSchema);
export default bookModel;