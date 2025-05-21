import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginHandler,
  logout,
} from "../controller/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/create-users", createUser);
router.put("/update-users/:id", updateUser);
router.delete("/delete-users/:id", deleteUser);
router.post("/login", loginHandler);
router.post("/logout", verifyToken, logout);

export default router;