
import React from 'react';

export default function saveAndDiscard({ saveEvent, generateRandom, setCardModified,discardEvent }) {

 
  return (

    <div className="d-flex justify-content-center"
    >
          <div className='saveAndDiscard justify-aroundCenter flex-column'
          >
            <div
            >
              Save changes?
            </div>
            <div 
                className='justify-between'
                style={{width: '140px'}}
            >
            {
              ['Discard', 'Save'].map((el, index) =>
                <div
                  className={`saveAndDiscardButtonStyling justify-aroundCenter ${el}Btn`}
                
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
     </div>
  )
}