import React, { useState, useRef, useContext,useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import {Context} from '../../../Context';

import useOutsideAlerter from './useOutsideAlerter'

import trashimg from '../../../icons/trash.svg'
import pauseimg from '../../../icons/pause.svg'
import editimg from '../../../icons/edit.svg'
import resetimg from '../../../icons/reset.svg'
import saveimg from '../../../icons/save.svg'
import playimg from '../../../icons/play.svg'


function ThreeDotsBtn({    
                        edit=false,trash=false,pause=false,reset=false,
                        className, 
                        editBtnClicked, //is the editBtn in the main Question/Answer Overview
                        data,
                        index, input, threeDotsContainer,
                        text, 
                        showFromParent, 
                        style, 
                        nameOfTopDeck, 
                        editEvent = () => { }, 
                        trashEvent = () => { },
                        resetEvent = () => { },
                       // pauseEvent = () => {},
                        type
                      }) 

{
  const {
    dataBase, setDataBase,
    editButtonClicked,
  } = useContext(Context);

  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false)
  const [pauseIsActive, setPauseIsActive] = useState(true)
  const [threeDotsOpen, setThreeDotsOpen] = useState(showFromParent);
 


  const handleClick = () => {
    setThreeDotsOpen(!threeDotsOpen);
    // setShowFromParent(!show)

  };

  const ref = useRef(null)

  useEffect(()=>{
    setThreeDotsOpen(showFromParent)
  },[showFromParent])


  function handleDeckname() {
    let newDataBase = {...dataBase}
    newDataBase.DeckNames[index].name = nameOfTopDeck
    //delete newDataBase.DeckNames[name]
    console.log(newDataBase)
    setDataBase(newDataBase)
  }


  useOutsideAlerter([ref,input], 
                    editButtonClicked, 
                    ()=>{
                      setThreeDotsOpen(false)
                    },
                    ()=>{
                    setBlinkingSaveIcon(true)
                    setTimeout(()=>{
                      setBlinkingSaveIcon(false)},
                      2000)
                    }                  
  )
    
    
  function handleEdit() {
    editEvent() 
    if(type==='card'){
      handleClick()
    }
    // !editName && setShow(false) 
    // other way of writing it
    if (!editButtonClicked) { //open input field when deckname is triggered
      // setThreeDotsOpen(false)
      handleDeckname()
    }
  }
  

  function handlePause () {
  
    //pauseEvent(index)
    let newDataBase = {...dataBase}
    let savePausedState = !pauseIsActive
    setPauseIsActive(savePausedState)

    dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused

    //let key = newDataBase.DeckNames.findIndex(deck=>deck.name === name)
   // newDataBase.DeckNames[key].paused = true //does not work for some reason
    setDataBase(newDataBase)
   // setEditButtonClicked(true)
    setThreeDotsOpen(false)
    //setNameOfTopDeck(name)
    
  }


  return (
    <>
    {
      dataBase?.DeckNames?.[index]?.paused ||??editBtnClicked ?
    
      null
         :
      <div style={threeDotsContainer}
      >
        <div 
            className='rotateLittleModal' 
            onClick={
                editButtonClicked? 

                handleClick                
                  : 
                ()=>{} 
            } 
          >
                  ...
       
        </div>

        {
          threeDotsOpen && 
          
          <div 
            ref={ref}
            style={style}
            className={`ml-2 rounded mt-2 ${className}`}
          >

            {
              edit&& 
              data?.length !==0 &&

              <button 
                  className='threeDotsBtn__btn align-center  p-1 '
                  onClick={handleEdit} 
              >
                      
                  <img 
                      alt='edit' 
                      style={{ marginRight: '3px' }}              
                      className={ blinkingSaveIcon ? 'blinkingIcon':'' } 
                      src={ editButtonClicked? editimg: saveimg } 
                  /> 

                {text}

              </button>
            }

            {
              pause && 
              data?.length !==0 &&


              <button 
                  className='threeDotsBtn__btn align-center  p-1 '
                  onClick={()=>handlePause(index)}
                  style={{
                          borderTop: '1px solid black', borderBottom: '1px solid black' ,
                          borderLeft: dataBase.DeckNames[index]?.paused? '1px solid black': null,
                          borderRight: dataBase.DeckNames[index]?.paused? '1px solid black': null,
                          borderRadius: dataBase.DeckNames[index]?.paused? '5px': null
                        }}
              >

                  <img 
                      alt='pause' 
                      className='threeDotsBtn__trash-pause-img'
                      src={ !dataBase.DeckNames[index]?.paused? pauseimg: playimg }  
                  />

                  {text}

              </button>
            }

            {
              trash && 
              
              <button 
                className='threeDotsBtn__btn align-center  p-1'
                onClick={() => {
                    trashEvent()
                    setThreeDotsOpen(false)
                }}
              >
                <img 
                      src={trashimg} 
                      alt='trash' 
                      className='threeDotsBtn__trash-pause-img'
                />

                {text}

              </button>
            }
            {
              reset &&
              
              <button 
                  className='threeDotsBtn__btn align-center outline-none p-1'
                  onClick={resetEvent}
              >

                <img 
                    src={resetimg} 
                    alt='reset'
                    className='threeDotsBtn__reset-img' 
                />

                {text}
              </button>
            }
          </div>
        }
      </div>   
 
    }
    </>
  );
}

export default  withRouter(ThreeDotsBtn)