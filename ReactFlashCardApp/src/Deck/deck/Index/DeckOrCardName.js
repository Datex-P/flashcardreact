

export default function DeckOrCardName({ 
          bg, 
          editButtonClicked, 
          input, 
          name, 
          nameOfTopDeck, setNameOfTopDeck,
          setDeckNameLengthRight, 
          setThreeDotsMenuOpen,
          setNameTooLongOrShort
        }) {

  function handleChangeName(e){

    if (e.target.value.length >3 && e.target.value.length <12) {
     
     setDeckNameLengthRight(true)
     setThreeDotsMenuOpen(true)
     setNameTooLongOrShort(false)
     
    } else {
      setNameTooLongOrShort(true)
      setDeckNameLengthRight(false)

    }
      setNameOfTopDeck(e.target.value);
  }

 

  return (
    <>
    {editButtonClicked?
      (
    <div 
        className='deckOrCardNameContainer'
        style={{ background: bg}}
    >
              {name}
         
    </div>
      ):(
        <input
            ref={input}
            className="addToDeckInput"
            value={nameOfTopDeck}
            onChange={handleChangeName}
        />
      )
    }
    </>
  )
}
