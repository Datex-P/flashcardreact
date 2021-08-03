import React, {useContext} from 'react'
import PieDiagramm from "./PieDiagrammMain";
import { Context } from "../Context"; 

function ShowProgressD() {

   const {
     dataBase
   } = useContext(Context);


  return (
    <>
      <div className='showProgressDiagram'
      >
        <div className='fontBold '
        > 
            Goal
        </div>
        <div className='showProgressDiagram__percentages'
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
}

export default ShowProgressD
