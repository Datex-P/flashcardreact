import React, {useContext} from 'react'
import playimg from "../../icons/play.svg";
import { Context } from "../../Context";

function Unpause({index}) {


  const { dataBase, setDataBase } = useContext(Context);


  function handlePause(index) { 
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].paused = true;
    setDataBase(newDataBase);
   
  }

  let colors = ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"];



  return (
    <div
    className="deckEmptyAndPausedContainer justify-evenly-align-center flex-column"
    style={{ background: colors[index % 5] }}
  >
    <div>This deck is paused.</div>

    <div className='align-center'>
      Press:
      <button
        className="btn-play justify-center-align-center"
        onClick={() => {
          handlePause();
        }}
      >
        <img
          src={playimg}
          alt="play"
          className='paused__img-play'
        />
      </button>
    </div>
    <div className="paused__countToStudyGoal">
      It doesn't count to the study goal.
    </div>
  </div>
  )
}

export default Unpause
