import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
  getNoteById,
} from "../controller/NoteController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();
router.get("/notes", verifyToken, getNotes);
router.get("/notes/:id", verifyToken, getNoteById);
router.post("/create-notes", verifyToken, createNote);
router.put("/update-notes/:id", verifyToken, updateNote);
router.delete("/delete-notes/:id", verifyToken, deleteNote);

export default router;