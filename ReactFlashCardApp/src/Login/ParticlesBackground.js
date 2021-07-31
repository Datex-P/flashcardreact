import React from 'react'
import Particles from 'react-particles-js'
import ParticlesConfig from './particle-config'

export default function ParticleBackground ({children}) {
  return (
    <div className='posRelative'
    >

        <Particles params = {ParticlesConfig}/>
        {children}

    </div>
  )
}