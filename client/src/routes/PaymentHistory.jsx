import { Card } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getRecord } from "../api";
import { useEffect, useState } from "react";
import ShowModal from "../Utils/ShowModal";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    margin: "17px",
    padding: "9px",
    width: "fit-content",
    display: "flex",
  },
  cardCover: {
    display: "flex",
    marginTop: "100px",
  },
});

const PaymentHistory = () => {
  const classes = useStyles();
  const [records, setRecords] = useState(null);
  const { user, token } = useSelector((state) => state);

  const fetchRecord = () => {
    getRecord(user._id, token)
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        console.log("error:-> ", err);
      });
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  return (
    <div className={classes.cardCover}>
      <h1>Payment History</h1>
      <br></br>
      {records
        ? records.map((record) => {
            return (
              <span key={record._id}>
                <Card variant="outlined" className={classes.card}>
                  [
                  {record.semester.map((sem) => {
                    return <span key={record._id}>{sem} </span>;
                  })}
                  ] sem. || {user.course} ||{" "}
                  {new Date(record.createdAt).getDate() +
                    "/" +
                    new Date(record.createdAt).getMonth() +
                    "/" +
                    new Date(record.createdAt).getFullYear()}{" "}
                  ||{" "}
                  {new Date(record.createdAt).getHours() > 12
                    ? new Date(record.createdAt).getHours() -
                      12 +
                      ":" +
                      new Date(record.createdAt).getMinutes() +
                      "pm"
                    : new Date(record.createdAt).getHours() +
                      ":" +
                      new Date(record.createdAt).getMinutes() +
                      "am"}{" "}
                  || <ShowModal data={record} />
                </Card>
              </span>
            );
          })
        : "NO Payments yet"}
    </div>
  );
};

export default PaymentHistory;
