import React, { useEffect, useContext} from "react";
import { Context } from "../Context"; 
import { Container, Row, Spinner } from "react-bootstrap";

import Deck from "../Deck/deck/Index/index";
import CreateNewDeck from "./CreateNewDeck";
import MenuContainer from '../Deck/Menu/MenuContainer'

import ShowProgressD from "./ShowProgressDiagram";
import Scrollbar from './Scrollbar'
import StartFirstDeck from './StartFirstDeck'

export default function DeckContainer() {
  
  const {
    active, 
    arrowDown, setArrowDown, //arrow that is visible when there are no decks created so far
    dataBase, 
    decksAreVisible, setDecksAreVisible,
    editButtonClicked, 
    scrollbarVisible, //scrollbar dissapears when settings or stats page are opened
    setShowProgressDiagram, //diagram that is visible on the top right corner 
    setAddNewDeckWindow,
    spinnerIsVisible, setSpinnerIsVisible //loading sign that appears when database loads

  } = useContext(Context);


  let colorsArr = ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"];
  


  useEffect(() => {
    
    setTimeout(() => {
      setSpinnerIsVisible(false);
    }, 2000);
  }, []);


  function createDeckHandler () {
    if (!editButtonClicked) {
      //editButtonClicked is set to true by default
    } else {
   
      setAddNewDeckWindow(true); //open the pop up to add a new deck
      setDecksAreVisible(false); // all the decks in the back are not visible
      setShowProgressDiagram(false);
      setArrowDown(false); //create new deck and arrow down not visible
    }
  }

  

  return !spinnerIsVisible && dataBase ? (
    <>
      <MenuContainer />
      <Container
        className="align-items-center containerStyling"
        style={{
          // backgroundColor:
          //   styles.backgroundColor[dataBase.userPreferences.backgroundColor],
          backgroundColor:`url ${'/Users/fab/Downloads/cool-background.png'}` 
        }}
      >
       

        <Row className="posRelative">
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
                <Scrollbar    />
               
              ) : null}
            </div>
          ) 
          : arrowDown ? (
            <StartFirstDeck/>
           
          ) : null}

          <ShowProgressD/>

         
        </Row>

        <Row className='justify-content-center'>
          <button
            className='row__btn-create-deck'
            style={{ cursor: !editButtonClicked ? "default" : "pointer" }}
            onClick={createDeckHandler}
          >
            Create Deck
          </button>

          <div className='row__createNewDeck-container'
          >
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
      className="justify-center-align-center"
      style={{ height: "50vh" }}
    >
      <Spinner animation="grow" />
    </div>
  );
}
