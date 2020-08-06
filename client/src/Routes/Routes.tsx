import React from 'react'
// import  About  from '../About/About'
import Main from '../Components/Main/Main'
// import { NavBar } from './components/NavBar';
import { HashRouter, Route, Switch } from 'react-router-dom';
import About from '../Components/About/About';
import RecentLocations from '../Components/RecentLocations/RecentLocations';
import NavBar from '../Components/NavBar/NavBar';
import './Routes.scss'

export const Routes = () => {
  return (
    <div className="router-wrapper">
      <HashRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={About} />
          <Route exact path="/recentLocations" component={RecentLocations} />
        </Switch>
      </HashRouter>
    </div>
  )
}