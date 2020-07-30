import React from 'react'
// import  About  from '../About/About'
import Main from '../Components/Main/Main'
// import { NavBar } from './components/NavBar';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import About from '../Components/About/About';
import Favorites from '../Components/Favorites/Favorites';
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
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/favorites1">
            <Redirect to="/favorites" />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}