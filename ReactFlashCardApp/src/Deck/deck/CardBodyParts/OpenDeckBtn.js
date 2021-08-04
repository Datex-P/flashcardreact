import React, {useContext} from 'react'
import { Button} from "react-bootstrap";
import { Context } from "../../../Context";

export default function OpenDeckBtn ({data, paused, generateRandom}) {


  const {
    dataBase, setDataBase, 
    editButtonClicked, 
    setShowProgressDiagram //progressDiagram is shown in the back of main 
  } = useContext(Context);

  function openDeck () {
    if(!paused ||  editButtonClicked) {
      generateRandom();
      let newDataBase = { ...dataBase };
      newDataBase.openedToday = true;
      setShowProgressDiagram(false); //progress diagram gets why not at this place??
      setDataBase(newDataBase);
    }
  }

  return (
   
    <Button
      variant="secondary"
      className="openDeck"
      size="sm"
      onClick={openDeck}
      style={{
        backgroundColor: !editButtonClicked ? "rgb(108, 117, 125)" : "grey",
        cursor: paused || data.length === 0 || !editButtonClicked ? "default": "pointer",
        opacity: paused || data.length === 0 ? "0" : "1" //open deck button is not visible when length is zero
      }}
    >
      Open Deck
  </Button>
  )
}

