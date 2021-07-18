import React, { useState} from 'react';
import style from './style.module.css'




export default function RepetitionIntervalFields(
                                      { data: { name, amount, unit }, 
                                      editIsPossible, index, 
                                      userTimePreferences, setUserTimePreferences,
                                      saveOrEdit
                                      }) 
  {

  const [inputNumb, setInputNumb] = useState(amount)
  const [inputText, setInputText] = useState(name)
  
  function handleInputNumbers(e) {

    
    if(e.target.value.length<3) {

      setInputNumb(e.target.value)
      let newUserTimePreferences = [ ...userTimePreferences ]
      newUserTimePreferences[index].amount = e.target.value
      setUserTimePreferences(newUserTimePreferences)
    }
  }

  function checker(e){
    let {value} = e.target;
    let newValue = value.replace(/[^0-9]/g,'')
    if(newValue.length<4){
      setInputNumb(newValue)
    }
  }


  function handleInputText(e) {

    setInputText(e.target.value)
   let newUserTimePreferences = [ ...userTimePreferences ]
    newUserTimePreferences[index].name = e.target.value
    setUserTimePreferences(newUserTimePreferences)
  }


  return (
    
    <div 
        className='p-2 flex-column flexCenterAlignCenter' 
    >
      <p 
          className=' border border-dark d-flex justify-content-center' 
          style={{borderRadius: '5px', width: '72px'}}
      >
          <div style={{ marginRight: '4px' }}
          >

              {'<'}
          </div>
          <form
              style={{width:'34px'}}
          >

              <input 
                   className={style.input}
                  type='number'
                  style={{ backgroundColor: saveOrEdit? '#545863':'transparent', outline: 'none', width: '32px', 
                  height: '21px', textAlign: 'center', cursor: saveOrEdit? 'pointer': 'default',
                  color: saveOrEdit? 'white':'black',
                  borderRadius:'5px'
                        }} 
                  disabled={!editIsPossible}
                  value={inputNumb}
                  onChange={handleInputNumbers}
                  onInput={checker}
            
              />
          </form>

            {
              <div style={{fontWeight: 'bold'}} //makes m h d values in settings fontweight bold
              >
                
                {unit}
              </div>
            }
      </p>
      <form>
          <input
            value={inputText}
            type='text'
            disabled={!editIsPossible}
            onChange={handleInputText}
            className='repetitionIntervalTextFields'
            maxLength = '8'
            minLength = '3'
            style={{
                    textAlign: 'center', 
                    cursor: editIsPossible ? 'pointer' : 'default',
                    backgroundColor: saveOrEdit? '#545863': 'grey'
                  }}
          />
      </form>

    </div>
  )

}

