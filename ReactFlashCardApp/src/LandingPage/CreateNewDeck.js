import React, { useContext, useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Context } from "../Context"; 

export default function CreateNewDeck({
  close
}) {

  const {
    addNewDeckWindow, 
    setActive, 
    setArrowDown, 
    colors, //colors array for the decks
    dataBase, setDataBase, 
    setDecksAreVisible,
    setScrollbarVisible,
    setShowProgressDiagram, 
  } = useContext(Context);

  const [inputField, setInputField] = useState('');
  const [nameTooShortOrLong, setNameTooShortOrLong] = useState(false);

  const inputRef = useRef(null);
  const Ok = useRef(null);
  const Cancel = useRef(null);

  useEffect(() => {
    if (addNewDeckWindow) {
      inputRef.current.focus();
      setShowProgressDiagram(false);
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewDeckWindow]);



  function addNewDeckName() {

    let newDataBase = { ...dataBase };

   
      let index = newDataBase.DeckNames.push({
        name: inputField,
        data: [],
        cardsToday: 0,
        color: colors[Object.keys(dataBase.DeckNames).length % colors.length],
        paused: false,
        thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
        skipPausedCards: 0,
        pauseMode: false, //when active the pause switch can be clicked in question answers when cards are paused
        editModeActive: false, //when editModeActive is true, pause switch can t be clicked
  
      });

      if (dataBase.DeckNames.length === 1 || dataBase.DeckNames.length === 0) {
        setScrollbarVisible(false)   //scrollbar on the side is not visible when zero or only one deck on the stack
      } else {
        setScrollbarVisible(true)
      }
      setActive(index - 1);
      setInputField("");
      setDataBase(newDataBase);
      close();
    }

    function onChangeHandler (event) {
      setInputField(event.target.value)

      setTimeout(()=>{
            
            if (event.target.value.length  > 3 && event.target.value.length < 11) {
               
              Ok.current.disabled = false;
              Ok.current.classList.add('okCancelButtonColor');           
              setNameTooShortOrLong(false)

            }else{ 
              setNameTooShortOrLong(true)
              Ok.current.disabled = true
              Ok.current.classList.remove('okCancelButtonColor');
            }

          }, 800)

    }
  


  return (
    <Modal
      show={addNewDeckWindow}
      backdrop="static"
      keyboard={false}
      id="createDeck"
      centered
    >
      <Modal.Header
      >
          <Modal.Title
          >
            Name for new deck
          </Modal.Title>
      </Modal.Header>

      <Modal.Body className="align-center flex-column"
      >
        <input
          id="inputField"
          ref={inputRef}
          value={inputField}
          onChange={(event) => {
            onChangeHandler(event)    
          }}
        />
         
        {
          <div className='createNewDeck__too-short-or-long'
          >
            {
            `${
              dataBase.DeckNames.map(a=>a.name).includes(inputField)?
              'name exists':
              nameTooShortOrLong && inputField.length<4? 'too short':
              nameTooShortOrLong &&  inputField.length>11? 'too long':
              ''
              }`
            }
          </div>
        }

        <select className="createNewDeck__select-options"
        >
          <option>option 1</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
          <option>option 5</option>
        </select>
      </Modal.Body>

      <div className="createNewDeck__cancel-ok justify-between"
      >
        {["Cancel", "Ok"].map((el) => (
          <button
            className="okCancelButtonColor okCancelButton"
            key={el}
            ref={el==='Ok'? Ok:Cancel}
            onClick={() => {
              el === "Cancel"
                ? (() => {
                  close();
                  setInputField("");

                  if (dataBase.DeckNames.length === 0) {
                  
                    setArrowDown(true);
                    setDecksAreVisible(false);

                  }
                })()
                : addNewDeckName();
            }}
          >
            {el}
          </button>
        ))}
      </div>
    </Modal>
  );
}
