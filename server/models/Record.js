import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    a: {
      type: String,
      default: "",
    },
    ap: {
      type: Number,
      default: 0,
    },
    b: {
      type: String,
      default: "",
    },
    bp: {
      type: Number,
      default: 0,
    },
    c: {
      type: String,
      default: "",
    },
    cp: {
      type: Number,
      default: 0,
    },
    d: {
      type: String,
      default: "",
    },
    dp: {
      type: Number,
      default: 0,
    },
    e: {
      type: String,
      default: "",
    },
    ep: {
      type: Number,
      default: 0,
    },
    f: {
      type: String,
      default: "",
    },
    fp: {
      type: Number,
      default: 0,
    },
    g: {
      type: String,
      default: "",
    },
    gp: {
      type: Number,
      default: 0,
    },
    h: {
      type: String,
      default: "",
    },
    hp: {
      type: Number,
      default: 0,
    },
    i: {
      type: String,
      default: "",
    },
    ip: {
      type: Number,
      default: 0,
    },
    j: {
      type: String,
      default: "",
    },
    jp: {
      type: Number,
      default: 0,
    },
    k: {
      type: String,
      default: "",
    },
    kp: {
      type: Number,
      default: 0,
    },
    l: {
      type: String,
      default: "",
    },
    lp: {
      type: Number,
      default: 0,
    },
    m: {
      type: String,
      default: "",
    },
    mp: {
      type: Number,
      default: 0,
    },
    n: {
      type: String,
      default: "",
    },
    np: {
      type: Number,
      default: 0,
    },
    o: {
      type: String,
      default: "",
    },
    op: {
      type: Number,
      default: 0,
    },
    p: {
      type: String,
      default: "",
    },
    pp: {
      type: Number,
      default: 0,
    },
    q: {
      type: String,
      default: "",
    },
    qp: {
      type: Number,
      default: 0,
    },
    r: {
      type: String,
      default: "",
    },
    rp: {
      type: Number,
      default: 0,
    },
    s: {
      type: String,
      default: "",
    },
    sp: {
      type: Number,
      default: 0,
    },
    t: {
      type: String,
      default: "",
    },
    tp: {
      type: Number,
      default: 0,
    },
    u: {
      type: String,
      default: "",
    },
    up: {
      type: Number,
      default: 0,
    },
    v: {
      type: String,
      default: "",
    },
    vp: {
      type: Number,
      default: 0,
    },
    w: {
      type: String,
      default: "",
    },
    wp: {
      type: Number,
      default: 0,
    },
    x: {
      type: String,
      default: "",
    },
    xp: {
      type: Number,
      default: 0,
    },
    y: {
      type: String,
      default: "",
    },
    yp: {
      type: Number,
      default: 0,
    },
    z: {
      type: String,
      default: "",
    },
    zp: {
      type: Number,
      default: 0,
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    semester: {
      type: [Number],
      required: true,
    },
    clgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", RecordSchema);

export default Record;
