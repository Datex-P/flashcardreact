import React, { useContext} from 'react'
import {Context} from '../../Context'
import { Modal } from 'react-bootstrap'
import '../styles.css'
import resetimg from '../../icons/reset.svg'

import questionMark from '../../icons/questionMark.svg'
import flashcards from '../../icons/flashcards.svg'

export default function DeleteCardQuestionBox({ card, pauseOrDelete,deleteWindow, trashEvent, 
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
        className='d-flex justify-content-center '
      >
        <div>

            <img 
                src={questionMark} 
                 style={{ width: '40px', position: 'absolute', top: '-47px', right: '-10px'}}
                 alt='questionMark' 
            />
            <img 
              src={questionMark} 
               style={{ width: '40px', position: 'absolute', top: '-65px', right: '-30px'}}
               alt='questionMark'              
            />

        </div>
        <Modal.Header 
            closeButton 
        >
            <Modal.Title>
                <div 
                  className='flexCenterAlignCenter'           
                  style={{height:'100%', width: '100%'}}
                >
                  <div>
                      {
                        resetQuestionText? 
                          <img 
                              src={resetimg} 
                              className='flexCenterAlignCenter flashCardsStyling' 
                              alt='reset'                         
                          />
                          :
                          <img 
                              src={flashcards} 
                              className='flexCenterAlignCenter flashCardsStyling' 
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
            className='flexCenterAlignCenter' 
        >

            {
              resetQuestionText?  'Do you want to reset the stats?'
                                       : 
                                  `Do you want to ${pauseOrDelete.toLowerCase()} this ${card} ?` 
            }
        </Modal.Body>

        <Modal.Footer>

            <div 
                className='flexAroundCenter' 
                style={{width: '100%', height: '14px'}}
            >

                <div 
                    className='flexSpaceAround'
                    style={{width: '75%' }}
                >

                    {
                      ['No', 'Yes'].map(el =>
                          <div 
                          key={el}
                              className='deleteContainerNoAndYes flexCenterAlignCenter'
                              onClick={() => {
                                if (el === 'Yes') {
                                  trashEvent()
                                  deleteCurrentCard()
                                  setShowRepeatBtn(false)
                                   setShowAnswerBtn(true)
                                  setEditBtnClicked(false)
                             

                                 if(pauseCardinQuestionAnswer){

                                  let newDataBase = { ...dataBase }

                                  dataBase.DeckNames[index].data[randomQuestion].paused = true
                                  setDataBase(newDataBase)
                                
                                 }
                                }
                                deleteWindow()
                                setPauseOrDeleteText(true)
                              }}
                          >

                            {el}
                          </div>
                          )
                    }
                </div>
            </div>

        </Modal.Footer>

      {!showMessageAgain?

      <div 
          className='flexCenter'
          style = {{width: '300px', position: 'absolute', top: '175px'
                  }} 
      >

          <div style={{width: '40px'}}
          >

              <input 
                  style= {{width: '45px'}} 
                  type='checkbox' 
                  onChange={handleCheckbox}
              />
    
          </div>

          <div style={{ width: '200px', zIndex: '2', color: 'white'}}
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


