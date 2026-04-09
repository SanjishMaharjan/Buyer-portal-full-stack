import express from "express";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protect, getItems);
router.post("/", protect, createItem);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

export default router;
