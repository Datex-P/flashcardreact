import React, { useState} from 'react'
import CutWord from './CutWord'


export default function DeckOrCardName({ name, paused, index,bg}) {

   const [hovered, setHovered] = useState(false)

  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

  return (


    <div        
     
        className='deckOrCardNameContainer'
        style={{
            background: bg
        }}
    >
      {
        hovered
          ?
          <div
              className='hoveredDeckOrCardName'
              style={{
                  background: colors[index % 5],
                  cursor: name.length > 15 && !paused ? 
                      'pointer' 
                          : 
                      'default'
                }}
          >

              {name}
          </div>
      
          :

          <CutWord name={name} />
      
      }
    </div>
  )
}