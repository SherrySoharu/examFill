import { Container } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import StudentNavBar from "../Utils/StudentNavbar";
import { useSelector } from "react-redux";

const AdminTemplet = () => {
  const { user, token } = useSelector((state) => state);
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
