import { Avatar, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../api";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  data: {
    position: "absolute",
    top: "76px",
  },
});

const StudentHome = () => {
  const classes = useStyles();

  const [student, setStudent] = useState(null);
  const state = useSelector((state) => state);

  const findStudent = () => {
    getStudent(state.user._id, state.token)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log("error alert!!!");
        console.log("error has occured:-> ", err);
      });
  };

  useEffect(() => {
    findStudent();
  }, []);

  return (
    <div className={classes.data}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt={student ? student.studentUsername : "loading..."}
        src={student ? student.profilePic.url : "loading..."}
      />
      <Typography>
        Name:{" "}
        {student ? student.firstName + " " + student.lastName : "loading..."}
      </Typography>
      <Typography>
        Username: {student ? student.username : "loading..."}
      </Typography>
      <Typography>Course: {student ? student.course : "loading..."}</Typography>
      <Typography>Branch: {student ? student.branch : "loading..."}</Typography>
      <Typography>
        Semester: {student ? student.semester : "loading..."}
      </Typography>
      <Typography>
        Session:{" "}
        {student ? student.startYear + "-" + student.endYear : "loading..."}
      </Typography>
    </div>
  );
};

export default StudentHome;
