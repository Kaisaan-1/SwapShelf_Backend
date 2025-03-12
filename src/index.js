import express from "express";
import mongoose from "mongoose";

const PORT = 3000;
const app = express();
app.use(express.json());

async function connectToDB(){
    try {
        await mongoose.connect(process.env["SWAPSHELFDB"], {});
        console.log("Connection to DB successfull");
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