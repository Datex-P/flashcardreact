import React, {
  useState,
  useEffect,
  useContext,
  useRef
} from "react";
import { Context } from "../../Context";
import BasicOrangeWindow from "../deck/BasicOrangeWindow";
import ThreeDotsBtn from "../deck/ThreeDotsBtn";
import { withRouter } from "react-router-dom";
import PieDiagramm from "./PieDiagramm";
import TimeAndProgress from "./TimeAndProgress.js";
import HourlyBreakdown from "./HourlyBreakdown.js";
import DeleteCardQuestionBox from "../deck/DeleteCardQuestionBox";

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
          <div style={{ fontSize: "22px", fontWeight: "bold" }}>Stats</div>
        }
        menu={
          <ThreeDotsBtn
            text={"stats"}
            className="resetButtonStyling"
            editButtonClicked
            resetEvent={() => {
              //!editButtonClicked
              setShow(!show);
              setShowDeleteFrame(true);

              //  reset=false
            }}
            reset
          />
        }
      >
        <div>
          <div className="studyBreakdownHeader">Today's study breakdown</div>
          <div className="dateDiagramPos">
            {!dataBase.openedToday
              ? "No cards studied today"
              :  `Data from: ${new Date().toLocaleDateString().replace(/\//g,'.')}`         
                }
          </div>
          <div
            style={{ marginBottom: "10px", border: "1px solid black" }}
            className="d-flex flex-direction column align-items-center"
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

          <div className="d-flex align-items-center justify-content-center">
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "-10px" }}
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
                ? "d-flex justify-content-center align-items-center calendarButtons"
                : " align-items-center flex justify-content-center"
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

function RenderDays() {
  const [year] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);
  const { dataBase } = useContext(Context);
  const [showTodaysProg, setShowTodaysProg] = useState(false);
  const innerStat = useRef(null)
  const [right,setRight]=useState(0)
  const [outer,setOuter]=useState(0)

  useEffect(() => {
    let date = [];
    let thisYear = new Date(`January 1, ${+year}`);

    while (
      thisYear.getMonth() !== 0 ||
      thisYear.getDate() !== 1 ||
      thisYear.getFullYear() === +year
    ) {
      date.push({ day: thisYear.toDateString(), cardsStudied: 0 });
      thisYear.setDate(thisYear.getDate() + 1);
    }
    //setDays(date);
    let today = new Date('May 26, 2021').toDateString();
    if (dataBase?.DeckNames) {
      for (let deck in dataBase.DeckNames) {
        //console.log(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length, 'opened cards today')

        //cardsStudiedataBase.DeckNames[deck].data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString())).length

        //cardsStudied = dataBase.DeckNames[deck].data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() === date)).length
        let todaysAmount = dataBase.DeckNames[deck].data.filter((item) =>
          item?.openHistory?.some(
            (item) => new Date(item).toDateString() === today
          )
        ).length;
        let index = date.findIndex((day) => day.day === today);
        //let newDays = [...days];
        console.log(index);
        date[index].cardsStudied += todaysAmount;
        setDays(date);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year,dataBase.DeckNames]);




  return (
    <div className="yearBoxContainer"
     onClick={(e)=>{    
       let outer = e.currentTarget.getBoundingClientRect()
   
      console.log(247, outer, "inner from year box")
       setOuter(outer)
       }}
     >
      {days.map((day, index) => (
        <div
          className={`day ${day.cardsStudied ? "pointer" : ""}`}
          key={index}
          style={{ backgroundColor: day.cardsStudied ? "red" : "" }}
          onClick={(e) => {
            let inner= e.target.getBoundingClientRect();
              console.log(273, inner, "inner from inner box");
             // setTimeout(()=>{
                if((outer.right - inner.right) < 126){
                  setRight(outer.right - inner.right - 126)
                  console.log('ggre')
                }
              //},10)
            if (day.cardsStudied) {
              setShowTodaysProg(true);

            //  console.log(innerStat.current.getBoundingClientRect(), 'inner from inner stat')
            }
          }}
        >
          {showTodaysProg && day.cardsStudied ? (
            <div
              style={{
                width: "126px",
                height: "86px",
                position: "absolute",
                top: "20px",
                left: right+'px'
              }}
              onClick={(e)=>{
                
 

              }}
              ref={innerStat}
            >
              {day.day}
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                }}
              >
                Time:
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "56px",
                  //, border: '1px solid black'
                }}
              >
                {/* {
                    `${Reviews: ${day.cardsStudied}  ${day.cardsStudied > 1? 'cards' : 'card'} }`
                    
                    } */}
                Review:`${day.cardsStudied !== 1 ? "s" : ""}: $
                {day.cardsStudied} card${day.cardsStudied !== 1 ? "s" : ""}`
                {/* Reviews: `${day.cardsStudied}` */}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
