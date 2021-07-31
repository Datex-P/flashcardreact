
import React, {  useContext} from "react";
import { Context } from "../Context"; 

function Scrollbar() {

  function handleActive(i) {
    setActive(i);
    let newDataBase = { ...dataBase };
    newDataBase.active = i;
    setDataBase(newDataBase);
  }

    
  function scrollHandler(e) {
    let position = e.target.scrollTop;

    setScrollPosition(position);

  }


  const {
    setActive,
    changeDeckNameOpen, 
    dataBase,
    setDataBase, 
    scroller,
    setScrollPosition

  } = useContext(Context);

  return (
    <div
    ref={scroller}
    className="scrollerStyling"
    onScroll={(event) => {
      if (!changeDeckNameOpen) {
        let step = (1000 - 220) / (dataBase.DeckNames.length - 1);
        let index = Math.floor(event.target.scrollTop / step);
        handleActive(index);
        // console.log(index + "actual handle active index");
        scrollHandler(event);
      }
    }}
  >
    <div
      style={{
        height: "1000px",
        position: "absolute",
        top: "0px",
        width: "100%",
      }}
    ></div>
  </div>
  )
}

export default Scrollbar
