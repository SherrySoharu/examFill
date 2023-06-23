import { Avatar, Container, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { getAdmin } from "../api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    data: {
      position: 'absolute',
      top: '76px',
    },
  });

const AdminHome = () => {
    const classes = useStyles();
    let [admin, setAdmin] = useState({});
    const state = useSelector((state) => state);
    const navigate = useNavigate();

    const getUser = () => {
        getAdmin(state.user._id, state.token)
        .then((res) => {
            setAdmin(res);
        }).catch((err) => {
            console.log("error has occured:-> ", err);
        })
    }

    useEffect(() => {
        if(!state.token) navigate("/");
        getUser();
    }, []);

    if(!admin) return null;

    return (
        <Container className={classes.data} sx={{
            position: 'absolute',
            top: '76px',
          }}>
            <Avatar sx={{ width: 56, height: 56 }} alt={admin.data ? admin.data.adminUsername : "loading..."} src={admin.data ? admin.data.profilePic.url : "loading..."}/>
            <Typography>College Name: {admin.data ? admin.data.clgName : "loading..."}</Typography>
            <Typography>Username: {admin.data ? admin.data.adminUsername : "loading..."}</Typography>
            <Typography>College Unique ID: {admin.data ? admin.data.clgId : "loading..."}</Typography>
            <Typography>Number of studetns in college: {admin.data ? admin.data.students.length : "loading..."}</Typography>
        </Container>
    )
}

export default AdminHome;