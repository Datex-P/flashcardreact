import React, { useContext} from 'react'
import {Context} from '../../../Context'
import { Modal } from 'react-bootstrap'
import '../../../styles.css'
import resetimg from '../../../icons/reset.svg'
import questionMark from '../../../icons/questionMark.svg'
import flashcards from '../../../icons/flashcards.svg'
import YesAndNo from './YesAndNo'

export default function DeleteCardQuestionBox({ card, 
  pauseOrDelete,deleteWindow, 
  trashEvent, 
                                                setShowAnswerBtn=()=>{},
                                                setShowRepeatBtn=()=>{},
                                                setEditBtnClicked=()=>{},
                                                showDeleteWindow,
                                                deleteCurrentCard=()=>{},
                                                resetQuestionText=false,
                                                showMessageAgain= false,
                                                 pauseCardinQuestionAnswer=false,
                                                 randomQuestion,
                                                 index,
                                                 setPauseOrDeleteText=()=>{}
                                              }) 
  
{

  const { dataBase, setDataBase} = useContext(Context)


  function handleCheckbox () {
  
    setDataBase({...dataBase,checkboxClicked: true})
  }
 

  return (
 
    
      <Modal
        show={showDeleteWindow}
        onHide={deleteWindow}
        backdrop="static"
        keyboard={false}
        id='deleteWindow'
        dialogClassName='backgroundModal'
        contentClassName='widthFitContent'
        className='justify-center'
      >
        <div>

            <img 
                src={questionMark} 
               className='deleteCardQuestionBox__question-mark questionMark1'        
                 alt='questionMark' 
            />
            <img 
              src={questionMark} 
              className='deleteCardQuestionBox__question-mark questionMark2'
               alt='questionMark'              
            />

        </div>
        <Modal.Header 
            closeButton 
        >
            <Modal.Title>
                <div 
                  className='deleteCardQuestionBox__container-modal-title justify-center-align-center '           
                >
                  <div>
                      {
                        resetQuestionText? 
                          <img 
                              src={resetimg} 
                              className='justify-center-align-center flashCardsStyling' 
                              alt='reset'                         
                          />
                          :
                          <img 
                              src={flashcards} 
                              className='justify-center-align-center flashCardsStyling' 
                              alt='flashcards'                         
                          />

                      }
                  </div>

                  <div
                  >  
                      {
                        resetQuestionText? 
                           'Reset progress'
                                          
                              :
                           `${pauseOrDelete} ${card}`
                      }
                  </div>
              </div>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body 
            className='justify-center-align-center' 
        >

            {
              resetQuestionText?  'Do you want to reset the stats?'
                                       : 
                                  `Do you want to ${pauseOrDelete.toLowerCase()} this ${card} ?` 
            }
        </Modal.Body>

        <Modal.Footer>

        <YesAndNo 
          trashEvent={trashEvent}
          deleteCurrentCard={deleteCurrentCard}
          setShowRepeatBtn={setShowRepeatBtn}
          setShowAnswerBtn={setShowAnswerBtn}
          setEditBtnClicked={setEditBtnClicked}
          pauseCardinQuestionAnswer={pauseCardinQuestionAnswer}
          randomQuestion={randomQuestion}
          index={index}
          setPauseOrDeleteText={setPauseOrDeleteText}
            />


        </Modal.Footer>

      {!showMessageAgain?

      <div 
          className='deleteCardQuestionBox__showMessageAgain justify-center'
      >

          <div style={{width: '40px'}}
          >

              <input 
                  
                  className='deleteCardQuestionBox-input'
                  type='checkbox' 
                  onChange={handleCheckbox}
              />
    
          </div>

          <div className='deleteCardQuestionBox__dontShowMessageAgain'
          >

            Don't show message again
          </div>
      </div>
      : 
      null
      }

      </Modal>
  );
}


