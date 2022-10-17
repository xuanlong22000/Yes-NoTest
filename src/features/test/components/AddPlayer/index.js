import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import HeaderTitle from "../HeaderTitle";
import PopUpAddPlayer from "../PopUpAddPlayer";
import "./style.css";
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
const AddPlayer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <HeaderTitle />
      <div className="AddPlayerWrapper">
        <Stack spacing={2} direction="row">
          <Button onClick={handleOpen} variant="contained">
            Add Player
          </Button>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <PopUpAddPlayer handleClose={handleClose} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default AddPlayer;
