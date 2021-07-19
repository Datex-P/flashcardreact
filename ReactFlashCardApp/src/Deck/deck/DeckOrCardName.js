


export default function DeckOrCardName({ name, bg}) {

 

  return (

    <div        
     
        className='deckOrCardNameContainer'
        style={{
            background: bg
        }}
    >
              {name}
         
    </div>
  )
}
