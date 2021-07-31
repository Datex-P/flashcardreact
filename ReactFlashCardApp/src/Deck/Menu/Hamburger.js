import React, { useContext } from "react";
import { Context } from "../../Context";

function Hamburger({ 
  menuOpen, //when true menu is clicked and stats settings logout appear
  setMenuOpen 
}) {

  const { editButtonClicked, showProgressDiagram, setShowProgressDiagram} = useContext(Context);

  function triggerDiagramAndState() {
    setMenuOpen(!menuOpen);
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
          className={"menuIcon " + (menuOpen ? "transPlus" : " ")}
          style={{ top: menuOpen ? "8px" : "0px" }}
        ></div>

        {!menuOpen && <div className={"menuIcon sec"}></div>}

        <div
          className={"menuIcon " + (menuOpen ? "transMinus" : " ")}
          style={{ top: menuOpen ? "8px" : "16px" }}
        ></div>
      </div>
    </div>
  );
}

export default Hamburger;
