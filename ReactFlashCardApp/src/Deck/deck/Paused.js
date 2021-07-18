import React, { useContext}  from 'react';
import playimg from "../../icons/play.svg";
import plusimg from "../../icons/plus.svg";
import { Context } from "../../Context";


function Paused({data, index, paused, name, setShow, style}) {

  const { dataBase, setDataBase } = useContext(Context);
  let colors = ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"];


  function handleToStudy(e) {
    
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].toStudyValue = e.target.value;
    setDataBase(newDataBase);


  }

  function handlePause(index) { 
    let newDataBase = { ...dataBase };
    console.log(index, 'index')
    newDataBase.DeckNames[index].paused = true;
    setDataBase(newDataBase);
   
  }


  return (
    <div
    className="d-flex flex-column justify-content-between"
    style={{ height: "82px" }}
  >
    {data.length === 0 ? (
      <div
        className="deckEmptyContainer"
        style={{ left: "84px", textAlign: "center" }}
      >
        <div
          className="d-flex flex-column justify-content-around"
          style={{ height: "90px", width: "122px" }}
        >
          <div>
          Deck is empty.
          </div>
          <div>
            Press:
            <span
              className='spanPlusStyling'
              onClick={() => setShow(true)}
            >
              <img src={plusimg} alt="plus" />
            </span>
          </div>
        </div>
        <div
          className = 'addCardsToDeck'
        >
          to add cards to the deck.
        </div>
      </div>
    ) : (
      <>
        <div
          className="divStyling"
          style={{ opacity: paused ? "0" : "1" }}
        >
          To Study:
          <input
            type="number"
            className="inputStyling"
            style={{ background: paused ? style.background : "none" }}
            value={dataBase.DeckNames[index].toStudyValue || 0}
            max={
              dataBase.DeckNames[index].data.length -
                dataBase.DeckNames[index].data.filter(
                  (x) => x.paused === true
                ).length || 0
            }
            min="1"
            onChange={handleToStudy}
          />
        </div>
      </>
    )}

    {paused ? (
      <div
        className="deckPausedContainer"
        style={{ background: colors[index % 5] }}
      >
        <div>This deck is paused.</div>

        <div style={{ display: "flex", alignItems: "center" }}>
          Press:
          <button
            className="playButton"
            onClick={() => {
              handlePause();
            }}
          >
            <img
              src={playimg}
              alt="play"
              style={{ margin: "6px", cursor: "pointer" }}
            />
          </button>
        </div>
        <div className="countToStudyGoal">
          It doesn't count to the study goal.
        </div>
      </div>
    ) : null}

    {name && data.length !== 0 ? (
      <div
        className="divStyling"
        style={{ opacity: paused ? "0" : "1" }}
      >
        {"Decksize:".padEnd(10, "⠀")} {data.length}
      </div>
    ) : null}
  </div>
  )
}

export default Paused
