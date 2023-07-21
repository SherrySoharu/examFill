import { useState, useEffect } from "react";
import { fetchPaymentRecords } from "../api";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Paper,
} from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles({
  listItem: {
    width: "-webkit-fill-available",
  },
  list: {
    display: "block",
  },
  table: {
    backgroundColor: "rgb(18, 18, 18)",
  },
  tableTxt: {
    color: "white",
  },
  root: {
    marginTop: "80px",
    marginBottom: "7px",
  },
});

const ApplicationHistory = () => {
  const result = [];
  const classes = useStyles();
  let [records, setRecords] = useState(null);
  const { user, token } = useSelector((state) => state);
  let [yearArr, setYearArr] = useState([]);
  let len = null,
    startYear = null,
    endYear = null;
  const fetchRecords = () => {
    fetchPaymentRecords(user._id, token)
      .then((res) => {
        setRecords(res.data);
        len = res.data.length;
        // startYear = new Date(res.data[0].createdAt).getFullYear();
        startYear = 2022;
        // endYear = new Date(res.data[len - 1].createdAt).getFullYear();
        endYear = 2023;
        let idx = 0;
        for (let i = startYear; i <= endYear; i++) {
          yearArr[idx] = i;
          idx++;
        }
        console.log(yearArr, res.data);
      })
      .catch((err) => {
        console.log("error:-> ", err);
      });
  };
  const sems = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <Typography variant="h4" className={classes.root}>
        See Application History - years
      </Typography>
      {yearArr.map((year) => {
        return (
          <>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{year}</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.list}>
                {sems.map((sem) => {
                  return (
                    <Accordion className={classes.listItem}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{sem} semester</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer
                          className={classes.table}
                          component={Paper}
                        >
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ color: "white" }}>
                                  Student Name
                                </TableCell>
                                <TableCell
                                  sx={{ color: "white" }}
                                  align="right"
                                >
                                  Roll Number
                                </TableCell>
                                <TableCell
                                  sx={{ color: "white" }}
                                  align="right"
                                >
                                  Course
                                </TableCell>
                                <TableCell
                                  sx={{ color: "white" }}
                                  align="right"
                                >
                                  Branch
                                </TableCell>
                                <TableCell
                                  sx={{ color: "white" }}
                                  align="center"
                                >
                                  Paid Amount&nbsp;(rupees)
                                </TableCell>
                                <TableCell
                                  sx={{ color: "white" }}
                                  align="center"
                                >
                                  Re-Appear
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {records.map((record) =>
                                new Date(record.createdAt).getFullYear() ===
                                  year && record.semester.includes(sem) ? (
                                  <TableRow
                                    key={record._id}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell
                                      sx={{ color: "white" }}
                                      component="th"
                                      scope="row"
                                    >
                                      {record.student.firstName +
                                        " " +
                                        record.student.lastName}
                                    </TableCell>
                                    <TableCell
                                      sx={{ color: "white" }}
                                      align="right"
                                    >
                                      {record.student.rollNo}
                                    </TableCell>
                                    <TableCell
                                      sx={{ color: "white" }}
                                      align="right"
                                    >
                                      {record.student.course}
                                    </TableCell>
                                    <TableCell
                                      sx={{ color: "white" }}
                                      align="right"
                                    >
                                      {record.student.branch}
                                    </TableCell>
                                    <TableCell
                                      sx={{ color: "white" }}
                                      align="center"
                                    >
                                      {record.amount + "/- "}
                                    </TableCell>
                                    <TableCell
                                      sx={{ color: "white" }}
                                      align="center"
                                    >
                                      {sem !== record.student.semester
                                        ? "YES"
                                        : "NO"}
                                    </TableCell>
                                  </TableRow>
                                ) : null
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </>
        );
      })}
    </div>
  );
};

export default ApplicationHistory;
