import {
  Button,
  Paper,
  Modal,
  Box,
  Typography,
  ImageList,
  ImageListItem,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { getDatesheet } from "../api";
import { useSelector } from "react-redux";
const Datesheet = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 960,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [datesheet, setDatesheet] = useState(null);
  const { user, token } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchDatesheet = () => {
    getDatesheet(user._id, token)
      .then((res) => {
        setDatesheet(res.data[0]);
        console.log("res.data:-> ", res.data);
      })
      .catch((err) => {
        console.log("error occured:-> ", err);
      });
  };

  useEffect(() => {
    fetchDatesheet();
  }, []);

  return (
    <div>
      <h1>See Datesheet Here!!!</h1>
      {datesheet ? (
        <Paper elevation={3} variant="outlined">
          <Button color="secondary" variant="outlined" onClick={handleOpen}>
            {datesheet.course +
              " | " +
              datesheet.branch +
              " | " +
              datesheet.semester +
              "th semester"}
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {datesheet.course +
                  " | " +
                  datesheet.branch +
                  " | " +
                  datesheet.semester +
                  "th semester"}
              </Typography>
              <ImageList
                sx={{ width: 500, height: 500 }}
                cols={1}
                rowHeight={500}
                colHeight={500}
              >
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
      ) : (
        <Typography color="red">No datesheets uploaded yet</Typography>
      )}
    </div>
  );
};

export default Datesheet;
