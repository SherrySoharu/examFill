import { Modal, Box, Typography, Button } from "@material-ui/core";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ShowModal = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <span>
      <Button
        key={data._id}
        onClick={handleOpen}
        color="primary"
        variant="contained"
      >
        Show Details
      </Button>
      <Modal
        open={open}
        key={data._id}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Subjects:-
          </Typography>
          <Typography>
            {data.a !== "" ? data.a + " -> " + data.ap : null}
          </Typography>
          <Typography>
            {data.b !== "" ? data.b + " -> " + data.bp : null}
          </Typography>
          <Typography>
            {data.c !== "" ? data.c + " -> " + data.cp : null}
          </Typography>
          <Typography>
            {data.d !== "" ? data.d + " -> " + data.dp : null}
          </Typography>
          <Typography>
            {data.e !== "" ? data.e + " -> " + data.ep : null}
          </Typography>
          <Typography>
            {data.f !== "" ? data.f + " -> " + data.fp : null}
          </Typography>
          <Typography>
            {data.g !== "" ? data.g + " -> " + data.gp : null}
          </Typography>
          <Typography>
            {data.h !== "" ? data.h + " -> " + data.hp : null}
          </Typography>
          <Typography>
            {data.i !== "" ? data.i + " -> " + data.ip : null}
          </Typography>
          <Typography>
            {data.j !== "" ? data.j + " -> " + data.jp : null}
          </Typography>
          <Typography>
            {data.k !== "" ? data.k + " -> " + data.kp : null}
          </Typography>
          <Typography>
            {data.l !== "" ? data.l + " -> " + data.lp : null}
          </Typography>
          <Typography>
            {data.m !== "" ? data.m + " -> " + data.mp : null}
          </Typography>
          <Typography>
            {data.n !== "" ? data.n + " -> " + data.np : null}
          </Typography>
          <Typography>
            {data.o !== "" ? data.o + " -> " + data.op : null}
          </Typography>
          <Typography>
            {data.p !== "" ? data.p + " -> " + data.pp : null}
          </Typography>
          <Typography>
            {data.q !== "" ? data.q + " -> " + data.qp : null}
          </Typography>
          <Typography>
            {data.r !== "" ? data.r + " -> " + data.rp : null}
          </Typography>
          <Typography>
            {data.s !== "" ? data.s + " -> " + data.sp : null}
          </Typography>
          <Typography>
            {data.t !== "" ? data.t + " -> " + data.tp : null}
          </Typography>
          <Typography>
            {data.u !== "" ? data.u + " -> " + data.up : null}
          </Typography>
          <Typography>
            {data.v !== "" ? data.v + " -> " + data.vp : null}
          </Typography>
          <Typography>
            {data.w !== "" ? data.w + " -> " + data.wp : null}
          </Typography>
          <Typography>
            {data.x !== "" ? data.x + " -> " + data.xp : null}
          </Typography>
          <Typography>
            {data.y !== "" ? data.y + " -> " + data.yp : null}
          </Typography>
          <Typography>
            {data.z !== "" ? data.z + " -> " + data.zp : null}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Total amount paid: {data.amount}/-
          </Typography>
        </Box>
      </Modal>
    </span>
  );
};

export default ShowModal;
