import React from 'react'

import '../ClickedOutsideWindow/styles.css'
import MenuContainer from '../Deck/Menu/MenuContainer'


export default function NavBar({editButtonClicked}) {
  
  
  return (
    <>   
      <MenuContainer 
        editButtonClicked={editButtonClicked}
        /> 
    </>
  )
}


