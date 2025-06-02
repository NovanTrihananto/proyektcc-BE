import express from "express";
import multer from "multer";
import {
  getKursus,
  createKursus,
  updateKursus,
  getKursusById,
  deleteKursus
} from "../controllers/kursuscontroller.js";
import { verifyAdmin } from "../middleware/VerifyAdmin.js";

// Ganti diskStorage ke memoryStorage supaya file ada di buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get("/courses", getKursus);
router.post("/courses", verifyAdmin, upload.single("Img"), createKursus);
router.get("/courses/:id", getKursusById);
router.put("/courses/:id", verifyAdmin, updateKursus);
router.delete("/courses/:id", verifyAdmin, deleteKursus);

export default router;
