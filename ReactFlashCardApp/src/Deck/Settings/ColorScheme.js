import React, {useContext} from 'react'
import '../styles.css'
import { Context } from '../../Context'

export default function ColorScheme () {

  const { dataBase, setDataBase} = useContext(Context)


  function handleColor(e) {
    let newDataBase = { ...dataBase }
    newDataBase.userPreferences[e.target.name] = e.target.value
    setDataBase(newDataBase)
  }


  return (
   <>
    <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px', marginBottom: '2px' }}
    >
        Colorscheme
    </div>

      <div 
          className='flexBetweenCenter border border-dark '
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
      </>







  )
}
