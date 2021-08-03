import React from 'react'
import { Alert } from 'react-bootstrap'

function CardAddedOrInput({card}) {
  return (
    
    <div className='cardAddedOrInInput justify-center-align-center'
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
  )
}

export default CardAddedOrInput
