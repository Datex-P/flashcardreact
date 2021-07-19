
import React from 'react';

export default function SaveAndDiscard({ saveEvent, generateRandom, setCardModified,discardEvent }) {

 
  return (

    <div className='saveAndDiscardContainer flexAroundCenter flex-column'>

      <div>Save changes?</div>
      <div 
          className='justify-between'
          style={{width: '140px'}}
          >
      {
        ['Discard', 'Save'].map((el, index) =>
          <div
            className={`saveAndDiscardButtonStyling flexAroundCenter ${el}Btn`}
          
            onClick={
                    el === 'Save'? 
                    ()=>{
                        generateRandom();
                        saveEvent();
                        setCardModified(true)
                      } 
                        : 
                      ()=>{discardEvent()}
                  }
              key={index}
            
          >

            {el}
          </div>
        )
      }
            </div>
    </div>
  )
}