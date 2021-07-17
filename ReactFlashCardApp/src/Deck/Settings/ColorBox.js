import React, {useContext} from 'react'
import '../styles.css'
import { Context } from '../../Context'

export default function ColorBox() {

  const { dataBase, setDataBase} = useContext(Context)


  function handleColor(e) {
    let newDataBase = { ...dataBase }
    newDataBase.userPreferences[e.target.name] = e.target.value
    setDataBase(newDataBase)
  }


  return (
   
      

      <div 
          className='d-flex border border-dark justify-content-between align-items-center'
          style={{borderRadius: '5px', padding: '5px', width: '215px', marginTop: '10px', margin: 'auto'}}
      >

        {
          ['light', 'dark', 'default'].map(comp =>
            <>
              <input 
                style={{ cursor: 'pointer' }}
                name='backgroundColor'
                type='radio'
                // title = `Change background color of main menu to ${comp}.`
                value={comp}
                checked ={dataBase.userPreferences?.backgroundColor === comp}  //how to combine checked and handleColor accurately?
                onChange={handleColor}
              />
              <label className='mb-0'>
                  {comp}
              </label>
            </>
          )
        }
      </div>







  )
}
