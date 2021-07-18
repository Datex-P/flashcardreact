import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../Context"; 
import { Container, Row, Spinner } from "react-bootstrap";
import PieDiagramm from "./Stats/PieDiagrammMain";
import Deck from "./deck/";
import CreateNewDeck from "./deck/CreateNewDeck";
import NavBar from "../NavBar";

export default function DeckContainer() {
  const {
    dataBase, setDataBase, styles, showProgressDiagram, setShowProgressDiagram
    ,scrollbarVisible
  ,trigger, setTrigger, changeDeckNameOpen, 
  editButtonClicked, 
  decksAreVisible, setDecksAreVisible,
  spinnerIsVisible, setSpinnerIsVisible,
   setAddNewDeckWindow,
setScrollPosition, arrowDown, setArrowDown,active, setActive, scroller
  } = useContext(Context);


  let colorsArr = ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"];
  
  
  function scrollHandler(e) {
    let position = e.target.scrollTop;

    setScrollPosition(position);
    setTrigger(Symbol());
  }

  function handleActive(i) {
    setActive(i);
    let newDataBase = { ...dataBase };
    newDataBase.active = i;
    setDataBase(newDataBase);
  }

  useEffect(() => {
    
    setTimeout(() => {
      setSpinnerIsVisible(false);
    }, 2000);
  }, []);

  return !spinnerIsVisible && dataBase ? (
    <>
      <NavBar editButtonClicked={editButtonClicked} />
      <Container
        className="align-items-center containerStyling"
        style={{
          backgroundColor:
            styles.backgroundColor[dataBase.userPreferences.backgroundColor],
        }}
      >
       

        <Row className="posRel">
          {decksAreVisible ? (
            <div className="firstRowStyling">
              <div style={{ position: "absolute", left: "10px" }}>
                {dataBase.DeckNames.reduce(
                  (accum, deck, index) => {
                    if (active === index) {
                      accum.arr.push(
                        <Deck
                          key={index}
                          index={index}
                          deck={deck}
                          name={deck.name}
                          transform={`rotate(0deg)`}
                          zIndex={2}
                          background={colorsArr[active % colorsArr.length]}
                          paused={deck.paused}
                        />
                      );
                    } else {
                      accum.index++;

                      accum.arr.push(
                        <Deck
                          key={index}
                          index={index}
                          setDeck
                          paused={deck.paused}
                          deck={deck}
                          name={deck.name}
                          trigger={trigger}
                          transform={`rotate(${-accum.index * 2}deg)`}
                          zIndex={0}
                          bg={colorsArr.map((i, k, ar) => {
                            if (active === k) {
                              return ar[ar.length % (k || 1)];
                            } else {
                              return i;
                            }
                          })}
                          background={
                            colorsArr.map((i, k, ar) => {
                              if (active === k) {
                                return ar[ar.length % (k || 1)];
                              } else {
                                return i;
                              }
                            })[index % colorsArr.length]
                          }
                        />
                      );
                    }
                    return accum;
                  },
                  { index: 0, arr: [] }
                ).arr.reverse()}
              </div>
       
              {scrollbarVisible ? (
                //scrollbar gets hidden when there is only one deck
                <div
                  ref={scroller}
                  className="scrollerStyling"
                  onScroll={(event) => {
                    if (!changeDeckNameOpen) {
                      let step = (1000 - 220) / (dataBase.DeckNames.length - 1);
                      let index = Math.floor(event.target.scrollTop / step);
                      handleActive(index);
                      console.log(index + "actual handle active index");
                      scrollHandler(event);
                    }
                  }}
                >
                  <div
                    style={{
                      height: "1000px",
                      position: "absolute",
                      top: "0px",
                      width: "100%",
                    }}
                  ></div>
                </div>
              ) : null}
            </div>
          ) : arrowDown ? (
            <div id="arrow">
              <div id="createYourFirstDeckPrompt">
                Start and create your first deck
              </div>
              <div style={{ marginTop: "150px", position: "relative" }}>
                <div className="arrowDown"></div>
              </div>
            </div>
          ) : null}

          {showProgressDiagram ? (
            <>
              <div style={{width:'48px', height:'27px', position: 'absolute', left: '346px',top: '-31px', background: 'rgb(90, 170, 149)'}}
              >
                  <div style={{fontWeight:'bold'}}
                  > 
                      Goal
                  </div>
                  <div style={{fontSize:'13px', marginLeft:'5px'}}
                  >
                    {
                      `${parseInt((dataBase.deckCompleted * 100) /
                         Object.keys(dataBase.DeckNames).length)} %`
                    }
                  </div>
              </div>
            <div className='pieDiagramContainer'
            >
              <PieDiagramm />
            </div>
            </>
          ) 
          : 
          null}
        </Row>

        <Row className='justify-content-center'>
          <button
            className='createDeckButtonStyling'
            style={{ cursor: !editButtonClicked ? "default" : "pointer" }}
            onClick={() => {
              if (!editButtonClicked) {
                //editButtonClicked is set to true by default
              } else {
             
                setAddNewDeckWindow(true); //open the pop up to add a new deck
                setDecksAreVisible(false); // all the decks in the back are not visible
                setShowProgressDiagram(false);
                setArrowDown(false); //create new deck and arrow down not visible
              }
            }}
          >
            Create Deck
          </button>

          <div style={{ marginTop: "40px" }}>
            <CreateNewDeck
            
              style={{ position: "absolute", zIndex: "40" }}
              close={() => {
                setDecksAreVisible(true);
                setAddNewDeckWindow(false);
                setShowProgressDiagram(true);
              }}
            />
          </div>
        </Row>
      </Container>
    </>
  ) : (
    // 'database empty'
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "50vh" }}
    >
      <Spinner animation="grow" />
    </div>
  );
}
