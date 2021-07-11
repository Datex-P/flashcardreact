import React, { useContext } from 'react'
import { Context } from '../../Context'


export default function HourlyBreakdown() {

  const { dataBase, setDataBase } = useContext(Context)


  function handleMonths(e) {
    let newDataBase = { ...dataBase }
    newDataBase.hourlyBreakdown = e.target.value
    setDataBase(newDataBase)
  }

  return (
    
    <div className='d-flex align-items-center flex-column'
    >

      <div style={{ marginTop: '20px', fontSize: 'bold', fontWeight: 'bold' }}
      >
          Hourly Breakdown
      </div>

      <div  className='monthContainerBox'
      >{
          ['1 month', '3 month', '12 month'].map((comp,index) =>
            <React.Fragment key={index}>
              <input 
                  style={{ cursor: 'pointer', marginTop: '10px', marginBottom: '20px' }}
                  name='breakdownIntervals'
                  type='radio'
                // title = `Change background color of main menu to ${comp}.`
                  value={comp}
                  checked ={dataBase.hourlyBreakdown === comp}  //how to combine checked and handleColor accurately?
                  onChange={handleMonths}
                  
              />

              <label style={{ margin: '5px' }}
                      
              >

                  {comp}
              </label>
            </React.Fragment>
          )
        }
      </div>

    </div>
  )
}