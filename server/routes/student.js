import express from "express";
import {
  getStudent,
  updateStudentProfile,
  getDatesheet,
  getApplication,
  paymentVerification,
  checkout,
  getKey,
} from "../controllers/student.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/updateprofile", updateStudentProfile);
router.get("/:studentId", verifyToken, getStudent);
router.get("/:studentId/datesheet", verifyToken, getDatesheet);
router.get("/:studentId/application", verifyToken, getApplication);
router.post("/:studentId/checkout", verifyToken, checkout);
router.post("/:studentId/paymentverification", paymentVerification);

export default router;
