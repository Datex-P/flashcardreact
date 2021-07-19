import React, { useContext } from 'react';
import { Context } from '../../Context'

export default function InputCheckbox({ index, setShowAnswerBtn, generateRandom }) {

  const { dataBase, setDataBase } = useContext(Context)
  let newDataBase = {...dataBase}


  function cardsPaused() {

    return dataBase.DeckNames[index].data.filter(x => x.paused === true).length || 0
  }

  function handleChecked (e) {
    if(dataBase.DeckNames[index].editModeActive) {
    document.getElementById('myonoffswitch').checked = false
    }
  }

  function switchOnOrOff () {
    if(!dataBase.DeckNames[index].editModeActive) {

      if (dataBase.DeckNames[index].data.filter(x => x.paused === true).length === 0) {
    
      } else {
      
          if(dataBase.DeckNames[index].pauseMode) {
          dataBase.DeckNames[index].pauseMode=false
          setDataBase(newDataBase)
          setShowAnswerBtn(true)
    
        }  else {
          dataBase.DeckNames[index].pauseMode=true
          setDataBase(newDataBase)
          setShowAnswerBtn(false)
          generateRandom()
      }  
    } }
  }


  return (


    <div
    >
      <input type="checkbox" name="onoffswitch"
        className="onoffswitch-checkbox myonoffswitch"
        id="myonoffswitch"
        tabIndex="0"
        onChange={handleChecked}
        value='10'
      />


      <label className="onoffswitch-label" htmlFor="myonoffswitch"
       onClick={() => {
         switchOnOrOff()
       }
       }
      
      >
        <span className="onoffswitch-inner"></span>
        <span className="onoffswitch-switch justify-center-align-center">
          {`${cardsPaused()}`}
        </span>
      </label>

    </div>

  )
}