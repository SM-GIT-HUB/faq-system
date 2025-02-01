import express from "express"
import "dotenv/config"
import authRoutes from "./routes/auth.route.js"
import faqRoutes from "./routes/faq.route.js"

import dbConnect from "./lib/database/db.js"
import cookieParser from "cookie-parser"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.use('/api/auth', authRoutes);
app.use('/api/faqs', faqRoutes);

app.listen(PORT, async() => {
    await dbConnect();
    console.log("listening to server, port:", PORT);
})