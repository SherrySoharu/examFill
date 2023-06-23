import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/student.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { clgRegister, studentRegister } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { addDatesheet } from "./controllers/admin.js";
import Razorpay from "razorpay";

// CONFIGURATION - middleware and package configuration

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hierar",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage });

//RAZORPAY CONFIGURATION

export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// ROUTES WITH FILES

app.post("/auth/clgregister", upload.single("photo"), clgRegister);
app.post("/auth/studentregister", upload.single("photo"), studentRegister);
app.post(
  "/admin/:clgId/newdatesheet",
  verifyToken,
  upload.single("photo"),
  addDatesheet
);

// ROUTES

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);

// MONGOOSE DATABASE SETUP

const port = process.env.PORT || 6001;
mongoose
  .connect("mongodb://localhost:27017/hierar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((e) => {
    console.log("ERROR:", e);
  });
