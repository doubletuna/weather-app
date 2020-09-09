import React, { useState, useEffect } from 'react'
import './NavBar.scss'
import { NavLink, useLocation } from "react-router-dom"
import { IAppState } from '../../redux/app.state'
import { connect } from 'react-redux'
import { Units } from '../../constants'
import { toggleUnits } from '../../redux/global/global.actions'
import Search from '../Search/Search'

interface INavBarProps {
  units: Units,
  changeUnits: (units: Units) => void,
}
const NavBar: React.FC<INavBarProps> = ({units, changeUnits}: INavBarProps) => {
  const [currentPath, setCurrentPath] = useState<string>('')
  const location = useLocation();

  const [currentUnits, setCurrentUnits] = useState<Units>(units)

  const toggleUnits = (units: Units) => {
    currentUnits === Units.METRIC ? setCurrentUnits(Units.METRIC) : setCurrentUnits(Units.IMPERIAL)
    changeUnits(units)
  }

  useEffect(() => {
    setCurrentPath(location.pathname)
    // console.log('location.pathname ? ', location.pathname)
  }, [location]);

  return (
    <nav className="navbar-wrapper">
      <ul className="navbar-container">
        <li className="nav-option">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
        </li>
        <li className="nav-option">
          <NavLink exact activeClassName="active" to="/recentLocations">Locations</NavLink>
        </li>
        <li className="nav-option">
          <NavLink exact activeClassName="active" to="/about">About</NavLink>
        </li>
        {
          currentPath === '/' && <li className="nav-option">
            <span className={`set-units ${units === Units.METRIC ? "active" : ""}`} onClick={() => toggleUnits(Units.METRIC)}>&#8451;</span>
            <span className={`set-units ${units === Units.IMPERIAL ? "active" : ""}`} onClick={() => toggleUnits(Units.IMPERIAL)}>&#8457;</span>
          </li>
        }
      </ul>
      {
        currentPath === '/' && <Search />
      }
    </nav>
  )
}

const mapStateToProps = (state: IAppState) => {
  return {
    units: state.global.units,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeUnits: (units: Units) => toggleUnits(dispatch, units)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)