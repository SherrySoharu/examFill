import { TextField, Button, Typography, Box, Grid } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addApplicationSchema } from "../schema";
import { addExamApplication, getActiveApplications, activateApplication, deactivateApplication } from "../api";
import { Form, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircleIcon from '@mui/icons-material/Circle';

const AddExamApplication = () => {

    const initialValues = {
        course: "",
        branch: "",
        semester: "",
        subjects: null,
    }

    const navigate = useNavigate();
    let [applications, setApplications] = useState(null);
    let [subjects, setSubjects] = useState({});
    let [subject, setSubject] = useState(null);
    let [cost, setCost] = useState(500);
    let [total, setTotal] = useState(0);
    let updatedValue = {};
    const { user, token } = useSelector((state) => state);
    let len = Object.keys(subjects).length;

    const getApplications = () => {
        getActiveApplications(user._id, token)
        .then((res) => {
            setApplications(res.data);
        }).catch((err) => {
            console.log("Error occured!!!");
            console.log("err ", err);
        })
    }

    
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: addApplicationSchema,
        onSubmit: (values, action) => {
            values.subjects = subjects;
            addExamApplication(user._id, token, values)
            .then((res) => {
                setApplications([
                    ...applications,
                    res.data.savedApplication
                ]);
                setSubjects({});
                setTotal(0);
            }).catch((err) => {
                console.log("error alert!!!");
                console.log("err:-> ", err);
            })
            action.resetForm();
        }
    });
    
    const addSubject = () => {
        updatedValue[subject] = cost;
        setTotal(total + cost);
        setSubjects({
            ...subjects,
            ...updatedValue,
        });
    }

    const activate = (id) => {
        activateApplication(id, token)
        .then((res) => {
            setApplications(applications.map(application => {
                if(application._id === id){
                    return {...application, isActive: true};
                }
                return application;
            }));
        }).catch((err) => {
            console.log("error occured:-> ", err);
        })
    }

    const deactivate = (id) => {
        deactivateApplication(id, token)
        .then((res) => {
            setApplications(applications.map(application => {
                if(application._id === id){
                    return {...application, isActive: false};
                }
                return application;
            }));
        }).catch((err) => {
            console.log("error occured:-> ", err);
        })
    }
    
    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    }
    
    const handleCostChange = (e) => {
        let cost = parseInt(e.target.value);
        setCost(cost);
    }
    
    useEffect(() => {
        if(!token) navigate("/");
        getApplications();
    }, []);

    console.log("applications:-> ", applications);
    
    return (
        <div>
            <h1>Add New ExamApplication here.</h1>
            <h2>You can add maximum 10 subjects</h2>
            <Form onSubmit={handleSubmit}>
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
            <div>
                <TextField onChange={handleSubjectChange} id="outlined-required" label="Subject Name" variant="outlined" name="subject"/>
                <TextField onChange={handleCostChange} type="number" id="outlined-required" label="Cost" variant="outlined" defaultValue="500" name="cost"/>
                {(len >= 10) ? <Button disabled onClick={addSubject} variant="contained" color="primary"><AddIcon /></Button> : 
                <Button onClick={addSubject} variant="contained" color="primary"><AddIcon /></Button>}

                <Typography>Added Subjects:- </Typography>
                {Object.entries(subjects).map(([key, value]) => {
                    return(
                            <Box m={1} p={1}>
                                <Typography>{key} === {value}</Typography>
                                <hr></hr>
                            </Box>
                    )
                })}
                <Typography>Total cost:- {total} rupees/-</Typography>
            </div>
            <Button type="submit" variant="contained" color="primary">Save Application</Button>
            </Form>
            <Typography>Currently active application:- </Typography>
            {applications ? applications.map((application) => {
                return(
                    <Box>
                        {application.isActive ? <CircleIcon color="success"/> : null}
                        <Typography margin="normal" display="inline">{application.course + " | " + application.branch + " | " + application.semester}</Typography>
                        {application.isActive ? <Button onClick={() => deactivate(application._id)} variant="contained" color="error">Deactivate</Button> : 
                        <Button onClick={() => activate(application._id)} variant="contained" color="success">Activate</Button>}
                        {!application.isActive ? <Button variant="contained" color="secondary">Make Changes</Button>: null}
                        <hr/>
                    </Box>
                )
            }) : "loading..."}
        </div>
    )
}

export default AddExamApplication;