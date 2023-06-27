import { Container } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../Utils/AdminNavbar";

const AdminTemplet = () => {
  return (
    <div>
      <AdminNavbar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminTemplet;
