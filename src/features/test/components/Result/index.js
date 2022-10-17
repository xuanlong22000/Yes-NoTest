import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import HeaderTitle from "../HeaderTitle";
import "./style.css";
import { useSelector } from "react-redux";
import { finalResult } from "../../counterSlice";

const Result = () => {
  const finalResults = useSelector(finalResult);
  const lisResult = Object.values(finalResults);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterResult = lisResult.filter((post) =>
    post.namePlayer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="headerWrapper">
        <HeaderTitle />
        <div className="btnGoodLuck">
          <span> Good Luck</span>
        </div>
      </div>
      <div className="FinalResult">
        <div className="textFinal">Final Results</div>
      </div>
      <div className="tableResultWrapper">
        <div style={{ display: "flex" }}>
          <input
            onChange={handleChange}
            className="input-search-result"
            placeholder="Search by player name"
            value={search}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <TableContainer component={Paper}>
            <TableContainer sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ userSelect: "none" }}>
                    No. <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell style={{ userSelect: "none" }}>
                    Player <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell style={{ userSelect: "none" }}>
                    Date <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                  <TableCell style={{ userSelect: "none" }}>Answer</TableCell>
                  <TableCell style={{ userSelect: "none" }}>Result</TableCell>
                  <TableCell style={{ userSelect: "none" }}>
                    Score <FontAwesomeIcon icon={faSort} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterResult.map((result, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{result.id}</TableCell>
                    <TableCell>{result.namePlayer}</TableCell>
                    <TableCell>{result.date[result.date.length - 1]}</TableCell>
                    <TableCell>
                      {result.answerPlayer
                        .slice(0, result.answerPlayer.length / 2)
                        .map((item) => (
                          <div>{item}</div>
                        ))}
                    </TableCell>
                    <TableCell>
                      {result.answerApi
                        .slice(0, result.answerPlayer.length / 2)
                        .map((item) => (
                          <div>{item}</div>
                        ))}
                    </TableCell>
                    <TableCell>{result.score / 2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </TableContainer>
        </div>
        <div className="theWinner">
          {lisResult[0].score > lisResult[1].score
            ? `The winner ${lisResult[0].namePlayer}`
            : `The winner ${lisResult[1].namePlayer}`}
        </div>
      </div>
    </div>
  );
};

export default Result;
