import express from "express";
import { toggleFavorite } from "../controllers/favorite.controller";
import { getFavorites } from "../controllers/favorite.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/:itemId", protect, toggleFavorite);
router.get("/", protect, getFavorites);

export default router;
