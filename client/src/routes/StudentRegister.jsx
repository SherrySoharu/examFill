import { TextField, Button, Container, Grid, Box, Typography, CircularProgress } from "@material-ui/core";
import { Link, Form, useNavigate } from "react-router-dom";
import { useFormik, Field } from "formik";
import { registerStudent } from "../api/index";
import { studentRegisterSchema } from "../schema";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const StudentRegister = () => {

    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    const initialValues = {
        firstName: "",
        lastName: "",
        clgId: "",
        rollNo: "",
        username: "",
        password: "",
        branch: "CSE",
        course: "Btech",
        semester: 1,
        startYear: new Date().getFullYear() - 4,
        endYear: new Date().getFullYear(),
        photo: "",
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: studentRegisterSchema,
        onSubmit: (values, action) => {
            console.log(values);
            setLoad(true);
            const formData = new FormData();
            for(let value in values){
                formData.append(value, values[value]);
            }
            formData.append("photo", values.photo.name);
            registerStudent(formData)
            .then((res) => {
                navigate("/studentlogin");
            }).catch((err) => {
                console.log("error alert!!!");
                console.log("err:-> ", err);
            })
            action.resetForm();
        }
    });

    const {user, token} = useSelector((state) => state);
    useEffect(() => {
        if(token)
        {
            if(user.clgName){
                navigate(`/admin/${user._id}`);
            }else{
                console.log("else");
                navigate(`/student/${user._id}`);
            }
        }
    }, []);

    return(
        <div>
            <Container maxWidth="lg">
                <Grid spacing={2}>
                <Form onSubmit={handleSubmit}>
                <Grid xs={12}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.firstName} margin="normal" id="outlined-basic" label="First Name" variant="outlined" name="firstName" />
                    </Grid>
                    <Grid xs={6}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.lastName} margin="normal" id="outlined-basic" label="Last Name" variant="outlined" name="lastName" />
                    </Grid>
                    <Grid xs={6}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.rollNo} margin="normal" id="outlined-basic" label="Roll Number" variant="outlined" name="rollNo" />
                    </Grid>
                    <Grid xs={6}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.clgId} margin="normal" id="outlined-basic" label="College Id" variant="outlined" name="clgId" />
                    </Grid>
                    <Grid xs={6}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.username} margin="normal" id="outlined-basic" label="Username" variant="outlined" name="username" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.password} margin="normal" id="outlined-basic" label="Password" variant="outlined" name="password" />
                    </Grid>
                    <Grid xs={12}>
                    <div>Branch:</div>
                    <label for="CSE">CSE</label>
                    <input id="CSE" onChange={handleChange} onBlur={handleBlur} type="radio" name="branch" value="CSE"/><br/>
                    <label for="ECE">ECE</label>
                    <input id="ECE" onChange={handleChange} onBlur={handleBlur} type="radio" name="branch" value="ECE"/><br/>
                    <label for="EE">EE</label>
                    <input id="EE" onChange={handleChange} onBlur={handleBlur} type="radio" name="branch" value="EE"/><br/>
                    </Grid>
                    <Grid xs={12}>
                    <div>Course:</div>
                    <label for="Btech">Btech</label>
                    <input id="Btech" onChange={handleChange} onBlur={handleBlur} type="radio" name="course" value="Btech"/><br/>
                    <label for="Poly">Poly</label>
                    <input id="Poly" onChange={handleChange} onBlur={handleBlur} type="radio" name="course" value="Poly"/><br/>
                    <label for="ITI">ITI</label>
                    <input id="ITI" onChange={handleChange} onBlur={handleBlur} type="radio" name="course" value="ITI"/><br/>
                    </Grid>
                    <Grid xs={12}>
                    <div>Semester:</div>
                    <label for="1">1</label>
                    <input id="1" onChange={handleChange} onBlur={handleBlur} type="radio" name="semester" value="1"/><br/>
                    <label for="2">2</label>
                    <input id="2" onChange={handleChange} onBlur={handleBlur} type="radio" name="semester" value="2"/><br/>
                    <label for="3">3</label>
                    <input id="3" onChange={handleChange} onBlur={handleBlur} type="radio" name="semester" value="3"/><br/>
                    <label for="4">4</label>
                    <input id="4" onChange={handleChange} onBlur={handleBlur} type="radio" name="semester" value="4"/><br/>
                    <label for="5">5</label>
                    <input id="5" onChange={handleChange} onBlur={handleBlur} type="radio" name="semester" value="5"/><br/>
                    <label for="6">6</label>
                    <input id="6" onChange={handleChange} onBlur={handleBlur} type="radio" name="semester" value="6"/><br/>
                    <label for="7">7</label>
                    <input id="7" onChange={handleChange} onBlur={handleBlur} type="radio" name="semester" value="7"/><br/>
                    <label for="8">8</label>
                    <input id="8" onChange={handleChange} onBlur={handleBlur} type="radio" name="semester" value="8"/><br/>
                    </Grid>
                    <Grid xs={12}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.startYear} margin="normal" id="outlined-basic" label="Graduation start Year" variant="outlined" name="startYear" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.endYear} margin="normal" id="outlined-basic" label="Graduation end Year" variant="outlined" name="endYear" />
                    </Grid>
                    <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={(acceptedFiles) => setFieldValue("photo", acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                      <Box {...getRootProps()} border={`2px dashed grey`} p="1rem" sx={{ "&:hover": { cursor: "pointer" } }}>
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
                    <Grid xs={12}>
                    {load ? <Button type="submit" variant="contained" color="secondary"><CircularProgress color="success"/></Button> : 
                    <Button type="submit" variant="contained" color="secondary">Submit</Button>}
                    {/* <Button type="submit" variant="contained" color="secondary">Submit</Button> */}
                    </Grid>
                </Form>
                <Link to={'/studentlogin'}>already have an account, Login</Link>
                </Grid>
            </Container>
        </div>
    )
}

export default StudentRegister;