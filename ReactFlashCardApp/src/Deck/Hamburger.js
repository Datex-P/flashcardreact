import React from 'react'

function Hamburger({editButtonClicked, show, setShow, setShowProgressDiagram, showProgressDiagram}) {

  function triggerDiagramAndState() {
    setShow(!show);
    setShowProgressDiagram(!showProgressDiagram);
  }


  return (
    <div
    className='menu flexColumnAlignCenter p-3'
    style={{ cursor: !editButtonClicked ? "default" : "pointer" }} //cursor is default when edit input field is activated
  >
    <div style={{ fontSize: "18px" }}>Menu</div>
    <div
      className='menuContainer flexColumnAlignCenter'
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
  )
}

export default Hamburger
