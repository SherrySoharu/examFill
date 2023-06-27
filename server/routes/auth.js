import express from "express";
import {
  adminLogin,
  studentRegister,
  studentLogin,
} from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/adminlogin", adminLogin);
router.post("/studentlogin", studentLogin);

export default router;
