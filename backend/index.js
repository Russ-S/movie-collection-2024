// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/genre", genreRoutes);

app.listen(port, () => console.log(`Server runing on port: ${port}`));
