
import React from 'react';
import {FormControl} from 'react-bootstrap'
import CardAddedOrInput from './CardAddedOrInput'


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
        <p className='questionAnswerStyling'>
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
          newCardAdded &&

            <CardAddedOrInput card={card}  />
  
        }

      </div>

      <div style={{ marginTop: newCardAdded ? '0px' : '60px' }}
      >

            <p className='questionAnswerStyling'>
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
