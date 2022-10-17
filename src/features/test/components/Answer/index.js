import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  listPlayer,
  resultAPI,
  results,
  saveFinalResult,
} from "../../counterSlice";
import HeaderTitle from "../HeaderTitle";
import "./style.css";

const Answer = () => {
  const player = useSelector(listPlayer);
  const result = useSelector(resultAPI);
  const dispatch = useDispatch();
  const [gif, setGif] = useState("");
  const listResults = useSelector(results);

  //   console.log(listResults.filter((item) => item.namePlayer === player[0].name));

  const selectWinner = (index, result) => {
    const player1 = listResults.filter(
      (item) => item.namePlayer === player[0].name
    );
    const player2 = listResults.filter(
      (item) => item.namePlayer === player[1].name
    );
    if (player1[index].answer === result) {
      dispatch(
        saveFinalResult({
          id: player1[index].idPlayer,
          player: player1[index].namePlayer,
          date: player1[index].date,
          answer: player1[index].answer,
          result: result,
        })
      );

      dispatch(
        saveFinalResult({
          id: player2[index].idPlayer,
          player: player2[index].namePlayer,
          date: player2[index].date,
          answer: player2[index].answer,
          result: result,
        })
      );

      return player1[index].namePlayer;
    } else if (player2[index].answer === result) {
      dispatch(
        saveFinalResult({
          id: player1[index].idPlayer,
          player: player1[index].namePlayer,
          date: player1[index].date,
          answer: player1[index].answer,
          result: result,
        })
      );

      dispatch(
        saveFinalResult({
          id: player2[index].idPlayer,
          player: player2[index].namePlayer,
          date: player2[index].date,
          answer: player2[index].answer,
          result: result,
        })
      );
      return player2[index].namePlayer;
    } else {
      dispatch(
        saveFinalResult({
          id: player1[index].idPlayer,
          player: player1[index].namePlayer,
          date: player1[index].date,
          answer: player1[index].answer,
          result: result,
        })
      );

      dispatch(
        saveFinalResult({
          id: player2[index].idPlayer,
          player: player2[index].namePlayer,
          date: player2[index].date,
          answer: player2[index].answer,
          result: result,
        })
      );
      return "(draw)";
    }
  };

  useEffect(() => {
    axios.get("https://yesno.wtf/api").then((res) => setGif(res.data.image));
  }, []);
  return (
    <div>
      <div className="headerWrapper">
        <HeaderTitle />
        <div className="btnGoodLuck">
          <span> Good Luck</span>
        </div>
      </div>
      <div>
        <div className="namePlayer">
          Player : {player[0].name} , {player[1].name}
        </div>
        <div className="answerWrapper">
          {result.map((item, index) => (
            <div className="answerCard" key={item}>
              <div>Round {item.round} :</div>
              <div className="resultWrapper">
                <div className="result">
                  <div>Result : {item.result}</div>
                  <div>Winner : {selectWinner(index, item.result)} </div>
                </div>
                <div>
                  <img
                    style={{ width: "112px", height: "61px" }}
                    src={gif}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="btnSummary">
        <Stack spacing={2} direction="row">
          <Link style={{ textDecoration: "none" }} to={"/result"}>
            <Button style={{ backgroundColor: "green" }} variant="contained">
              Summary
            </Button>
          </Link>
        </Stack>
      </div>
    </div>
  );
};

export default Answer;
