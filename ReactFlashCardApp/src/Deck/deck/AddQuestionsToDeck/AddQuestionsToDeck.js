
import React, { useState, useContext, useEffect } from 'react';
import { Modal} from 'react-bootstrap'
import { Context } from '../../../Context';
import '../../styles.css'
import redCross from '../../../icons/redCross.svg'
import AlertComponent from './AlertComponent'

export default function AddQuestionsToDeck({ index, name, 
  // editButtonClicked, 
  show, setShow}) {

  const [card, setCard] = useState({ question: '', answer: '' })
  const [newCardAdded, setNewCardAdded] = useState(false);

  const {
    dataBase, setDataBase,
  editButtonClicked, 
  setShowProgressDiagram,
  setScrollbarVisible
 
  } = useContext(Context);




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

        <AlertComponent card={card}
        setCard={setCard}
        newCardAdded={newCardAdded} 

        />

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
