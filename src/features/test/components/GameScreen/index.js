import { Button, CircularProgress, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  indexPlayer,
  listPlayer,
  listRound,
  nextPlayer,
  saveResult,
  saveResultApi,
} from "../../counterSlice";
import HeaderTitle from "../HeaderTitle";
import "./style.css";

const GameScreen = () => {
  const player = useSelector(listPlayer);
  const indexPlayers = useSelector(indexPlayer);
  const round = useSelector(listRound);
  const [answer, setAnswer] = useState([]);
  const [submit, setSubmit] = useState("Submit");
  const [hiddenSkeleton, setHiddenSkeleton] = useState(true);
  const dispatch = useDispatch();
  const page = useNavigate();

  //   console.log(answer);

  const handleSelectYes = (roundItem) => {
    setAnswer([
      ...answer,
      {
        round: roundItem,
        idPlayer: player[indexPlayers].id,
        date: new Date().toLocaleString(),
        namePlayer: player[indexPlayers].name,
        answer: "yes",
      },
    ]);
  };
  console.log("answer", answer);
  const handleSelectNo = (roundItem) => {
    setAnswer([
      ...answer,
      {
        round: roundItem,
        idPlayer: player[indexPlayers].id,
        date: new Date().toLocaleString(),
        namePlayer: player[indexPlayers].name,
        answer: "no",
      },
    ]);
  };

  const handleSubmit = () => {
    if (indexPlayers < player.length - 1) {
      dispatch(saveResult(answer));
      dispatch(nextPlayer());
      setAnswer([]);
    } else {
      dispatch(saveResult(answer));
      setHiddenSkeleton(false);
      setSubmit("Loading");

      round.map(async (item) => {
        await axios.get("https://yesno.wtf/api").then((res) => {
          dispatch(saveResultApi({ round: item, result: res.data.answer }));
        });
      });
      // .then(() => page("/answer"));

      setTimeout(() => {
        page("/answer");
      }, 7000);
    }
  };

  return (
    <div>
      <div className="headerWrapper">
        <HeaderTitle />
        <div className="btnGoodLuck">
          <span> Good Luck</span>
        </div>
      </div>
      <div>
        <div className="namePlayer">Player : {player[indexPlayers].name}</div>
        <div className="answerWrapper">
          {round.map((item) => (
            <div className="answerCard" key={item}>
              <div>Round {item} :</div>
              <div className={!hiddenSkeleton ? "hiddenAnswer" : "answer"}>
                <Stack spacing={2} direction="row">
                  <Button
                    onClick={() => handleSelectYes(item)}
                    variant="contained"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleSelectNo(item)}
                    variant="contained"
                  >
                    No
                  </Button>
                </Stack>
              </div>
              <Skeleton
                style={{ marginTop: "10px" }}
                className={hiddenSkeleton && "hiddenSkeleton"}
                variant="rectangular"
                width={210}
                height={60}
              />
            </div>
          ))}
        </div>

        <div className="btnSubmitWrapper">
          <Stack spacing={2} direction="row">
            <Button
              style={{ backgroundColor: "deeppink" }}
              onClick={handleSubmit}
              variant="contained"
            >
              {!hiddenSkeleton && (
                <CircularProgress
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "yellow",
                    marginRight: "15px",
                  }}
                />
              )}{" "}
              {submit}
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
