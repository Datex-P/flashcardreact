import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Context } from "../../Context";
import "../styles.css";
import Hamburger from './Hamburger'

import Icon from "../../LittleComponents/Icon";

import settingsIcon from "../../icons/settings.svg";
import statsIcon from "../../icons/stats.svg";
import logoutIcon from "../../icons/logout.svg";

export default function MenuContainer({
  editButtonClicked, //set to false when editButton is not clicked gets activated when editButton is clicked
}) {
  const [show, setShow] = useState(false); //opens the Menu when set to true
  const {
    dataBase,
    styles
  } = useContext(Context);
  const handleClose = () => setShow(false); // closes the Menu when handleclos is triggered


  return (
    <div
      className='mx-auto menuContainerOuter'
      style={{
        backgroundColor:
          dataBase &&
          styles.backgroundColor[dataBase.userPreferences.backgroundColor],
      }}
    >
  
      <Hamburger editButtonClicked={editButtonClicked} show={show}
      setShow={setShow} 
       />

      {show && editButtonClicked ? (
        <>
          <Modal
            show={show}
            onHide={handleClose}
            contentClassName={"modNew"}
            dialogClassName='align-items-start  pl-3'
            centered
          >
            <Modal.Body
              className='p-0 menuContainer__modalbody'
            >
              <div
                className='menuStyling nonDraggableIcon'
                onClick={() => {
                  setShow(false);
                }}
              >
                <Icons
                  icons={[
                    {
                      src: statsIcon,
                      alt: "statsIcon",
                      href: "stats",
                      style: {
                        width: "calc(100% / 3)",
                        padding: "3px",
                        paddingLeft: "15px",
                      },
                    },
                    {
                      src: settingsIcon,
                      alt: "settingsIcon",
                      href: "settings",
                      style: {
                        width: "calc(100% / 3)",
                        padding: "3px",
                        borderLeft: "2px solid black",
                        borderRight: "2px solid black",
                        paddingLeft: "15px",
                      },
                    },
                    {
                      src: logoutIcon,
                      alt: "logoutIcon",
                      href: "logout",
                      style: {
                        width: "calc(100% / 3)",
                        padding: "3px",
                        paddingLeft: "15px",
                      },
                    },
                  ]}
                />
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : null}
    </div>
  );
}

function Icons({ icons }) {
  return icons.map((icon, key) => <Icon key={key} {...icon} />);
}
