import { Container, Grid, TextField, Button, Box, Typography, Paper, Modal, ImageList, ImageListItem, CircularProgress } from "@material-ui/core";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { addDatesheetSchema } from "../schema";
import { addDatesheet, getAllDatesheets } from "../api/index";
import { Form, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

const AddDatesheet = () => {

    const [newDatesheet, setNewDatesheet] = useState(null);
    const [datesheets, setDatesheets] = useState(null);
    const { user, token } = useSelector((state) => state);
    let [load, setLoad] = useState(false);
    const navigate = useNavigate();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 960,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const marginn = {
        margin: 10,
        padding: 5,
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const initialValues = {
        course: "",
        semester: 0,
        branch: "",
        photo: "",
    }

    console.log(initialValues.course, initialValues.semester, initialValues.branch);

    const fetchDatesheets = () => {
        getAllDatesheets(user._id, token)
        .then((res) => {
            setDatesheets(res);
        }).catch((err) => {
            console.log("error occured:-> ", err);
        })
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues,
        validationSchema: addDatesheetSchema,
        onSubmit: (values, action) => {
            console.log(values);
            setLoad(true);
            const formData = new FormData();
            for(let value in values){
                formData.append(value, values[value]);
            }
            formData.append("photo", values.photo.name);
            addDatesheet(user._id, token, formData)
            .then((res) => {
                setNewDatesheet(res);
                datesheets.data.push(res.data);
                setLoad(false);
            }).catch((err) => {
                setLoad(false);
                console.log("error alert!!!");
                console.log("err:-> ", err);
            })
            action.resetForm();
        }
    });

    useEffect(() => {
        if(!token) navigate("/");
        fetchDatesheets();
    }, []);

    return (
        <div>
            <h1>Add New Datesheet</h1>
            <Container maxWidth="xs">
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid spacing={2}>
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
                    <div>Branch:</div>
                    <label for="CSE">CSE</label>
                    <input id="CSE" onChange={handleChange} onBlur={handleBlur} type="radio" name="branch" value="CSE"/><br/>
                    <label for="ECE">ECE</label>
                    <input id="ECE" onChange={handleChange} onBlur={handleBlur} type="radio" name="branch" value="ECE"/><br/>
                    <label for="EE">EE</label>
                    <input id="EE" onChange={handleChange} onBlur={handleBlur} type="radio" name="branch" value="EE"/><br/>
                    </Grid>
                    <Grid xs={12}>
                    <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={(acceptedFiles) => setFieldValue("photo", acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                      <Box {...getRootProps()} border={`2px dashed grey`} p="1rem" sx={{ "&:hover": { cursor: "pointer" } }}>
                        <input {...getInputProps()} />
                        {!values.photo ? (
                          <p>Add Datesheet Picture Here</p>
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
                    <Button type="submit" variant="contained" color="primary">{load ? <CircularProgress color="success"/> : "Add Datesheet"}</Button>
                    </Grid>
                </Grid>
                </Form>
            </Container>

            <Typography>All Posted Datesheets:-</Typography>
            {datesheets ? datesheets.data.map((datesheet) => {
                return(
                    <Paper elevation={3} variant="outlined">
                        <Button color="secondary" variant="outlined" onClick={handleOpen}>{datesheet.course + " | " + datesheet.branch + " | " + datesheet.semester + "th semester"}</Button>
                        <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        {datesheet.course + " | " + datesheet.branch + " | " + datesheet.semester + "th semester"}
                        </Typography>
                            <ImageList sx={{ width: 500, height: 500 }} cols={1} rowHeight={500} colHeight={500}>
                                <ImageListItem>
                                <img
                                    src={datesheet.picturePath.url}
                                    srcSet={datesheet.picturePath.url}
                                    alt={datesheet.picturePath.filename}
                                    loading="lazy"
                                />
                                </ImageListItem>
                            </ImageList>
                        </Box>
                        </Modal>
                    </Paper>
                )
            }) : (<Typography color="red">No datesheets uploaded yet</Typography>)}
        </div>
    )
}

export default AddDatesheet;