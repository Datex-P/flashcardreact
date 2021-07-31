import '../styles.css'
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import ParticleBackground from './ParticlesBackground.js'
import flashcard from "../icons/flashcard.svg";
import flash from "../icons/flash.svg";
import usersSolid from "../icons/users.svg";
import keysSolid from "../icons/keys.svg";
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
      
      <div className='login'
      >

            <img src = {flashcard} alt = 'flashcard' className='login__flashcardBackground-top' />
            <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-179px', top:'-46px'}}/>
            <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-177px',top: '-56px'}}/>
            <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-179px', top:'-67px'}}/>
          
            <div className='login__login-password-container align-center flex-column'
            >

            <div className='d-flex'>
                  <img 
                          src={usersSolid} 
                          alt='click to enter user name' 
                          className='login__img-login-password'
                         
                  /> 

                  <input 
                  value={this.state.login} 
                  onChange={e=>this.setState({login:e.target.value})} 
                  className='login__input-username'
                  />
            </div>
            <div className='login__login-password-row d-flex '
            >
                  <img 
                      src={keysSolid} 
                      alt='click to enter password' 
                      className='login__img-login-password'
                      /> 
                  <form>

                  <input 
                  value={this.state.password} 
                  onChange={e=>this.setState({password:e.target.value})}
                  type='password' 
                  className='login__input-password'
                  />

                  </form>

            </div>

        </div>

        <div className='login__facebook-container'
        >
          <FacebookLogin
            appId="699586404315736"
            cssClass='login__btn-facebook'
        //   autoLoad={true}
            fields="name,email,picture"
            callback={this.props.setUser}
          />
        </div>

        <div className='login__google-container justify-center'
        >
          <GoogleLogin
            clientId={clientId}
            buttonText='Login'
            className='login__btn-google'
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