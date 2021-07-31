import React, { useContext} from 'react'
import {Context} from '../../../Context'

function YesAndNo({trashEvent, deleteCurrentCard, setShowRepeatBtn, setShowAnswerBtn, setEditBtnClicked
  ,pauseCardinQuestionAnswer, index, randomQuestion, setPauseOrDeleteText, deleteWindow
}) {


  const { dataBase, setDataBase} = useContext(Context)


  return (
    <div 
    className='deleteCardQuestionBox__container-modal-footer justify-around-align-center' 
>

    <div 
        className='justify-around'
        style={{width: '75%' }}
    >

        {
          ['No', 'Yes'].map(el =>
              <div 
              key={el}
                  className='deleteContainerNoAndYes justify-center-align-center'
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
  )
}

export default YesAndNo
