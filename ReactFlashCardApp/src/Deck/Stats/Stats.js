import React, {useState, useEffect,useContext} from "react";
import { withRouter } from 'react-router-dom';
import { Context } from "../../Context";

import BasicOrangeWindow from '../deck/BasicOrangeWindow/BasicOrangeWindow';
import ThreeDotsBtn from "../deck/ThreeDotsBtn/ThreeDotsBtn";
import PieDiagramm from "./PieDiagramm";

import TimeAndProgress from './TimeAndProgress';
import HourlyBreakdown from "./HourlyBreakdown";
import DeleteCardQuestionBox from "../deck/DeleteCardQuestionBox/DeleteCardQuestionBox";
import RenderDays from './RenderDays'

function Stats({ history }) {
  const { dataBase, setShowProgressDiagram, setDataBase } = useContext(Context);
  const [showDeleteFrame, setShowDeleteFrame] = useState(false);
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
 
  

  function setShowFunc() {
    history.push("/");
    setShowProgressDiagram(true);
  }

  useEffect(() => {
    setShowProgressDiagram(false);
    // eslint-disable-next-line
  }, []);



  return (
    <div style={{ width: "70%", height: "50%" }}>
      <BasicOrangeWindow
        show={true}
        setShow={setShowFunc}
        title={
          <div className='stats__header'>Stats</div>
        }
        menu={
          <ThreeDotsBtn
            text={"stats"}
            className="resetButtonStyling"
            editButtonClicked
            resetEvent={() => {
          
              setShow(!show);
              setShowDeleteFrame(true);

              //  reset=false
            }}
            reset
          />
        }
      >
        <div>
          <div className='stats__study-breakdown'>Today's study breakdown</div>
          <div className='dateDiagramPos'>
            {!dataBase?.openedToday
              ? 'No cards studied today'
              :  `Data from: ${new Date().toLocaleDateString().replace(/\//g,'.')}`         
                }
          </div>
          <div
            style={{ marginBottom: "10px", border: "1px solid black" }}
            className="align-center flex-column"
          >
            {showDeleteFrame && (
              <DeleteCardQuestionBox
                resetQuestionText
                showMessageAgain
                card="card"
                checked={checked}
                setChecked={setChecked}
                showDeleteWindow={showDeleteFrame}
                deleteWindow={() => setShowDeleteFrame(false)}
                trashEvent={() => 
                {
                  let DeckNames = [...dataBase.DeckNames]
                  DeckNames.forEach(deckItem=>
                    deckItem.data.forEach(item=> item.openHistory&&delete item.openHistory)
               
                  )
                  setDataBase({...dataBase,DeckNames})
                }
                }
                onHide={() => {}}
              />
            )}

            <PieDiagramm />
          </div>

          <div className="stats__calendar">Calendar</div>

          <div className="justify-center-align-center">
            <ButtonLeftAndRight />
          </div>

          <HourlyBreakdown />
        </div>

        <div style={{ width: "200px" }}></div>

        <TimeAndProgress />
      </BasicOrangeWindow>
    </div>
  );
}

export default withRouter(Stats);

function ButtonLeftAndRight() {
  const [year, setYear] = useState(new Date().getFullYear());

  const handleIncrement = () => {
    setYear(year + 1);
  };

  const handleDecrement = () => {
    setYear(year - 1);
  };

  return (
    <div className='flex-column'
    >
      <div
        className="justify-center-align-center innerRenderDays"
      >
        {["<", year, ">"].map((el, index) => (
          <div
            style={{
              width: "33px",
              cursor: el === year ? "default" : "pointer",
              margin: el === year ? "5px" : "",
              marginTop: el === year? '1px': ''
            }}
            className={
              el !== year
                ? "justify-center-align-center  calendarButtons"
                : "justify-center-align-center"
            }
            onClick={
              el === "<" && el !== year ? handleDecrement : handleIncrement
            }
            key={index}
          >
            {el}
          </div>
        ))}
      </div>

      <RenderDays />
    </div>
  );
}
