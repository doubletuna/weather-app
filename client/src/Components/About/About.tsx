import React from 'react'

import './About.scss'

const About: React.FC = () => {

  return (
    <div className="about-wrapper">

      <p>NodeJS/React/Mongodb weather app, using accuweather API</p>
      <p>source code available <a className="git-link" href="https://github.com/doubletuna/weather-app" target="_blank" rel="noopener noreferrer">here</a></p>

    </div>
  )
}

export default About