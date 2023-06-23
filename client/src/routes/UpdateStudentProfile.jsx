import { Container, Grid, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const UpdateStudentProfile = () => {
    return (
        <div>
            <h1>Update Student Profile</h1>
            <Container maxWidth="lg">
                <Grid spacing={2}>
                    <Grid xs={8}>
                    <TextField margin="normal" id="outlined-basic" label="First Name" variant="outlined" />
                    </Grid>
                    <Grid xs={4}>
                    <TextField margin="normal" id="outlined-basic" label="Last Name" variant="outlined" />
                    </Grid>
                    <Grid xs={6}>
                    <TextField margin="normal" id="outlined-basic" label="Username" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField margin="normal" id="outlined-basic" label="Password" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField margin="normal" id="outlined-basic" label="Branch" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField margin="normal" id="outlined-basic" label="Semester" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField margin="normal" id="outlined-basic" label="Start Year" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField margin="normal" id="outlined-basic" label="End Year" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <Link to={'/student/home'}><Button variant="contained" color="secondary">Update</Button></Link>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default UpdateStudentProfile;