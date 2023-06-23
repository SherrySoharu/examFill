import mongoose from "mongoose";

const DatesheetSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    picturePath: {
      url: String,
      filename: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
  },
  { timestamps: true }
);

const Datesheet = mongoose.model("Datesheet", DatesheetSchema);

export default Datesheet;
