import React, { useState, useContext, useEffect, useRef } from "react";
import { Button, FormControl, Alert } from "react-bootstrap";
import { Context } from "../../Context";
import editimg from "../../icons/edit.svg";

import ThreeDotsBtn from "./ThreeDotsBtn";
import BasicOrangeWindow from "./BasicOrangeWindow";
import DeleteCardQuestionBox from "./DeleteCardQuestionBox";
import SaveAndDiscard from "./CardBodyParts/SaveAndDiscard";
import RepeatBtn from "./CardBodyParts/RepeatBtn";
import pauseimg from "../../icons/pause.svg";

export default function QuestAnswerTrainOverv({
  name,
  data,
  index,
  paused,
  createDeckButtonIsVisible,

  setCreateDeckButtonIsVisible = () => {},
  editButtonClicked, //activated when change deckname field is open
}) {

  const [checked, setChecked] = useState(false);
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [cardModified, setCardModified] = useState(false);

  const [pauseOrDeleteText, setPauseOrDeleteText] = useState(true);

  const [show, setShow] = useState(false);
  const [showAnswerBtn, setShowAnswerBtn] = useState(true);
  const [showRepeatBtn, setShowRepeatBtn] = useState(false);

  const [showDeleteWindow, setShowDeleteWindow] = useState(true);
  const [timer, setTimer] = useState(null);
  const [trash, setTrash] = useState(false);
  const [deckLengthNotZero, setDeckLengthNotZero] = useState(true);

  const { dataBase, setDataBase, setShowProgressDiagram } = useContext(Context);
  const [card, setCard] = useState({ answer: "", question: "" });
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);

  const [mainBox] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    if (editBtnClicked) {
      inputRef.current.focus();
    }
  }, [editBtnClicked]);

  function handlePause() {
    // let newDataBase = {...dataBase}
    // let savePausedState = !pauseIsActive
    // setPauseIsActive(savePausedState)
    // dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
    // setDataBase(newDataBase)
  }

  useEffect(() => {
    setTimeout(() => {
      setCardModified(false);
    }, 500);
  }, [cardModified]);


  function generateRandom() {
    let newRandomQuestion = null;
    if (dataBase.DeckNames[index].pauseMode) {
      //pause mode is activated when the switch is pressed and cards are paused
      if (data.filter((item) => item.paused === true).length > 0) {
        data = data.filter((item) => item.paused === true);
      }
    }

    if (data.length === 0) {
      alert("add questions to deck");
      setDeckLengthNotZero(false);
    } else {
      setDeckLengthNotZero(true);
      if (dataBase.queue[0] && dataBase.queue[0].timeLeft === 0) {
        //need to have algorithm to filter s in queue related onlz for this deck
        //also not tot forget add decremental time algorith for all crads no matter waht deck
        newRandomQuestion = dataBase.queue.shift().index;
      } else {
        newRandomQuestion = Math.floor(Math.random() * data.length);
        // console.log(randomQuestion, "randomQuestion");
        let newDataBase = { ...dataBase };

        if (!newDataBase.DeckNames[index].data[newRandomQuestion]?.openHistory) {
          //if card was not opend before  a new array is made
          newDataBase.DeckNames[index].data[newRandomQuestion].openHistory = [];
        }

        newDataBase.DeckNames[index].data[newRandomQuestion].openHistory.push(
       //   new Date()
       new Date('May 26, 2021')
        );
        setDataBase(newDataBase);
      }
      if(newRandomQuestion === randomQuestion){
        generateRandom()
      }else{
        setRandomQuestion(newRandomQuestion);
        setCard(data[newRandomQuestion]);
        setShow(true);
      }
      
    }
  }

  function discardHandler() {
    setCard(data[randomQuestion]);
   
  }

  // function addToQueue(time) {
  //   let newDataBase = { ...dataBase }

  //   newDataBase.queue.push({
  //     ...data[randomQuestion],
  //     index: randomQuestion,
  //     timeLeft: time * 1000,
  //     item: name
  //   })

  //   setDataBase(newDataBase)
  // }

  useEffect(() => {
    if (show) {
      let timeLeft = setInterval(() => {
        // dataBase.queue.forEach((item, index) => {
        //   if (dataBase.queue[index].timeLeft >= 1000) {
        //     dataBase.queue[index].timeLeft -= 1000
        //   } else {
        //     dataBase.queue[index].timeLeft = 0
        //   }
        //     // })
      }, 1000);
      // })
      //everything  here will be returned when components unmounts
      setTimer(timeLeft);
      setShowProgressDiagram(false);
    } else {
      clearInterval(timer);
      setShowProgressDiagram(true);
      // console.log('oh you delete me')
    }
    //return function () {clearInterval(timeLeft)}
    // eslint-disable-next-line
  }, [show]);

  function deleteCurrentCard() {
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].data.splice(randomQuestion, 1);
    setDataBase(newDataBase);
    generateRandom();
  }

  function editModeActive() {
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].editModeActive = false;
    setDataBase(newDataBase);
  }

  function saveHandler() {
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].data[randomQuestion] = card;
    setDataBase(newDataBase);
  }

  function changeHandler(e) {
    let { name, value } = e.target;
    setCard({ ...card, [name]: value });
  }

  return (
    <>
      <Button
        variant="secondary"
        className="openDeck"
        size="sm"
        style={{
          opacity: paused || data.length === 0 ? "0" : "1", //open deck button is not visible when length is zero
          cursor:
            paused || data.length === 0 || !editButtonClicked
              ? "default"
              : "pointer",
          backgroundColor: !editButtonClicked ? "rgb(108, 117, 125)" : "grey",
          position: "relative",
          top: "25px",
        }}
        onClick={
          paused || !editButtonClicked //when edit button is clicked or deck is paused, the question/answer view does not open, by default this button is true
            ? null
            : () => {
                generateRandom();
                let newDataBase = { ...dataBase };
                newDataBase.openedToday = true;
                setShowProgressDiagram(false); //progress diagram gets why not at this place??
                setDataBase(newDataBase);
                console.log(dataBase, 'database')
              }
        }
      >
        Open Deck
      </Button>

      {deckLengthNotZero && !paused && (
        <BasicOrangeWindow
          show={show}
          setShow={setShow}
          generateRandom={generateRandom}
          mainBox={mainBox}
          index={index}
          id="questionAnswerOverview"
          showRepeatBtn={showRepeatBtn}
          setShowRepeatBtn={setShowRepeatBtn}
          setShowAnswerBtn={setShowAnswerBtn}
          setEditBtnClicked={setEditBtnClicked}
          createDeckButtonIsVisible={createDeckButtonIsVisible}
          setCreateDeckButtonIsVisible={setCreateDeckButtonIsVisible}
          title={`Deck: ${name}`}
          showFromParent={threeDotsMenuOpen}
          menu={
            dataBase.DeckNames[index].pauseMode ? null : (
              <ThreeDotsBtn
                text={"card"}
                editButtonClicked={true}
                editBtnClicked={editBtnClicked}
                className="threeDotsInQuestionAnswerStyling"
                threeDotsContainer={{ position: "default" }}
                paused={paused}
                setShowFromParent={setThreeDotsMenuOpen}
                index={index}
                edit
                pause
                trash
                type="card"
                editEvent={() => {
                  setShowAnswerBtn(false);
                  setEditBtnClicked(true);
                  setShowRepeatBtn(false);
                  let newDataBase = { ...dataBase };
                  newDataBase.DeckNames[index].editModeActive = true;
                  setDataBase(newDataBase);
                }}
                pauseEvent={() => {
                  handlePause();
                  setTrash(true);
                  setShowDeleteWindow(true);
                }}
                trashEvent={() => {
                  setTrash(true);
                  setPauseOrDeleteText(false);

                  // dataBase.checkboxClicked ?

                  //   null

                  //   :
                  //   () => {
                  // setShowRepeatBtn(false)
                  setShowDeleteWindow(true);
                  setShowAnswerBtn(true);
                  //                    }
                }}
              />
            )
          }
        >
          {editBtnClicked ? (
            <div
              style={{
                top: "-18px",
                position: "relative",
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img alt="edit" src={editimg} />
              <span style={{ marginLeft: "3px" }}>mode</span>
            </div>
          ) : null}

          {data[randomQuestion] && (
            <>
              <div className="mb-4">
                <p className="questionAnswerStyling">Question</p>

                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  value={card.question}
                  disabled={!editBtnClicked}
                  name="question"
                  onChange={changeHandler}
                  className="formControlIn"
                  ref={inputRef}
                />
              </div>

              {showAnswerBtn && (
                <Button
                  variant="secondary"
                  className="p-1 showAnswer my-5 d-flex justify-content-center align-items-center"
                  onClick={() => {
                    setShowAnswerBtn(false);
                    setShowRepeatBtn(true);
                  }}
                >
                  Show answer
                </Button>
              )}
              {dataBase.DeckNames[index].pauseMode ? (
                <>
                  <div
                    style={{ position: "absolute", left: "37px", top: "-15px" }}
                  >
                    <img src={pauseimg} alt={"pause"} />
                    <span style={{ marginLeft: "7px" }}>mode</span>
                  </div>

                  <div className="flexCenter">
                    <div
                      className="d-flex justify-content-around"
                      style={{ width: "300px" }}
                    >
                      <div
                        className="unpauseAndKeepPausedButton showAnswerButton"
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
                        className="unpauseAndKeepPausedButton showAnswerButton"
                        onClick={() => {
                          generateRandom();
                        }}
                      >
                        Keep paused
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {showRepeatBtn && (
                <div className="flexCenter">
                  <div
                    className="d-flex justify-content-between px-3 showRepeatBtnInner"
                  >
                    {dataBase.userTimePreferences.map((col, index) => (
                      <RepeatBtn
                        btn={col.name}
                        key={index}
                        label={"< " + col.amount + col.unit}
                        onClick={() => {
                          setShowAnswerBtn(!showAnswerBtn);
                          setShowRepeatBtn(false);
                          generateRandom();
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {cardModified ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "52px" }}
                >
                  <Alert
                    variant="success"
                    style={{ width: "145px", height: "35px" }}
                  >
                    Card was modified.
                  </Alert>
                </div>
              ) : null}
              {!showAnswerBtn && (
                <div className="mt-4">
                  <p className="questionAnswerStyling">Answer</p>

                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    value={card.answer}
                    disabled={!editBtnClicked}
                    name="answer"
                    onChange={changeHandler}
                    className="formControlIn"
                  />
                </div>
              )}

              {editBtnClicked && (
                <div className="d-flex justify-content-center">
                  <SaveAndDiscard
                    generateRandom={generateRandom}
                    setCardModified={setCardModified}
                    cardModified={cardModified}
                    saveEvent={() => {
                      setShowAnswerBtn(true);
                      setEditBtnClicked(false);
                      saveHandler();
                      editModeActive();
                    }}
                    discardEvent={() => {
                      setShowAnswerBtn(true);
                      setEditBtnClicked(false);
                      discardHandler();
                      editModeActive();
                    }}
                  />
                </div>
              )}

              {trash && showDeleteWindow && (
                <DeleteCardQuestionBox
                  card="card"
                  pauseOrDelete={`${pauseOrDeleteText ? "Pause" : "Delete"}`}
                  checked={checked}
                  setChecked={setChecked}
                  randomQuestion={randomQuestion}
                  show={show}
                  index={index}
                  editBtnClicked={editBtnClicked}
                  setEditBtnClicked={setEditBtnClicked}
                  setShowAnswerBtn={setShowAnswerBtn}
                  setShowRepeatBtn={setShowRepeatBtn}
                  trashEvent={deleteCurrentCard}
                  showDeleteWindow={showDeleteWindow}
                  deleteWindow={() => setShowDeleteWindow(false)}
                  pauseCardinQuestionAnswer
                  setPauseOrDeleteText={setPauseOrDeleteText}
                />
              )}
            </>
          )}
        </BasicOrangeWindow>
      )}
    </>
  );
}
