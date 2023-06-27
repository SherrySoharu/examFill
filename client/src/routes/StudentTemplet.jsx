import { Container } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import StudentNavBar from "../Utils/StudentNavbar";
import { sendUser } from "../api";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminTemplet = () => {
  const { user, token } = useSelector((state) => state);

  const sendUserData = () => {
    sendUser(user._id, token)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err:-> ", err);
      });
  };

  useEffect(() => {
    sendUserData();
  }, []);
  return (
    <div>
      <StudentNavBar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminTemplet;
