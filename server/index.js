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
import pdfDocument from "pdfkit";
import axios from "axios";

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

// ROUTES WITH FILES

app.post("/auth/clgregister", upload.single("photo"), clgRegister);
app.post("/auth/studentregister", upload.single("photo"), studentRegister);
app.post(
  "/admin/:clgId/newdatesheet",
  verifyToken,
  upload.single("photo"),
  addDatesheet
);

app.post("/student/:studentId/getpdf", async (req, res) => {
  try {
    console.log("hit toh hua tha bancho");
    class Pair {
      constructor(name, cost) {
        this.name = name;
        this.cost = cost;
      }
    }
    const { user, data } = req.body;
    const image = await axios.get(`${user.profilePic.url}`, {
      responseType: "arraybuffer",
    });
    console.log("req.body:-> ", req.body);
    const doc = new pdfDocument();
    res.setHeader("Content-Disposition", 'attachment; filename="dynamic.pdf"');
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);
    function generateTableRow(doc, y, c1, c2, c3) {
      doc
        .fontSize(10)
        .text(c1, 50, y)
        .text(c2, 150, y)
        .text(c3, 280, y, { width: 90, align: "right" });
    }
    doc
      .image(
        "C:/Users/sohar/Desktop/hierar/server/public/assets/unnamed.png",
        50,
        45,
        { width: 75 }
      )
      .fillColor("#444444")
      .fontSize(16)
      .text("Himachal Pradesh Technical University", 110, 57)
      .fontSize(10)
      .text("ABVGIET", 200, 60, { align: "right" })
      .text("Pragatinagar, Shimla", 200, 75, { align: "right" })
      .fontSize(20)
      .text("Admit Card", 240, 100)
      .fontSize(10)
      .moveDown();
    doc.moveTo(10, 125).lineTo(600, 125).stroke();
    doc
      .text(`Student Name: ${user.firstName} ${user.lastName}`, 50, 145)
      .text(`Roll Number: ${user.rollNo}`, 50, 160)
      .text(`Course: ${user.course}`, 50, 175)
      .text(`Branch: ${user.branch}`, 50, 190)
      .text(`Semester: ${user.semester}`, 50, 205)
      .text(`Scheme: CBCS`, 50, 220)
      .text(`Father's Name: Sanjay Kumar`, 50, 235)
      .image(image.data, 300, 145, { width: 90 })
      .moveDown();
    doc.moveTo(20, 270).lineTo(600, 270).stroke();
    doc
      .fontSize(10)
      .text("Sr.No.", 50, 300)
      .text("Subject Title", 150, 300)
      .text("Amount", 280, 300, { width: 90, align: "right" });
    let subs = [];
    if (data.a !== "") {
      let pair = new Pair(data.a, data.ap);
      subs.push(pair);
    }
    if (data.b !== "") {
      let pair = new Pair(data.b, data.bp);
      subs.push(pair);
    }
    if (data.c !== "") {
      let pair = new Pair(data.c, data.cp);
      subs.push(pair);
    }
    if (data.d !== "") {
      let pair = new Pair(data.d, data.dp);
      subs.push(pair);
    }
    if (data.e !== "") {
      let pair = new Pair(data.e, data.ep);
      subs.push(pair);
    }
    if (data.f !== "") {
      let pair = new Pair(data.f, data.fp);
      subs.push(pair);
    }
    if (data.g !== "") {
      let pair = new Pair(data.g, data.gp);
      subs.push(pair);
    }
    if (data.h !== "") {
      let pair = new Pair(data.h, data.hp);
      subs.push(pair);
    }
    if (data.i !== "") {
      let pair = new Pair(data.i, data.ip);
      subs.push(pair);
    }
    if (data.j !== "") {
      let pair = new Pair(data.j, data.jp);
      subs.push(pair);
    }
    if (data.k !== "") {
      let pair = new Pair(data.k, data.kp);
      subs.push(pair);
    }
    if (data.l !== "") {
      let pair = new Pair(data.l, data.lp);
      subs.push(pair);
    }
    if (data.m !== "") {
      let pair = new Pair(data.m, data.mp);
      subs.push(pair);
    }
    if (data.n !== "") {
      let pair = new Pair(data.n, data.np);
      subs.push(pair);
    }
    if (data.o !== "") {
      let pair = new Pair(data.o, data.op);
      subs.push(pair);
    }
    if (data.p !== "") {
      let pair = new Pair(data.p, data.pp);
      subs.push(pair);
    }
    if (data.q !== "") {
      let pair = new Pair(data.q, data.qp);
      subs.push(pair);
    }
    if (data.r !== "") {
      let pair = new Pair(data.r, data.rp);
      subs.push(pair);
    }
    if (data.s !== "") {
      let pair = new Pair(data.s, data.sp);
      subs.push(pair);
    }
    if (data.t !== "") {
      let pair = new Pair(data.t, data.tp);
      subs.push(pair);
    }
    if (data.u !== "") {
      let pair = new Pair(data.u, data.up);
      subs.push(pair);
    }
    if (data.v !== "") {
      let pair = new Pair(data.v, data.vp);
      subs.push(pair);
    }
    if (data.w !== "") {
      let pair = new Pair(data.w, data.wp);
      subs.push(pair);
    }
    if (data.x !== "") {
      let pair = new Pair(data.x, data.xp);
      subs.push(pair);
    }
    if (data.y !== "") {
      let pair = new Pair(data.y, data.yp);
      subs.push(pair);
    }
    if (data.z !== "") {
      let pair = new Pair(data.z, data.zp);
      subs.push(pair);
    }
    let tableTop = 300;
    let endPos = 300;
    for (let i = 0; i < 26; i++) {
      if (subs[i]) {
        const position = tableTop + (i + 1) * 30;
        endPos = position;
        generateTableRow(doc, position, i + 1, subs[i].name, subs[i].cost);
      }
    }
    doc.moveDown();
    doc
      .text("Total Amount: ", 50, endPos + 30)
      .text(`${data.amount}/-`, 280, endPos + 30, {
        width: 90,
        align: "right",
      })
      .fontSize(8);
    doc
      .text("Instructions for Student", 50, endPos + 50)
      .text(
        "Dear student, please read the instructions for the end semester examinations very carefully: -",
        50,
        endPos + 60
      )
      .text(
        "1. The Student is advised to reach their examination hall 30 minutes before the scheduled time of examination mentioned in date sheet.",
        50,
        endPos + 70
      )
      .text(
        "2. The Student is advised to bring their admit card at the examination centre along with their identity proof such as driving licence,",
        50,
        endPos + 80
      )
      .text(
        "Aadhar card, PAN card, voter identification card etc. issued by the government authorities. Please do not write anything on the front &",
        50,
        endPos + 90
      )
      .text(
        "back side of the admit card and if found so the same shall be treated as unfair mean and action as per university rules shall be taken.",
        50,
        endPos + 100
      )
      .text(
        "3. The Student is advised to place their personal belongings such as mobile phones, ear/headphones, any electronic devices, bags,",
        50,
        endPos + 110
      )
      .text(
        "pouches, printed or handwritten written material, books etc. outside the examination hall and if anything found in the examination hall",
        50,
        endPos + 120
      )
      .text(
        "shall be considered as violation of examination regulations and be treated as unfair mean and action as per university rules shall be taken.",
        50,
        endPos + 130
      )
      .text(
        "4. The Student is advised to write their roll number, subject code, subject title etc. in their answer scripts (OMR sheet) very carefully and",
        50,
        endPos + 140
      )
      .text(
        "counter check the filled-in details, his/her signatures, invigilator signatures etc. after the completion of examination and before the",
        50,
        endPos + 150
      )
      .text(
        "submission of answer script to the invigilator. In case an incorrect detail of the student is found in the answer script, the result shall not be",
        50,
        endPos + 160
      )
      .text("declared.", 50, endPos + 170)
      .text(
        "5. The Student is advised to sign the attendance sheet in a prescribed column in front of his/her name and roll number otherwise he/she",
        50,
        endPos + 180
      )
      .text("shall be treated as absent.", 50, endPos + 190)
      .text(
        "6. Do not write anything on the question paper except your roll number. Further, no student is allowed to take away the answer scripts",
        50,
        endPos + 200
      )
      .text(
        "outside the examination hall and if found so , the case in the nearest police station shall be registered against him/her.",
        50,
        endPos + 210
      );
    doc.image(
      "C:/Users/sohar/Desktop/hierar/server/public/assets/Screenshot_8.png",
      400,
      endPos + 220,
      { width: 200 }
    );
    console.log("end");
    doc.end();
  } catch (err) {
    console.log("error:-> ", err);
  }
});

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

app.get("/auth/logout", verifyToken, async (req, res) => {
  try {
    console.log("hit hua");
    process.env.KEY_ID = null;
    process.env.KEY_SECRET = null;
    console.log(
      "after logging out env variables are:-> ",
      process.env.KEY_SECRET
    );
  } catch (err) {
    console.log("error:-> ", err);
  }
});
