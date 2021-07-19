


export default function DeckOrCardName({ name, paused, index,bg}) {


  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

 

  return (

    <div        
     
        className='deckOrCardNameContainer'
        style={{
            background: bg
        }}
    >
     
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
      
     
         
    </div>
  )
}
