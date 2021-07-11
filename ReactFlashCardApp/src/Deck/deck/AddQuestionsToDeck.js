
import React, { useState, useContext, useEffect } from 'react';
import { Modal, FormControl, Alert } from 'react-bootstrap'
import { Context } from '../../Context';
import '../styles.css'
import redCross from '../../icons/redCross.svg'

export default function AddQuestionsToDeck({ index, name, editButtonClicked, show, setShow}) {

  const [card, setCard] = useState({ question: '', answer: '' })
  const [newCardAdded, setNewCardAdded] = useState(false);

  const { dataBase, setDataBase, setShowProgressDiagram, setScrollbarVisible} = useContext(Context);

  function addToDeck() {

    let newDataBase = { ...dataBase }
    newDataBase.DeckNames[index].data.push(card)
    setDataBase(newDataBase)
    setNewCardAdded(true)
    if (card.question.trim().length !== 0 && card.answer.trim().length !== 0) {
      setTimeout(() => {
        setCard({ question: '', answer: '' })
        setNewCardAdded(false)
      }, 650)
    }
  }

  function changeHandler(e) {
    console.log(card)
    let newCard = { ...card }
    let { name, value } = e.target;
    newCard[name] = value
    setCard(newCard)
    //setCard({...card,[name]:value}) would be another way of writing it
  }

  useEffect(() => {
   
    if (show) {
     setShowProgressDiagram(false)

    } else {
      setShowProgressDiagram(true)
      if (dataBase.DeckNames.length === 1 || dataBase.DeckNames.length === 0) {
        setScrollbarVisible(false)
      } else {
        setScrollbarVisible(true)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);


  useEffect(() => {

    setTimeout(() => { setNewCardAdded(false) }, 650)
  }, [newCardAdded]);


  return (



    <div>
      <button
        className={'addNewCardsButton outline-none'}
        style={{
          cursor: dataBase.DeckNames[index]?.paused || !editButtonClicked ? 'default' : 'pointer'
        }}

        onClick={
          dataBase.DeckNames[index]?.paused || !editButtonClicked ?

            null
            :
            () => {
              setShow(true)
              setShowProgressDiagram(false)
              setScrollbarVisible(false)
            }
        }
      >
        +
      </button>

      <Modal
        show={show}
        contentClassName={'mod'}
        backdrop='static'
        onHide={() => {
        setShow(false)
        setShowProgressDiagram(true)
        }
        }

      >
        <Modal.Header className='border-bottom-0'
        >
          <Modal.Title style={{ fontSize: '16px' }}
          >

            Deck: {name}

          </Modal.Title>

          <button
            className='redCross'
            onClick={() => setShow(false)
            }
          >

            <img
              src={redCross}
              alt='redCross'
              className='nonDraggableIcon'
            />
          </button>

        </Modal.Header>
        <Modal.Body >

          <div className='mb-2'
          >
            <p
              className='questionAnswerStyling'
            >
              Question
                    </p>

            <FormControl
              as="textarea"
              aria-label="With textarea"
              value={card.question}
              name='question'
              onChange={changeHandler}
              className='formControlIn'
            />

            {
              newCardAdded ?

                <div
                  className='d-flex justify-content-center align-items-center'
                  style={{ height: '52px' }}
                >

                  <Alert
                    //when question or answer is empty, show a warning message
                    variant={card.question.trim().length !== 0 && card.answer.trim().length !== 0 ? "success" : "danger"}
                    style={{
                      width: card.question.trim().length !== 0 && card.answer.trim().length !== 0 ? '140px' : '100px',
                      height: '35px'
                    }}
                  >
                    {
                      card.question.trim().length !== 0 && card.answer.trim().length !== 0 ?

                        <div style={{ width: '140px' }}>
                          Card added to Deck.
                                  </div>
                        :
                        <div style={{ width: '120px', height: '35px' }}>
                          Input needed.
                                  </div>

                    }
                  </Alert>

                </div>

                :
                null
            }

          </div>
          <div style={{ marginTop: newCardAdded ? '0px' : '60px' }}
          >

            <p className='questionAnswerStyling'
            >
              Answer
                    </p>

            <FormControl
              as="textarea"
              aria-label="With textarea"
              value={card.answer}
              name='answer'
              onChange={changeHandler}
              className='formControlIn'
            />

          </div>

          <button
            onClick={addToDeck}
            className='generalButtonStyling addToDeckButton'
          >

            Add to Deck
                </button>

        </Modal.Body>

      </Modal>

    </div>

  )
}
