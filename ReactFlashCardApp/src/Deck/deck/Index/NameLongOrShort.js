import React from 'react'

export default function NameOrShort({nameOfTopDeck, nameTooLongOrShort}) {
  return (
    <>
      {
        nameTooLongOrShort? 
          <div className='tooLongOrShort'
          >
          {`${nameOfTopDeck.length>11? 'Too long' : nameOfTopDeck.length<4? 'Too short': ''}`}
          </div>
          :
          null

       }  
      
    </>
  )
}
