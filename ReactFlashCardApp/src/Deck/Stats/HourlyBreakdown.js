import React, { useContext } from "react";
import { Context } from "../../Context";

export default function HourlyBreakdown() {
  const { dataBase, setDataBase } = useContext(Context);

  function handleMonths(e) {
    let newDataBase = { ...dataBase };
    newDataBase.hourlyBreakdown = e.target.value;
    setDataBase(newDataBase);
  }

  return (
    <div className='align-center flex-column'>
      <div className='hourlyBreakdown__hourly-breakdown'>Hourly Breakdown</div>

      <div className='hourlyBreakdown__month-container justify-evenly'>
        {['1 month', '3 month', '12 month'].map((comp, index) => (
          <React.Fragment key={index}>
            <input
              className='hourlyBreakdown__input'
              name='breakdownIntervals'
              type='radio'
              // title = `Change background color of main menu to ${comp}.`
              value={comp}
              checked={dataBase.hourlyBreakdown === comp} //how to combine checked and handleColor accurately?
              onChange={handleMonths}
            />

            <label style={{ margin: '5px' }}>{comp}</label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
