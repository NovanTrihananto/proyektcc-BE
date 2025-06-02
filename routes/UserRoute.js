import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  login,
  logout,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getAccessToken } from "../controllers/TokenController.js";
import { verifyAdmin } from "../middleware/VerifyAdmin.js";


const router = express.Router();

router.get("/token", getAccessToken);

// Endpoint buat login & logout
router.post("/login", login);
router.delete("/logout", logout);


router.get("/users", verifyToken,verifyAdmin, getUsers);
router.get("/users/:id", verifyToken,verifyAdmin, getUserById);
router.post("/users", createUser);
router.put("/users/:id", verifyToken,verifyAdmin, updateUser,);
router.delete("/users/:id", verifyToken,verifyAdmin, deleteUser);

export default router;
