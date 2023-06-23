import bcrypt from "bcrypt";
import Application from "../models/Appication.js";
import College from "../models/College.js";
import Datesheet from "../models/Datesheet.js";

export const getAdmin = async (req, res) => {
  try {
    const { clgId } = req.params;
    const admin = await College.findById(clgId);
    admin.adminPassword = "";
    res.status(200).json(admin);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const activateApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const updatedApplication = await Application.updateOne(
      { _id: applicationId },
      { $set: { isActive: true } }
    );
    res.status(200).json(updatedApplication);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const deactivateApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const updatedApplication = await Application.updateOne(
      { _id: applicationId },
      { $set: { isActive: false } }
    );
    res.status(200).json(updatedApplication);
  } catch (err) {
    res.status(404).status({ error: err.messaeg });
  }
};

export const getApplications = async (req, res) => {
  try {
    const { clgId } = req.params;

    const applications = await Application.find({ author: clgId });
    res.status(200).json(applications);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const addExamApplication = async (req, res) => {
  try {
    const { clgId } = req.params;
    const { course, branch, semester, subjects } = req.body;
    let keys = Object.keys(subjects);
    let va = "",
      vap = "",
      vb = "",
      vbp = "",
      vc = "",
      vcp = "",
      vd = "",
      vdp = "",
      ve = "",
      vep = "",
      vf = "",
      vfp = "",
      vg = "",
      vgp = "",
      vh = "",
      vhp = "",
      vi = "",
      vip = "",
      vj = "",
      vjp = "";

    if (keys[0]) {
      va = keys[0];
      vap = subjects[keys[0]];
    }
    if (keys[1]) {
      vb = keys[1];
      vbp = subjects[keys[1]];
    }
    if (keys[2]) {
      vc = keys[2];
      vcp = subjects[keys[2]];
    }
    if (keys[3]) {
      vd = keys[3];
      vdp = subjects[keys[3]];
    }
    if (keys[4]) {
      ve = keys[4];
      vep = subjects[keys[4]];
    }
    if (keys[5]) {
      vf = keys[5];
      vfp = subjects[keys[5]];
    }
    if (keys[6]) {
      vg = keys[6];
      vgp = subjects[keys[6]];
    }
    if (keys[7]) {
      vh = keys[7];
      vhp = subjects[keys[7]];
    }
    if (keys[8]) {
      vi = keys[8];
      vip = subjects[keys[8]];
    }
    if (keys[9]) {
      vj = keys[9];
      vjp = subjects[keys[9]];
    }

    const newApplication = new Application({
      course,
      branch,
      semester,
      a: va,
      ap: vap,
      b: vb,
      bp: vbp,
      c: vc,
      cp: vcp,
      d: vd,
      dp: vdp,
      e: ve,
      ep: vep,
      f: vf,
      fp: vfp,
      g: vg,
      gp: vgp,
      h: vh,
      hp: vhp,
      i: vi,
      ip: vip,
      j: vj,
      jp: vjp,
      author: clgId,
    });
    const savedApplication = await newApplication.save();
    res.status(201).json({ savedApplication });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addDatesheet = async (req, res) => {
  try {
    const { course, semester, branch } = req.body;
    const image = req.file;
    const { clgId } = req.params;
    const newDatesheet = new Datesheet({
      branch,
      course,
      semester,
      author: clgId,
      picturePath: {
        url: image.path,
        filename: image.filename,
      },
    });
    const savedDatesheet = await newDatesheet.save();
    console.log(savedDatesheet);
    res.status(200).json(savedDatesheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllDatesheets = async (req, res) => {
  try {
    const { clgId } = req.params;
    const datesheets = await Datesheet.find({ author: clgId });
    res.status(200).json(datesheets);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateCollegeProfile = async (req, res) => {
  try {
    const { clgName, adminUsername, adminPassword } = req.body;
    console.log(req.body);
    const admin = await College.findOne({ adminUsername });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    const updatedCollege = await admin.updateOne({
      $set: { clgName, adminPassword: passwordHash },
    });
    res.status(200).json(updatedCollege);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
