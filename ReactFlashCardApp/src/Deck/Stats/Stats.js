import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { Context } from "../../Context";
import BasicOrangeWindow from '../deck/BasicOrangeWindow';
import ThreeDotsBtn from "../deck/ThreeDotsBtn";
import { withRouter } from 'react-router-dom';
import PieDiagramm from "./PieDiagramm";
import TimeAndProgress from './TimeAndProgress';
import HourlyBreakdown from "./HourlyBreakdown";
import DeleteCardQuestionBox from "../deck/DeleteCardQuestionBox";
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
          <div className='statsHeader'>Stats</div>
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
          <div className='studyBreakdownHeader'>Today's study breakdown</div>
          <div className='dateDiagramPos'>
            {!dataBase?.openedToday
              ? 'No cards studied today'
              :  `Data from: ${new Date().toLocaleDateString().replace(/\//g,'.')}`         
                }
          </div>
          <div
            style={{ marginBottom: "10px", border: "1px solid black" }}
            className="flexAlignCenter flex-direction column "
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

          <div className="theWordCalendar">Calendar</div>

          <div className="flexCenterAlignCenter">
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
    <div className='d-flex flex-column'
    >
      <div
        className="flexCenterAlignCenter  innerRenderDays"
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
                ? "flexCenterAlignCenter  calendarButtons"
                : " flexCenterAlignCenter "
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
