
import React from 'react';

export default function SaveAndDiscard({ saveEvent, generateRandom, setCardModified,discardEvent }) {

 
  return (

    <div className='saveAndDiscardContainer d-flex justify-content-around align-items-center flex-column'>

      <div>Save changes?</div>
      <div 
          className='d-flex justify-content-between'
          style={{width: '140px'}}
          >
      {
        ['Discard', 'Save'].map((el, index) =>
          <div
            className={`saveAndDiscardButtonStyling d-flex justify-content-around align-items-center 
            ${el}Btn`}
          
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