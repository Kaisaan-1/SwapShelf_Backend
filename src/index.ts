import express from "express";
import mongoose from "mongoose";
import bookRoutes from './routes/books/index.js';
import userRoutes from './routes/users/index.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

async function connectToDB(){
    try {
        await mongoose.connect(process.env["SWAP_SHELF_DB"]!, {});
        console.log("Connection to DB successful");
    } catch (error) {
        console.log("Connection to DB error: ", error);
        process.exit(1)
    }
}

app.get('/',(req, res) => {
    res.status(200).json({
        "message": "All systems go"
    });
})

app.listen(PORT, () => {
    connectToDB()
    console.log("Server listening on port " + PORT);
})