import express from "express";
import {
  updateCollegeProfile,
  addExamApplication,
  getAllDatesheets,
  getAdmin,
  getApplications,
  activateApplication,
  deactivateApplication,
} from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:clgId", verifyToken, getAdmin);
router.put("/updateprofile", updateCollegeProfile);
router.post("/:clgId/addexamapplication", verifyToken, addExamApplication);
router.get("/:clgId/datesheets", verifyToken, getAllDatesheets);
router.get("/:clgId/applications", verifyToken, getApplications);
router.patch("/:applicationId/activate", activateApplication);
router.patch("/:applicationId/deactivate", deactivateApplication);

export default router;
