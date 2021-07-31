import React, {useContext} from 'react'
import PieDiagramm from "./PieDiagrammMain";
import { Context } from "../Context"; 

function ShowProgressD() {

   const {
     dataBase,
     showProgressDiagram,
   } = useContext(Context);


  return (
    <>
         {showProgressDiagram ? (
            <>
              <div className='showProgressDiagram'
              >
                  <div className='fontBold '
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
