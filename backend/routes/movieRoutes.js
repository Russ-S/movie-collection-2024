import express from "express";
const router = express.Router();
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  filterMovies,
} from "../controllers/movieController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.use(express.json());

router
  .route("/")
  .get(getMovies)
  .post(authenticate, authorizeAdmin, createMovie);
router
  .route("/:id")
  .get(getMovieById)
  .put(authenticate, authorizeAdmin, updateMovie)
  .delete(authenticate, authorizeAdmin, deleteMovie);

router.route("/filtered-movies").post(filterMovies);

export default router;
