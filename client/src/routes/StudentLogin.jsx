import { Container, Grid, TextField, Button } from "@material-ui/core";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { studentLogin } from "../api";
import { studentLoginSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../state";
import { useEffect } from "react";

const AdminLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = {
        username: "",
        password: "",
    }

    const {user, token} = useSelector((state) => state);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: studentLoginSchema,
        onSubmit: (values, action) => {
            studentLogin(values)
            .then((res) => {
                dispatch(
                    setLogin({
                        user: res.data.student,
                        token: res.data.token,
                    })
                );
                navigate(`/student/${res.data.student._id}`);
            }).catch((err) => {
                console.log("error alert!!!");
                console.log("err:-> ", err);
            })
            action.resetForm();
        }
    });

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
            <Container maxWidth="xs">
                <Grid spacing={2}>
                    <Form onSubmit={handleSubmit}>
                    <Grid xs={12}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.username} margin="normal" required id="outlined-basic" label="Username" variant="outlined" name="username" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField onBlur={handleBlur} onChange={handleChange} value={values.password} margin="normal" id="outlined-basic" label="Password" variant="outlined" name="password" />
                    </Grid>
                    <Grid xs={12}>
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                    </Grid>
                    </Form>
                </Grid>
                <Link to={'/studentregister'}>create new student account, Sign up</Link>
            </Container>
        </div>
    )
}

export default AdminLogin;