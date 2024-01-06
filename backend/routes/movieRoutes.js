import express from "express";
const router = express.Router();
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(getMovies)
  .post(authenticate, authorizeAdmin, createMovie);
router
  .route("/:id")
  .get(getMovieById)
  .put(authenticate, authorizeAdmin, updateMovie)
  .delete(authenticate, authorizeAdmin, deleteMovie);

export default router;
