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
          style={{width:'65px', height: '27px', display:'flex', justifyContent:'center',alignItems:'center'}}
      >

          {btn}
      </Button>
    
    </div>
  )
}
