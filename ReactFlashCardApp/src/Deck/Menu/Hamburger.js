import React, { useContext } from "react";
import { Context } from "../../Context";

function Hamburger({ editButtonClicked, show, setShow }) {

  const { showProgressDiagram, setShowProgressDiagram } = useContext(Context);

  function triggerDiagramAndState() {
    setShow(!show);
    setShowProgressDiagram(!showProgressDiagram);
  }

  return (
    <div
      className='menu align-center flex-column p-3'
      style={{ cursor: !editButtonClicked ? "default" : "pointer" }} //cursor is default when edit input field is activated
    >
      <div style={{ fontSize: "18px" }}>Menu</div>
      <div
        className='
        hamburger__menu-icon-container
         align-center flex-column'
        onClick={() => (!editButtonClicked ? null : triggerDiagramAndState())}
      >
        <div
          className={"menuIcon " + (show ? "transPlus" : " ")}
          style={{ top: show ? "8px" : "0px" }}
        ></div>

        {!show && <div className={"menuIcon"} style={{ top: "8px" }}></div>}

        <div
          className={"menuIcon " + (show ? "transMinus" : " ")}
          style={{ top: show ? "8px" : "16px" }}
        ></div>
      </div>
    </div>
  );
}

export default Hamburger;
