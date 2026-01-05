import express from "express";
import cors from "cors" 
import dotenv from "dotenv";

import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001



// middleware
app.use(
    cors({
        origin: "http://localhost:5173",
    })); // Allows every requests from every single URL

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);



// our simple custom middleware
// app.use((req, res, next) =>{
//     console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//     next();
// })
 


app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT);
    });
});    