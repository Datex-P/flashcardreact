import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../../styles.css'
import NoAndYes from './NoAndYes'
import resetimg from '../../../icons/reset.svg'
import questionMark from '../../../icons/questionMark.svg'
import flashcards from '../../../icons/flashcards.svg'
import ShowMessage from './ShowMessage'

export default function DeleteCardQuestionBox({ card, 
  pauseOrDelete,deleteWindow, 
  trashEvent, 
                                                setShowAnswerBtn=()=>{},
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
                  className='deleteCardQuestionBox-modal-title justify-center-align-center '           
                >
                  <div>
                      {
                        resetQuestionText? 
                          <img 
                              src={resetQuestionText? resetimg: flashcards} 
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

                  <div>  
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
 
            <NoAndYes
                trashEvent={trashEvent}
                deleteCurrentCard={deleteCurrentCard}
                deleteWindow={deleteWindow}
                setEditBtnClicked={setEditBtnClicked}
                setShowAnswerBtn={setShowAnswerBtn}
                pauseCardinQuestionAnswer={pauseCardinQuestionAnswer}
                index={index}
                randomQuestion={randomQuestion}
            />            
        </Modal.Footer>

        {!showMessageAgain&&
        
        <ShowMessage />
          
          }
     

      </Modal>
  );
}


