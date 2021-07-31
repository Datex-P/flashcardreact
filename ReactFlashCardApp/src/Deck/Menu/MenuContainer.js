import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import Hamburger from "./Hamburger";
import "../../styles.css";
import { Context } from "../../Context";

import Icon from "./Icon";
import settingsIcon from "../../icons/settings.svg";
import statsIcon from "../../icons/stats.svg";
import logoutIcon from "../../icons/logout.svg";


export default function MenuContainer() {
  const [menuOpen, setMenuOpen] = useState(false); //opens the Menu when set to true
  const { dataBase, styles, editButtonClicked } = useContext(Context);
  const handleClose = () => setMenuOpen(false); // closes the Menu when handleclos is triggered

  return (
    <div
      className='mx-auto menuContainer'
      style={{
        backgroundColor:
          dataBase &&
          styles.backgroundColor[dataBase.userPreferences.backgroundColor],
      }}
    >
      <Hamburger
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {menuOpen && editButtonClicked ? (
        <>
          <Modal
            menuOpen={menuOpen}
            onHide={handleClose}
            contentClassName={"modNew"}
            dialogClassName='align-items-start  pl-3'
            centered
          >
            <Modal.Body className='p-0 menuContainer__modalbody'>
              <div
                className='menuStyling nonDraggableIcon'
                onClick={() => {
                  setMenuOpen(false);
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
