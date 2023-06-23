import bcrypt from "bcrypt";
import College from "../models/College.js";
import generateUniqueId from "generate-unique-id";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

export const clgRegister = async (req, res) => {
  try {
    const image = req.file;
    const { clgName, adminUsername, adminPassword } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    let id = generateUniqueId({
      length: 20,
      includeSymbols: ["@", "#", "|"],
    });

    const newCollege = new College({
      clgName,
      profilePic: {
        url: image.path,
        filename: image.filename,
      },
      clgId: id,
      adminUsername,
      adminPassword: passwordHash,
    });
    const savedCollege = await newCollege.save();
    res.status(201).json(savedCollege);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { adminUsername, adminPassword } = req.body;
    const admin = await College.findOne({ adminUsername });
    if (!admin) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    admin.adminPassword = "";
    res.status(200).json({ token, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const studentRegister = async (req, res) => {
  try {
    const image = req.file;
    const {
      firstName,
      lastName,
      clgId,
      rollNo,
      username,
      password,
      branch,
      course,
      semester,
      startYear,
      endYear,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    let clg = await College.find({ clgId });
    if (!clg[0]) return res.status(400).json({ msg: "Invalid College Id" });
    const newStudent = new Student({
      firstName,
      lastName,
      rollNo,
      username,
      password: passwordHash,
      branch,
      course,
      semester,
      startYear,
      endYear,
      profilePic: {
        url: image.path,
        filename: image.filename,
      },
      college: clg[0]._id,
    });

    const savedStudent = await newStudent.save();
    clg[0].students.push(savedStudent._id.valueOf());
    await clg[0].save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const studentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const student = await Student.findOne({ username });
    if (!student)
      return res.status(400).json({ msg: "Student does not exist" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    student.password = "";
    res.status(200).json({ token, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
