import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Root from "./routes/Root";
import ClgRegister from "./routes/ClgRegister";
import StudentRegister from "./routes/StudentRegister";
import AdminLogin from "./routes/AdminLogin";
import StudentLogin from "./routes/StudentLogin";
import StudentTemplet from "./routes/StudentTemplet";
import AdminTemplet from "./routes/AdminTemplet";
import Datesheet from "./routes/Datesheet";
import FillApplication from "./routes/FillApplication";
import PaymentHistory from "./routes/PaymentHistory";
import UpdateStudentProfile from "./routes/UpdateStudentProfile";
import AddDatesheet from "./routes/AddDatesheet";
import UpdateClgProfile from "./routes/UpdateClgProfile";
import AddExamApplication from "./routes/AddExamApplication";
import ApplicationHistory from "./routes/ApplicationHistory";
import AdminHome from "./routes/AdminHome";
import StudentHome from "./routes/StudentHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "clgregister",
    element: <ClgRegister />,
  },
  {
    path: "studentregister",
    element: <StudentRegister />,
  },
  {
    path: "adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "studentlogin",
    element: <StudentLogin />,
  },
  {
    path: "student",
    element: <StudentTemplet />,
    children: [
      {
        path: ":studentId",
        element: <StudentHome />,
      },
      {
        path: "datesheet",
        element: <Datesheet />,
      },
      {
        path: "fillapplication",
        element: <FillApplication />,
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory />,
      },
      {
        path: "updateprofile",
        element: <UpdateStudentProfile />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminTemplet />,
    children: [
      {
        path: ":clgId",
        element: <AdminHome />,
      },
      {
        path: "addapplication",
        element: <AddExamApplication />,
      },
      {
        path: "applicationhistory",
        element: <ApplicationHistory />,
      },
      {
        path: "adddatesheet",
        element: <AddDatesheet />,
      },
      {
        path: "updateprofile",
        element: <UpdateClgProfile />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </div>
  );
}

export default App;
