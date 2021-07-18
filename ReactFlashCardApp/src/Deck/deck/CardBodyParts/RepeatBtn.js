import { Button} from 'react-bootstrap'

export default function RepeatBtn({ label, btn, onClick }) {
  
  return (

    <div className='text-center'
    >

      <div className='font-weight-bold'
      >
          {label}
      </div>

      <Button 
          variant="secondary"
          onClick={onClick}
          className='flexCenterAlignCenter repeat-btn__button'
      >

          {btn}
      </Button>
    
    </div>
  )
}
