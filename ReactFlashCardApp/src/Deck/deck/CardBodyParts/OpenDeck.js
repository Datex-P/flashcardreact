import React, {useContext} from 'react'
import { Button} from "react-bootstrap";
import { Context } from "../../../Context";

function OpenDeck({data, paused, generateRandom}) {


  const {
    dataBase, setDataBase, 
    editButtonClicked, 
    setShowProgressDiagram,
  } = useContext(Context);

  function openDeckHandler () {
    generateRandom();
    let newDataBase = { ...dataBase };
    newDataBase.openedToday = true;
    setShowProgressDiagram(false); //progress diagram gets why not at this place??
    setDataBase(newDataBase);

  }

  return (
   
    <Button
    variant="secondary"
    className="openDeck"
    size="sm"
    style={{
      backgroundColor: !editButtonClicked ? "rgb(108, 117, 125)" : "grey",
      opacity: paused || data.length === 0 ? "0" : "1", //open deck button is not visible when length is zero
      cursor:
        paused || data.length === 0 || !editButtonClicked
          ? "default"
          : "pointer",
          position: 'absolute',
          top: '180px'
    }}
    onClick={
      paused || !editButtonClicked //when edit button is clicked or deck is paused, the question/answer view does not open, by default this button is true
        ? null
        : () => {openDeckHandler()}
    }
  >
    Open Deck
  </Button>
  )
}

export default OpenDeck
