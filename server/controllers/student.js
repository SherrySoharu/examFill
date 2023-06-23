import bcrypt from "bcrypt";
import Student from "../models/Student.js";
import Datesheet from "../models/Datesheet.js";
import Application from "../models/Appication.js";
import { instance } from "../index.js";
import crypto from "crypto";
import Record from "../models/Record.js";

let paymentObject = null;

export const checkout = async (req, res) => {
  try {
    console.log("checkout chala");
    console.log("data:-> ", req.body);
    paymentObject = req.body;
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    console.log("payment verification hit hua:-> ", paymentObject);
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "fX8uiW1TlIJfVn2LSwr39jzn")
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    console.log("payment object:-> ", paymentObject);
    if (isAuthentic) {
      let subLen = paymentObject.subjects;
      let va = "",
        vap = 0,
        vb = "",
        vbp = 0,
        vc = "",
        vcp = 0,
        vd = "",
        vdp = 0,
        ve = "",
        vep = 0,
        vf = "",
        vfp = 0,
        vg = "",
        vgp = 0,
        vh = "",
        vhp = 0,
        vi = "",
        vip = 0,
        vj = "",
        vjp = 0,
        vk = "",
        vkp = 0,
        vl = "",
        vlp = 0,
        vm = "",
        vmp = 0,
        vn = "",
        vnp = 0,
        vo = "",
        vop = 0,
        vp = "",
        vpp = 0,
        vq = "",
        vqp = 0,
        vr = "",
        vrp = 0,
        vs = "",
        vsp = 0,
        vt = "",
        vtp = 0,
        vu = "",
        vup = 0,
        vv = "",
        vvp = 0,
        vw = "",
        vwp = 0,
        vx = "",
        vxp = 0,
        vy = "",
        vyp = 0,
        vz = "",
        vzp = 0;

      if (subLen[0]) {
        va = subLen[0].name;
        vap = subLen[0].cost;
        console.log("cost of subject a:-> ", subLen[0].cost);
      }
      if (subLen[1]) {
        vb = subLen[1].name;
        vbp = subLen[1].cost;
      }
      if (subLen[2]) {
        vc = subLen[2].name;
        vcp = subLen[2].cost;
      }
      if (subLen[3]) {
        vd = subLen[3].name;
        vdp = subLen[3].cost;
      }
      if (subLen[4]) {
        ve = subLen[4].name;
        vep = subLen[4].cost;
      }
      if (subLen[5]) {
        vf = subLen[5].name;
        vfp = subLen[5].cost;
      }
      if (subLen[6]) {
        vg = subLen[6].name;
        vgp = subLen[6].cost;
      }
      if (subLen[7]) {
        vh = subLen[7].name;
        vhp = subLen[7].cost;
      }
      if (subLen[8]) {
        vi = subLen[8].name;
        vip = subLen[8].cost;
      }
      if (subLen[9]) {
        vj = subLen[9].name;
        vjp = subLen[9].cost;
      }
      if (subLen[10]) {
        vk = subLen[10].name;
        vkp = subLen[10].cost;
      }
      if (subLen[11]) {
        vl = subLen[11].name;
        vlp = subLen[11].cost;
      }
      if (subLen[12]) {
        vm = subLen[12].name;
        vmp = subLen[12].cost;
      }
      if (subLen[13]) {
        vn = subLen[13].name;
        vnp = subLen[13].cost;
      }
      if (subLen[14]) {
        vo = subLen[14].name;
        vop = subLen[14].cost;
      }
      if (subLen[15]) {
        vp = subLen[15].name;
        vpp = subLen[15].cost;
      }
      if (subLen[16]) {
        vq = subLen[16].name;
        vqp = subLen[16].cost;
      }
      if (subLen[17]) {
        vr = subLen[17].name;
        vrp = subLen[17].cost;
      }
      if (subLen[18]) {
        vs = subLen[18].name;
        vsp = subLen[18].cost;
      }
      if (subLen[19]) {
        vt = subLen[19].name;
        vtp = subLen[19].cost;
      }
      if (subLen[20]) {
        vu = subLen[20].name;
        vup = subLen[20].cost;
      }
      if (subLen[21]) {
        vv = subLen[21].name;
        vvp = subLen[21].cost;
      }
      if (subLen[22]) {
        vw = subLen[22].name;
        vwp = subLen[22].cost;
      }
      if (subLen[23]) {
        vx = subLen[23].name;
        vxp = subLen[23].cost;
      }
      if (subLen[24]) {
        vy = subLen[24].name;
        vyp = subLen[24].cost;
      }
      if (subLen[25]) {
        vz = subLen[25].name;
        vzp = subLen[25].cost;
      }
      const newPayment = new Record({
        student: studentId,
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
        k: vk,
        kp: vkp,
        l: vl,
        lp: vlp,
        m: vm,
        mp: vmp,
        n: vn,
        np: vnp,
        o: vo,
        op: vop,
        p: vp,
        pp: vpp,
        q: vq,
        qp: vqp,
        r: vr,
        rp: vrp,
        s: vs,
        sp: vsp,
        t: vt,
        tp: vtp,
        u: vu,
        up: vup,
        v: vv,
        vp: vvp,
        w: vw,
        wp: vwp,
        x: vx,
        xp: vxp,
        y: vy,
        yp: vyp,
        z: vz,
        zp: vzp,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: paymentObject.amount,
        clgId: student.college,
      });
      await newPayment.save();
      res.redirect(`http://localhost:3000/student/paymenthistory`);
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getKey = async (req, res) => {
  console.log("getkey chala");
  res.status(200).json({ key: process.env.KEY_ID });
};

export const getStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    res.status(200).json(student);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getDatesheet = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    const datesheet = await Datesheet.find({
      author: student.college,
      course: student.course,
      semester: student.semester,
      branch: student.branch,
    });
    console.log(datesheet);
    res.status(200).json(datesheet);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getApplication = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    const applications = await Application.find({
      author: student.college,
      course: student.course,
      branch: student.branch,
      semester: { $lte: student.semester },
      isActive: true,
    });
    console.log(applications);
    res.status(200).json(applications);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      rollNo,
      username,
      password,
      branch,
      semester,
      startYear,
      endYear,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const updatedStudent = await Student.updateOne(
      { username },
      {
        $set: {
          firstName,
          lastName,
          rollNo,
          password: passwordHash,
          branch,
          semester,
          startYear,
          endYear,
        },
      }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
