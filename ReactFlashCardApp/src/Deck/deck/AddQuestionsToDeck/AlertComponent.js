
import React from 'react';
import {FormControl, Alert } from 'react-bootstrap'


function AlertComponent({card, setCard, newCardAdded}) {


  function changeHandler(e) {
 
    let newCard = { ...card }
    let { name, value } = e.target;
    newCard[name] = value
    setCard(newCard)
   
  }


  return (
    <>
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
            className='flexCenterAlignCenter'
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
          </>

  )
}

export default AlertComponent
