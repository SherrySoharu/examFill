import {
  Button,
  Typography,
  Accordion,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getApplication } from "../api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

let sems = [];

const FillApplication = () => {
  class Pair {
    constructor(name, cost) {
      this.name = name;
      this.cost = cost;
    }
  }

  const [applications, setApplications] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const { user, token } = useSelector((state) => state);

  //API CALL TO FETCH ALL THE APPLICATIONS
  const fetchApplications = () => {
    getApplication(user._id, token)
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => {
        console.log("error occured:-> ", err);
      });
  };

  //FUNCTION TO HANDLE CHANGE IN THE SUBJECT SELECTION CHECKBOX
  const handleCheck = (cost, semester, e) => {
    if (!e.target.checked) {
      let idx = sems.findIndex((ele) => ele === semester);
      if (idx >= 0) sems.splice(idx, 1);
      let newSubjects = subjects.filter(
        (subject) => subject.name !== e.target.value
      );
      setSubjects(newSubjects);
    } else {
      sems.push(semester);
      setSubjects([...subjects, new Pair(e.target.value, cost)]);
    }
  };

  //THIS IS TO FIND THE TOTAL AMOUNT TO PAY
  let total = 0;
  for (let i = 0; i < subjects.length; i++) {
    total += subjects[i].cost;
  }

  //FUNCTION TO PROCESS FEES PAYMENT
  const payFees = async (amount) => {
    // const {
    //   data: { key },
    // } = await axios.get(
    //   `http://www.localhost:3001/student/${user._id}/getkey`,
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );
    const payData = {
      amount,
      semesters: [...new Set(sems)],
      subjects,
    };
    const {
      data: { orderObject },
    } = await axios.post(
      `http://localhost:3001/student/${user._id}/checkout`,
      payData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("orderObject:-> ", orderObject);
    const options = {
      key: orderObject.college.keyId,
      amount,
      currency: "INR",
      name: user.username,
      description: "Test of payment for hierar",
      image:
        "https://www.aihr.com/wp-content/uploads/hierarchy-culture-cover.png",
      order_id: orderObject.order.id,
      callback_url: `http://localhost:3001/student/${user._id}/paymentverification`,
      prefill: {
        name: `${user.firstName} ${user.lastName}`,
        email: "",
        contact: "",
      },
      notes: {
        address: `${user.firstName} ${user.lastName}`,
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  console.log(total, applications);

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div>
      <h1>Fill Application</h1>
      <h1>Fill Application</h1>
      <h1>Select subjects below</h1>
      {applications[0] ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography margin="normal" display="inline">
              {applications[0].course +
                " | " +
                applications[0].branch +
                " | " +
                applications[0].semester}
            </Typography>
          </AccordionSummary>
          <div>Subject :- Cost</div>
          <div>
            {applications[0].a ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].a}
                name="subjects"
                value={applications[0].a}
              />
            ) : null}
            {applications[0].a !== ""
              ? applications[0].a + " -> " + applications[0].ap
              : null}
          </div>
          <div>
            {applications[0].b ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].b}
                name="subjects"
                value={applications[0].b}
              />
            ) : null}
            {applications[0].b !== ""
              ? applications[0].b + " -> " + applications[0].bp
              : null}
          </div>
          <div>
            {applications[0].c ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].c}
                name="subjects"
                value={applications[0].c}
              />
            ) : null}
            {applications[0].c !== ""
              ? applications[0].c + " -> " + applications[0].cp
              : null}
          </div>
          <div>
            {applications[0].d ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].d}
                name="subjects"
                value={applications[0].d}
              />
            ) : null}
            {applications[0].d !== ""
              ? applications[0].d + " -> " + applications[0].dp
              : null}
          </div>
          <div>
            {applications[0].e ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].e}
                name="subjects"
                value={applications[0].e}
              />
            ) : null}
            {applications[0].e !== ""
              ? applications[0].e + " -> " + applications[0].ep
              : null}
          </div>
          <div>
            {applications[0].f ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].f}
                name="subjects"
                value={applications[0].f}
              />
            ) : null}
            {applications[0].f !== ""
              ? applications[0].f + " -> " + applications[0].fp
              : null}
          </div>
          <div>
            {applications[0].g ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].g}
                name="subjects"
                value={applications[0].g}
              />
            ) : null}
            {applications[0].g !== ""
              ? applications[0].g + " -> " + applications[0].gp
              : null}
          </div>
          <div>
            {applications[0].h ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].h}
                name="subjects"
                value={applications[0].h}
              />
            ) : null}
            {applications[0].h !== ""
              ? applications[0].h + " -> " + applications[0].hp
              : null}
          </div>
          <div>
            {applications[0].i ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].i}
                name="subjects"
                value={applications[0].i}
              />
            ) : null}
            {applications[0].i !== ""
              ? applications[0].i + " -> " + applications[0].ip
              : null}
          </div>
          <div>
            {applications[0].j ? (
              <input
                onChange={(event) =>
                  handleCheck(
                    applications[0].ap,
                    applications[0].semester,
                    event
                  )
                }
                type="checkbox"
                id={applications[0].j}
                name="subjects"
                value={applications[0].j}
              />
            ) : null}
            {applications[0].j !== ""
              ? applications[0].j + " -> " + applications[0].jp
              : null}
          </div>
        </Accordion>
      ) : (
        "No active Applications"
      )}
      {applications
        ? applications.slice(1).map((application) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography margin="normal" display="inline">
                    {"(Re-appear)" +
                      application.course +
                      " | " +
                      application.branch +
                      " | " +
                      application.semester}
                  </Typography>
                </AccordionSummary>
                <div>Subject :- Cost</div>
                <div>
                  {application.a ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.a}
                      name="subjects"
                      value={application.a + " (re-appear)"}
                    />
                  ) : null}
                  {application.a !== ""
                    ? application.a + " -> " + application.ap
                    : null}
                </div>
                <div>
                  {application.b ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.b}
                      name="subjects"
                      value={application.b + " (re-appear)"}
                    />
                  ) : null}
                  {application.b !== ""
                    ? application.b + " -> " + application.bp
                    : null}
                </div>
                <div>
                  {application.c ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.c}
                      name="subjects"
                      value={application.c + " (re-appear)"}
                    />
                  ) : null}
                  {application.c !== ""
                    ? application.c + " -> " + application.cp
                    : null}
                </div>
                <div>
                  {application.d ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.d}
                      name="subjects"
                      value={application.d + " (re-appear)"}
                    />
                  ) : null}
                  {application.d !== ""
                    ? application.d + " -> " + application.dp
                    : null}
                </div>
                <div>
                  {application.e ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.e}
                      name="subjects"
                      value={application.e + " (re-appear)"}
                    />
                  ) : null}
                  {application.e !== ""
                    ? application.e + " -> " + application.ep
                    : null}
                </div>
                <div>
                  {application.f ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.f}
                      name="subjects"
                      value={application.f + " (re-appear)"}
                    />
                  ) : null}
                  {application.f !== ""
                    ? application.f + " -> " + application.fp
                    : null}
                </div>
                <div>
                  {application.g ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.g}
                      name="subjects"
                      value={application.g + " (re-appear)"}
                    />
                  ) : null}
                  {application.g !== ""
                    ? application.g + " -> " + application.gp
                    : null}
                </div>
                <div>
                  {application.h ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.h}
                      name="subjects"
                      value={application.h + " (re-appear)"}
                    />
                  ) : null}
                  {application.h !== ""
                    ? application.h + " -> " + application.hp
                    : null}
                </div>
                <div>
                  {application.i ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.i}
                      name="subjects"
                      value={application.i + " (re-appear)"}
                    />
                  ) : null}
                  {application.i !== ""
                    ? application.i + " -> " + application.ip
                    : null}
                </div>
                <div>
                  {application.j ? (
                    <input
                      onChange={(event) =>
                        handleCheck(application.ap, application.semester, event)
                      }
                      type="checkbox"
                      id={application.j}
                      name="subjects"
                      value={application.j + " (re-appear)"}
                    />
                  ) : null}
                  {application.j !== ""
                    ? application.j + " -> " + application.jp
                    : null}
                </div>
              </Accordion>
            );
          })
        : "No active Applications"}
      <Typography>Selected subjects are:-</Typography>
      {subjects ? (
        subjects.map((subject) => {
          return (
            <div>
              <Typography>{subject.name + " -> " + subject.cost}</Typography>
            </div>
          );
        })
      ) : (
        <Typography>No subjects selected yet...</Typography>
      )}
      {total > 0 ? <Typography>Total:- {total}</Typography> : null}
      {total > 0 ? (
        <Button
          onClick={() => payFees(total)}
          variant="contained"
          color="primary"
        >
          Pay Fees
        </Button>
      ) : null}
    </div>
  );
};

export default FillApplication;
