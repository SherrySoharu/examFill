import { Container, Grid, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const UpdateClgProfile = () => {
    return (
        <div>
            <h1>Update your clg Profile here</h1>
            <Container maxWidth="xs">
                <Grid spacing={2}>
                    <Grid xs={12}>
                    <TextField margin="normal" required id="outlined-basic" label="College Name" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField margin="normal" id="outlined-basic" label="Admin Username" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField margin="normal" id="outlined-basic" label="Admin Password" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <TextField margin="normal" fullwidth id="outlined-basic" label="Merchant ID" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <Link to={'/admin/home'}><Button variant="contained" color="secondary">Update</Button></Link>                    
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default UpdateClgProfile;