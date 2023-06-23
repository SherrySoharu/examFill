import mongoose from "mongoose";

const ClgSchema = new mongoose.Schema(
  {
    clgName: {
      type: String,
      required: true,
    },
    clgId: {
      type: String,
      required: true,
      unique: true,
    },
    adminUsername: {
      type: String,
      required: true,
      unique: true,
    },
    adminPassword: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      url: String,
      filename: String,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

const College = mongoose.model("College", ClgSchema);

export default College;
