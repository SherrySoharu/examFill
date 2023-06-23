import * as yup from "yup";

export const clgRegisterSchema = yup.object({
  clgName: yup.string().min(5).max(50).required("Please enter college name"),
  adminUsername: yup.string().min(2).max(25).required("Please enter username"),
  adminPassword: yup.string().min(6).required("Please Enter your password"),
  photo: yup.string().required("Please select a photograph."),
});

export const clgLoginSchema = yup.object({
  adminUsername: yup.string().required("Please enter username"),
  adminPassword: yup.string().min(6).required("Please enter password"),
});

export const studentRegisterSchema = yup.object({
  firstName: yup.string().required("Please enter firstname"),
  lastName: yup.string().required("Please enter lastname"),
  clgId: yup.string().required("Please enter valid college Id"),
  rollNo: yup.string().required("Please enter your roll number"),
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
  branch: yup.string().required("Please select branch"),
  course: yup.string().required("Please select a course"),
  semester: yup.number().required("Please select semester"),
  startYear: yup
    .number()
    .required("Please enter start year of your graduation"),
  endYear: yup.number().required("Please enter end year of your graduation"),
});

export const studentLoginSchema = yup.object({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

export const addDatesheetSchema = yup.object({
  course: yup.string().required("Please select a course"),
  semester: yup.number().required("Please select a semester"),
  branch: yup.string().required("PLease enter a branch"),
  photo: yup.string().required("Please select an Image"),
});

export const addApplicationSchema = yup.object({
  course: yup.string().required("Please enter a course"),
  branch: yup.string().required("Please select a branch"),
  semester: yup.string().required("Please select a semester"),
});
