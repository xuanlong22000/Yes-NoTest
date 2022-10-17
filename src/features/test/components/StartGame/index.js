import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { reloadLocal } from "../../counterSlice";
import HeaderTitle from "../HeaderTitle";
import "./style.css";

const StartGame = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(reloadLocal());
  }, []);

  return (
    <div>
      <HeaderTitle />
      <div className="StartGameWrapper">
        <Link style={{ textDecoration: "none" }} to={"/addPlayer"}>
          <Stack spacing={2} direction="row">
            <Button variant="contained">Start Game</Button>
          </Stack>
        </Link>
      </div>
    </div>
  );
};

export default StartGame;
