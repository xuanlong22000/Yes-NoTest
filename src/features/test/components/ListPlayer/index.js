import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import HeaderTitle from "../HeaderTitle";
import { useDispatch, useSelector } from "react-redux";
import { idInitPlayer, listPlayer, saveListRound } from "../../counterSlice";
import { Box, Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import PopUpAddPlayer from "../PopUpAddPlayer";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListPlayer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [round, setRound] = useState("");
  const players = useSelector(listPlayer);
  const idPlayer = useSelector(idInitPlayer);
  const dispatch = useDispatch();
  const page = useNavigate();

  const handleChange = (e) => {
    setRound(e.target.value);
  };

  const handleClickStart = () => {
    if (typeof JSON.parse(round) === "number") {
      dispatch(saveListRound(Array.from(Array(JSON.parse(round)).keys())));
      page("/gameScreen");
    } else {
      return;
    }
  };

  return (
    <div>
      <HeaderTitle />
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Player</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{player.id}</TableCell>
                  <TableCell>{player.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="wrapper-btn-table">
          <Stack spacing={2} direction="row">
            <Button
              style={{ width: "100%", marginTop: "20px" }}
              onClick={handleOpen}
              variant="outlined"
              className={idPlayer > 2 && "hiddenBtnAddMore"}
            >
              Add more player
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
          <div className="textTotalRound">Total round</div>
          <div className="btnStartWrapper">
            <input onChange={handleChange} value={round} />
            <Stack spacing={2} direction="row">
              <Button
                onClick={handleClickStart}
                variant="contained"
                disabled={idPlayer < 3}
              >
                Start
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPlayer;
