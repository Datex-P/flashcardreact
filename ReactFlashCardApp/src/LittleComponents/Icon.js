import React,{useContext} from 'react';
import { Nav } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import {Context} from '../Context'

 function Icon({ src, alt, href, style = null,history }) {
  const {setShowProgressDiagram} = useContext(Context)

  return (
    <div
      style={{ ...style, display: 'flex' }}
      className='iconContainer'
      onClick={()=>{
            setShowProgressDiagram(false)
            history.push('/'+href)
            }} 
    
      >

      <img 
          src={src} 
          alt={alt} 
          style={{ width: '20px' }} 
          className='nonDraggableIcon'                                              

      />
      
      <Nav.Link 
          
      > 
          {href} 
      </Nav.Link>

    </div>
  )
}

export default withRouter(Icon)
