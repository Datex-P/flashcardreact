import React, { useContext}  from 'react';
import plusimg from "../../../icons/plus.svg";
import { Context } from "../../../Context";
import ThisDeckPaused from './ThisDeckPaused'


function Paused({data, index, paused, name, setShow, style}) {

  const { dataBase, setDataBase } = useContext(Context);


  function handleToStudy(e) {  
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].toStudyValue = e.target.value;
    setDataBase(newDataBase);
  }

  


  return (
    <div className="paused justify-between flex-column"
    >
    {data.length === 0 ? (
      <div className="deckEmptyAndPausedContainer deckEmpty justify-evenly-align-center flex-column"  
      >
        <div className="paused__deckempty justify-around flex-column"
        >
          <div>
          Deck is empty.
          </div>
        <div>
            Press:
            <span
              className='paused__container_img-plus'
              onClick={() => setShow(true)}
            >
              <img src={plusimg} alt="plus" />
            </span>
          </div>
        </div>
        <div className = 'paused__addCardsToDeck'
        >
          to add cards to the deck.
        </div>
      </div>
    ) : (
      <>
        <div
          className="divStyling align-center"
          style={{ opacity: paused ? "0" : "1" }}
        >
          To Study:
          <input
            type="number"
            className="inputStyling"
            style={{ background: paused ? style.background : "none" }}
            value={dataBase.DeckNames[index].toStudyValue || 0}
            onChange={handleToStudy}
            min="1"
            max={
              dataBase.DeckNames[index].data.length -
                dataBase.DeckNames[index].data.filter(
                  (x) => x.paused === true
                ).length || 0
            }
          />
        </div>
      </>
    )}

    {paused &&
      
        <ThisDeckPaused index={index}/>
    }

    {name && data.length !== 0 ? (
      <div
        className="divStyling align-center"
        style={{ opacity: paused ? "0" : "1" }}
      >
        {"Decksize:".padEnd(10, "⠀")} {data.length}
      </div>
    ) : null}
  </div>
  )
}

export default Paused






