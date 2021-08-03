import React, { useState, useContext} from 'react';
import { Context } from '../../Context'
import hexagonWhite from '../../icons/hexagon.svg'
import hexagonGreen from '../../icons/hexagonGreen.svg'


export default function Hexagons({ idx, editHex, setEditHex }) {

  const { dataBase, setDataBase } = useContext(Context)
  const [showDay, setShowDay] = useState(false)


  function setIndex() {
    let newDataBase = { ...dataBase }
    newDataBase.userPreferences.days = idx
    setDataBase(newDataBase)
    setShowDay(true)
  }

  return (
    
    <div className='hexagons justify-center-align-center flex-column'
    >

      {
        <img
          style={{ cursor: editHex ? 'default' : 'pointer' }}
      
          draggable={false}
          src={
              idx <= dataBase.userPreferences.days ? 
              
              hexagonGreen 
              : 
              hexagonWhite
          }
          alt='hexagon'
          onClick={() => { 
                setEditHex(true) 
                }}
          onMouseEnter={
              editHex ? 

              () => { } 
              : 
              setIndex
              }
          onMouseLeave={
              editHex ? 

              () => { } 
              : 
              () => { setShowDay(false) 
          }}

        />
      }

      {
        ((editHex && 
          
          (showDay || idx === dataBase.userPreferences.days)) || idx === dataBase.userPreferences.days) 
        &&
            
        <div className='hexagons__editHex'
        >

            <div className='hexagons__blackArrow'>
            </div>
            
            <span className='fontBold'
            >
                {
                  idx <= dataBase.userPreferences.days ? 

                      `${idx + 1}` 
                        : 
                      `${idx - 1}`
                }
            </span> 
            {
              idx === 0?
               ' day'
               : 
               ' days'
               }
        </div>
      }
    </div>
  )
}