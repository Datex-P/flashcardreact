import React from 'react'

import './LittleComponents/styles.css'
import MenuContainer from './Deck/MenuContainer'


export default function NavBar({editButtonClicked}) {
  
  
  return (
    <>   
      <MenuContainer 
        editButtonClicked={editButtonClicked}
        /> 
    </>
  )
}


