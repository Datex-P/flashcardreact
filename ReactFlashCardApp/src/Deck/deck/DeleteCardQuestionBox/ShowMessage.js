import React, { useContext} from 'react'
import {Context} from '../../../Context'

export default function ShowMessage() {


  const { dataBase, setDataBase} = useContext(Context)


  function handleCheckbox () {
  
    setDataBase({...dataBase,checkboxClicked: true})
  }

  return (


      <div className='deleteCardQuestionBox__showMessageAgain justify-center'
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
     
  )
}

