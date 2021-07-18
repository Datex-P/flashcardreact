import React, {useContext} from 'react'
import PieDiagramm from "./PieDiagrammMain";
import { Context } from "../Context"; 

function ShowProgressD({showProgressDiagram}) {

   const {
     dataBase
  
    
   } = useContext(Context);


  return (
    <>
         {showProgressDiagram ? (
            <>
              <div style={{width:'48px', height:'27px', position: 'absolute', left: '346px',top: '-31px', background: 'rgb(90, 170, 149)'}}
              >
                  <div style={{fontWeight:'bold'}}
                  > 
                      Goal
                  </div>
                  <div style={{fontSize:'13px', marginLeft:'5px'}}
                  >
                    {
                      `${parseInt((dataBase.deckCompleted * 100) /
                         Object.keys(dataBase.DeckNames).length)} %`
                    }
                  </div>
              </div>
            <div className='pieDiagramContainer'
            >
              <PieDiagramm />
            </div>
            </>
          ) 
          : 
          null}
    </>
  )
}

export default ShowProgressD
