import express from "express";
const router = express.Router();
import {
  createGenre,
  getGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../controllers/genreController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").get(getGenre).post(authenticate, authorizeAdmin, createGenre);

// ADMIN ROUTES 👇
router
  .route("/:id")

  .delete(authenticate, authorizeAdmin, deleteGenre)
  .get(authenticate, authorizeAdmin, getGenreById)
  .put(authenticate, authorizeAdmin, updateGenre);

export default router;
