import React, { useState, useContext, useRef, useEffect } from "react";
import { Context } from "../../Context";
import { Card } from "react-bootstrap";
import "../../styles.css";
import ThreeDotsBtn from "./ThreeDotsBtn";
import AddQuestionsToDeck from "./AddQuestionsToDeck/AddQuestionsToDeck";
import QuestAnswerTrainOverv from "./CardBodyParts/QuestAnswerTrainOverv";
import DeckOrCardName from "./DeckOrCardName";
import DeleteCardQuestionBox from "./DeleteCardQuestionBox";
import Paused from './Paused'

export default function Deck({
   deck,
   index,
   bg,
   paused,
   ...style
}) {
  if (deck) {
    var { data, name } = deck;
  }

  const [show, setShow] = useState(false);
  const [nameOfTopDeck, setNameOfTopDeck] = useState(name);
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);
  const [deckNameLengthRight, setDeckNameLengthRight] = useState(true) //deckname length is not too short and not too long
  const [nameTooLongOrShort, setNameTooLongOrShort] = useState(false) //if true deckname is too long or too short
  const [showDeleteWindow, setShowDeleteWindow] = useState(true); //if true and triggered the delete window with yes and no button is shown
  const [trash, setTrash] = useState(false);



  const {
    dataBase, setDataBase
  , setChangeDeckNameOpen,
  editButtonClicked, setEditButtonClicked, 
  setDecksAreVisible,
  active, setActive, trigger,
 setArrowDown
  } = useContext(Context);

  //const [index, setIndex] = useState(0);

/*  useEffect(() => {
    let cIndex = dataBase.DeckNames.findIndex((item) => item.name === name);
    setIndex(cIndex);
    //console.log(cIndex)
    // eslint-disable-next-line
  }, [trigger]);*/

  useEffect(() => {
    setChangeDeckNameOpen(!editButtonClicked); //when input field of deck name is open it is set to false
     // eslint-disable-next-line
  }, [editButtonClicked]);


  let input = useRef(null);

  function handlePause(index) { 
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].paused = true;
    setDataBase(newDataBase);
   
  }


  useEffect(() => {
    setNameOfTopDeck(name);
    console.log(name);
  }, [name]);

  function deleteDeck() {
    let newDataBase = { ...dataBase };
    //newDataBase.DeckNames[index].deleted = true; //index where delete starts second para is delete count

    
     newDataBase.DeckNames.splice(index,1)
    
    if (newDataBase.DeckNames.filter(item=>!item.deleted).length === 0) {
      setDecksAreVisible(false);
      setArrowDown(true);
    } else {
    
      setDataBase(newDataBase);
  
      if (index === 0) {
        setActive(1);
      } else {
        setActive(active-1);
      }
    }
  }


  function handleChangeName(e){

    if (e.target.value.length >3 && e.target.value.length <12) {
     
     setDeckNameLengthRight(true)
     setThreeDotsMenuOpen(true)
     setNameTooLongOrShort(false)
     
    } else {
      setNameTooLongOrShort(true)
      setDeckNameLengthRight(false)

    }
      setNameOfTopDeck(e.target.value);
  }


  // function handleActive(i) {
  //   setActive(i);
  //   let newDataBase = { ...dataBase };
  //   newDataBase.active = i;
  //   setDataBase(newDataBase);
  // }



  return (
    deck && (

     
      
      <Card
        style={style}
        className="newDeckContainer flexColumn position-absolute "
      >
     
        <Card.Body className="justify-center-align-center flex-column"
        >
          {
        nameTooLongOrShort? 
          <div className='tooLongOrShort'
          >
          {`${nameOfTopDeck.length>11? 'Too long' : nameOfTopDeck.length<4? 'Too short': ''}`}
          </div>
          :
          null

       }  

          <Card.Title
            className="justify-between-align-center position-relative"
            style={{ width: "151px", left: "3px", height: "0px" }}
          >
            {editButtonClicked ? (
              <DeckOrCardName
                bg={bg}
               
                name={name}
                className="deckOrCardNameStyling"
              />
            ) : (
              <input
                ref={input}
                className="addToDeckInput"
                value={nameOfTopDeck}
                onChange={handleChangeName}
              />
        
            )}
            
            {
              deckNameLengthRight &&
            <ThreeDotsBtn
              name={name}
              text={"deck"}
              data={data}
              showFromParent={threeDotsMenuOpen}
              setShowFromParent={setThreeDotsMenuOpen}
              index={index}
              paused={paused}
              bg={style.background}
              nameOfTopDeck={nameOfTopDeck}
              setNameOfTopDeck={setNameOfTopDeck}
              edit={!paused}
              pause
              trash={!paused}
              input={input}
              threeDotsContainer={{
                position: "fixed",
                right: "50px",
                top: "18px",
              }}
              className="threeDotsBtnIndex"
              style={{
                border: paused ? "none" : "1px solid black",
                backgroundColor: paused ? "black" : "white",
              }}
              editEvent={() => {
              
                setThreeDotsMenuOpen(false);
                setEditButtonClicked(!editButtonClicked);
               

              }}
              pauseEvent={(index)=>{
                handlePause(index)
              }}
              trashEvent={
                dataBase.checkboxClicked
                  ? () => {
                      deleteDeck();
                      // handleActive(active - 1);
                    }
                  : () => {
                      setTrash(true);
                      setShowDeleteWindow(true);
                    }
              }
            />
                }

            {trash && showDeleteWindow && !paused && (
              <DeleteCardQuestionBox
                pauseOrDelete="Delete"
                card="deck"
                threeDotsMenuOpen={threeDotsMenuOpen}
                index={index}
                deleteWindow={() => setShowDeleteWindow(false)}
                trashEvent={() => {
                  deleteDeck();
                  //handleActive(index - 1);
                }}
                showDeleteWindow={showDeleteWindow}
              />
            )}
          </Card.Title>

                <Paused
                  data={data}
                  index={index}
                  setShow={setShow}
                  paused={paused}
                  name={name}
                  style={style}
                />
         

          <QuestAnswerTrainOverv
            name={name}
            index={index}
            data={data}
            paused={paused}
           
          />

          {active === index && (
       
            <AddQuestionsToDeck
              background={style.background}
              name={name}
              index={index}
              show={show}
              setShow={setShow}
            />
          )}
        </Card.Body>
      </Card>
    )
  );
}



