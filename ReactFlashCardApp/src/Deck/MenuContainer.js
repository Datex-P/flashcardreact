import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap'
import { Context } from '../Context'
import './styles.css';

import Icon from '../LittleComponents/Icon'

import settingsIcon from '../icons/settings.svg';
import statsIcon from '../icons/stats.svg';
import logoutIcon from '../icons/logout.svg';


export default function MenuContainer({
    editButtonClicked, //set to false when editButton is not clicked gets activated when editButton is clicked

} 
    ) {

  const [show, setShow] = useState(false); //opens the Menu when set to true
  const { dataBase, styles,showProgressDiagram, setShowProgressDiagram } = useContext(Context)
  const handleClose = () => setShow(false); // closes the Menu when handleclos is triggered

  function triggerDiagramAndState () {
    setShow(!show)
    setShowProgressDiagram(!showProgressDiagram)
  }

  return (
    <div 
        className='mx-auto'
        style={{
                backgroundColor: dataBase && styles.backgroundColor[dataBase.userPreferences.backgroundColor],
                zIndex: '100', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', width: '440px'
                }}
    >
        <div className='menu flexColumnAlignCenter p-3'
             style= {{cursor: !editButtonClicked? 'default': 'pointer'}} //cursor is default when edit input field is activated
        >
            <div style={{fontSize: '18px'}}>
                    Menu
            </div>
            <div 
                className='menuContainer flexColumnAlignCenter' 
                onClick={() => 
                 !editButtonClicked?
                    null
                    :
                    triggerDiagramAndState()
                }
            >
                <div 
                    className={'menuIcon ' + (show ? 'transPlus' : ' ')} 
                    style={{ top: show ? '8px' : '0px' }}
                >
                </div>
                
                {
                  !show && 

                      <div className={'menuIcon'} style={{ top: '8px' }}
                      >                

                      </div>
                }

                <div 
                    className={'menuIcon ' + (show ? 'transMinus' : ' ')} 
                    style={{top: show ? '8px' : '16px' }}
                >  

                </div>
            </div>
        </div>

        {
          show && editButtonClicked?

          <>
              <Modal 
                  show={show} 
                  onHide={handleClose} 
                  contentClassName={'modNew'} 
                  dialogClassName='align-items-start  pl-3' 
                  centered
              >
                  <Modal.Body 
                      className='p-0' 
                      style={{position: 'relative', top: '42px', left: '10px'
                              }}
                  >
                      <div 
                          className='menuStyling nonDraggableIcon' 
                          onClick={()=>{setShow(false)
                           }}
                      >
                          <Icons 
                               icons={[
                                      { 
                                      src: statsIcon, 
                                      alt: 'statsIcon', 
                                      href: 'stats', 
                                      style: {  width: 'calc(100% / 3)',  padding: '3px', paddingLeft: '15px' 
                                             } 
                                        
                                      },
                                      {
                                        src: settingsIcon, 
                                        alt: 'settingsIcon', 
                                        href: 'settings', 
                                        style: {  width: 'calc(100% / 3)', padding: '3px', 
                                        borderLeft: '2px solid black', 
                                        borderRight: '2px solid black', paddingLeft: '15px' 
                                                } 
                                        },
                                      { 
                                        src: logoutIcon, 
                                        alt: 'logoutIcon', 
                                        href: 'logout', 
                                        style: { width: 'calc(100% / 3)', padding: '3px', paddingLeft: '15px'
                                                } 
                                      }
                                    ]}
                          />
                      </div>
                  </Modal.Body>
              </Modal>
          </>
          :
          null
        }
    </div>
  )
}

function Icons({ icons }) {
  return (
      icons.map((icon, key) => <Icon key={key} {...icon} />)
  )
}