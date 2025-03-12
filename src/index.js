import express from "express";

const PORT = 3000;
const app = express();
app.use(express.json());

app.get('/',(req, res) => {
    res.status(200).json({
        "message": "All systems go"
    });
})

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})