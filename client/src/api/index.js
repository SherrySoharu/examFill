import axios from "axios";

const url = "http://localhost:3001";

export const clgRegister = (newClg) =>
  axios.post(`${url}/auth/clgregister`, newClg);
export const registerStudent = (newStudent) =>
  axios.post(`${url}/auth/studentregister`, newStudent);
export const clgLogin = (clg) => axios.post(`${url}/auth/adminlogin`, clg);
export const studentLogin = (student) =>
  axios.post(`${url}/auth/studentlogin`, student);
export const getAdmin = (id, token) =>
  axios.get(`${url}/admin/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getStudent = (id, token) =>
  axios.get(`${url}/student/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const addDatesheet = (id, token, datesheet) =>
  axios.post(`${url}/admin/${id}/newdatesheet`, datesheet, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getAllDatesheets = (id, token) =>
  axios.get(`${url}/admin/${id}/datesheets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const addExamApplication = (id, token, application) =>
  axios.post(`${url}/admin/${id}/addexamapplication`, application, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getActiveApplications = (id, token) =>
  axios.get(`${url}/admin/${id}/applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const activateApplication = (appId, token) =>
  axios.patch(`${url}/admin/${appId}/activate`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deactivateApplication = (appId, token) =>
  axios.patch(`${url}/admin/${appId}/deactivate`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getDatesheet = (id, token) =>
  axios.get(`${url}/student/${id}/datesheet`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getApplication = (id, token) =>
  axios.get(`${url}/student/${id}/application`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const loggingOut = (token) =>
  axios.get(`${url}/auth/logout`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getRecord = (id, token) =>
  axios.get(`${url}/student/${id}/records`, {
    headers: { Authorization: `Bearer ${token}` },
  });
