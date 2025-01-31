import express from "express"
import "dotenv/config"

import dbConnect from "./lib/database/db.js"
import cookieParser from "cookie-parser"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Hello world");
})


app.listen(PORT, async() => {
    await dbConnect();
    console.log("listening to server, port:", PORT);
})