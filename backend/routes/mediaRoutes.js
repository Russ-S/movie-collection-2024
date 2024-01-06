import express from "express";
const router = express.Router();
import {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} from "../controllers/mediaController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").get(getMedia).post(authenticate, authorizeAdmin, createMedia);

// ADMIN ROUTES 👇
router
  .route("/:id")

  .delete(authenticate, authorizeAdmin, deleteMedia)
  .get(authenticate, authorizeAdmin, getMediaById)
  .put(authenticate, authorizeAdmin, updateMedia);

export default router;
