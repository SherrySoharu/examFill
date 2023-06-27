import { Container, Grid, TextField, Button } from "@material-ui/core";
import { Link, Form, useNavigate } from "react-router-dom";
import { clgLoginSchema } from "../schema";
import { clgLogin } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from "formik";
import { setLogin } from "../state";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state);
  const initialValues = {
    adminUsername: "",
    adminPassword: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: clgLoginSchema,
      onSubmit: (values, action) => {
        clgLogin(values)
          .then((res) => {
            dispatch(
              setLogin({
                user: res.data.admin,
                token: res.data.token,
              })
            );
            navigate(`/admin/${res.data.admin._id}`);
          })
          .catch((err) => {
            console.log("error:-> ", err);
          });
        action.resetForm();
      },
    });

  useEffect(() => {
    if (token) {
      if (user.clgName) {
        navigate(`/admin/${user._id}`);
      } else {
        console.log("else");
        navigate(`/student/${user._id}`);
      }
    }
  }, []);

  return (
    <div>
      <Container maxWidth="xs">
        <Form onSubmit={handleSubmit}>
          <Grid spacing={2}>
            <Grid xs={12}>
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.adminUsername}
                name="adminUsername"
                margin="normal"
                required
                id="outlined-basic"
                label="Admin Username"
                variant="outlined"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.adminPassword}
                name="adminPassword"
                margin="normal"
                id="outlined-basic"
                label="Admin Password"
                variant="outlined"
              />
            </Grid>
            <Grid xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
        <Link to={"/clgregister"}>Register your college, Sign up</Link>
      </Container>
    </div>
  );
};
export default AdminLogin;
