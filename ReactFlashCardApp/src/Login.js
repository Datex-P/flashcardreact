import './Deck/styles.css'
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import ParticleBackground from './Particles/ParticlesBackground.js'
import flashcard from "./icons/flashcard.svg";
import flash from "./icons/flash.svg";
import usersSolid from "./icons/users.svg";
import keysSolid from "./icons/keys.svg";
import {GoogleLogin} from 'react-google-login';

const clientId = '120219528416-sosfr3o924155s2girgnofqkrvfa4qsr.apps.googleusercontent.com'

 
class Login extends React.Component {
  state = {
    login: '',
    password:''
  }
  responseFacebook(response) {
    console.log(response)
  }

  Login =() =>{
    
  }
onSuccess = (res) => {
     
      this.props.setUser(res.profileObj)
  
    }
  onFailure = (res) => {
    console.log('res:', res)
  }

 
  render() {
    return (
       <ParticleBackground 
       >
      
      <div style={{width: '440px', height:'720px', 
      backgroundColor: 'rgb(90, 170, 149)',
      borderRadius: '10px', margin: '40px auto'}}
      >

            <img src = {flashcard} alt = 'flashcard' style={{position: 'relative', left: '-239px', width:'193%', top:'-36px'}}/>
            <img src = {flash} alt = 'flashcard' className= 'flashcardBackground' style={{position: 'relative', left: '-179px', top:'-46px',width:'161%'}}/>
            <img src = {flash} alt = 'flashcard' className= 'flashcardBackground' style={{position: 'relative', left: '-177px',top: '-56px', width:'161%'}}/>
            <img src = {flash} alt = 'flashcard' className= 'flashcardBackground' style={{position: 'relative', left: '-179px', top:'-67px', width:'161%'}}/>
          
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width:'inherit',
            position: 'absolute', top:'380px'}}>
            <div style={{display: 'flex'}}>
              <img src={usersSolid} alt='usersSolid' style={{width:'16px', marginRight: '9px'}}/> 
              <input value={this.state.login} onChange={e=>this.setState({login:e.target.value})} style={{width: '140px', height: '25px', borderRadius: '5px'}}/>
            </div>
            <div style={{display:'flex', marginTop:'29px'}}>
              <img src={keysSolid} alt='usersSolid' style={{width:'16px', marginRight: '9px'}}/> 
              <form>

              <input value={this.state.password} onChange={e=>this.setState({password:e.target.value})}
              type='password' style={{width: '140px', height: '25px', borderRadius:'5px'}}/>

              </form>

            </div>

        </div>

        <div style={{textAlign: 'center', position: 'absolute', bottom: '140px', width: 'inherit'}}>
          <FacebookLogin
            appId="699586404315736"
            cssClass='btnFacebook'
        //   autoLoad={true}
            fields="name,email,picture"
            callback={this.props.setUser}
          />
        </div>

        <div style={{position: 'absolute', top: '600px', width: '456px', display: 'flex', justifyContent:'center'}}>
          <GoogleLogin
            clientId={clientId}
            buttonText='Login'
            className='btnGoogle'
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn = {true}
          />
        </div>

      </div>
      </ParticleBackground>
    )
  }
}
 
export default Login;