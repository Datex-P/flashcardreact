import React, {useContext} from "react";
import pauseimg from "../../../icons/pause.svg";
import { Context } from "../../../Context";

export default function PauseModeHandler({generateRandom, index, randomQuestion}) {

  const { dataBase, setDataBase} = useContext(Context)
  
  return (
    <>
        <div className='pauseModeHandler'
        >
          <img src={pauseimg} alt={"pause"} />
          <span style={{ marginLeft: "7px" }}>mode</span>
        </div>

        <div className="justify-center"
        >
          <div
            className="justify-around"
            style={{ width: "300px" }}
          >
            <div
              className="unpauseAndKeepPausedButton showAnswerButton justify-center"
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
              className="unpauseAndKeepPausedButton showAnswerButton justify-center"
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
