import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link, Form, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { clgRegister } from "../api";
import { clgRegisterSchema } from "../schema";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "5rem",
    height: "5rem",
    backgroundColor: "green",
  },
});

const ClgRegister = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  let [load, setLoad] = useState(false);

  const initialValues = {
    clgName: "",
    photo: "",
    adminUsername: "",
    adminPassword: "",
    merchantId: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: clgRegisterSchema,
    onSubmit: (values, action) => {
      setLoad(true);
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("photo", values.photo.name);
      clgRegister(formData)
        .then((res) => {
          navigate("/adminlogin");
        })
        .catch((err) => {
          console.log("error alert!!!");
          console.log("err:-> ", err);
        });
      action.resetForm();
    },
  });

  const { user, token } = useSelector((state) => state);
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
      <Grid container>
        <Grid spacing={2}>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid xs={12}>
              <TextField
                // className={classes.root}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clgName}
                margin="normal"
                required
                id="outlined-basic"
                label="College Name"
                variant="outlined"
                name="clgName"
              />
            </Grid>
            <Grid xs={12}>
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("photo", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed grey`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.photo ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <Container>
                        <Typography>{values.photo.name}</Typography>
                        <EditOutlinedIcon />
                      </Container>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Grid>
            <Grid xs={12}>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adminUsername}
                margin="normal"
                id="outlined-basic"
                label="Admin Username"
                variant="outlined"
                name="adminUsername"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adminPassword}
                margin="normal"
                id="outlined-basic"
                label="Admin Password"
                variant="outlined"
                name="adminPassword"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.keyid}
                margin="normal"
                fullwidth
                id="outlined-basic"
                label="Key_ID"
                variant="outlined"
                name="keyid"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.keysecret}
                margin="normal"
                fullwidth
                id="outlined-basic"
                label="Key_SECRET"
                variant="outlined"
                name="keysecret"
              />
            </Grid>
            <Grid xs={12}>
              <Button type="submit" variant="contained" color="secondary">
                {load ? <CircularProgress color="success" /> : "SignIn"}
              </Button>
            </Grid>
          </Form>
          <Link to={"/adminlogin"}>already have an admin account, Login</Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default ClgRegister;
