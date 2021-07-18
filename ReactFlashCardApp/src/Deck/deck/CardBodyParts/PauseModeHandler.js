import React, {useContext} from "react";
import pauseimg from "../../../icons/pause.svg";
import { Context } from "../../../Context";

export default function PauseModeHandler({generateRandom, index, randomQuestion}) {

  const { dataBase, setDataBase} = useContext(Context)
  return (
    <>
        <div
          style={{ position: "absolute", left: "37px", top: "-15px" }}
        >
          <img src={pauseimg} alt={"pause"} />
          <span style={{ marginLeft: "7px" }}>mode</span>
        </div>

        <div className="flexCenter">
          <div
            className="flexAround"
            style={{ width: "300px" }}
          >
            <div
              className="unpauseAndKeepPausedButton showAnswerButton flexCenter"
              onClick={() => {
                let newDataBase = { ...dataBase };
                newDataBase.DeckNames[index].data.filter(
                  (item) => item.paused
                )[randomQuestion].paused = false;
                setDataBase(newDataBase);
                generateRandom();
              }}
            >
              Unpause card
            </div>
            <div
              className="unpauseAndKeepPausedButton showAnswerButton flexCenter"
              onClick={() => {
                generateRandom();
              }}
            >
              Keep paused
            </div>
          </div>
        </div>
      </>
  )
}
