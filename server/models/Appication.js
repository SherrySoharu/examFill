import mongoose from "mongoose";

const ApplicationSchmea = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchmea);

export default Application;
