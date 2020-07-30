import React, { useState } from 'react'
import './Main.scss'
import * as _ from 'lodash'
import { ILocation, IDailyForecast } from '../../interfaces/interfaces'
import { addToLocationList, setDailyForecast } from '../../redux/global/global.actions'
import { connect } from 'react-redux'
import { IAppState } from '../../redux/app.state'
import DailyWeather from '../DailyWeather/DailyWeather'
import { Units } from '../../constants'
import TodaysWeather from '../TodaysWeather/TodaysWeather'
import { handleFocus } from '../../util'

interface MainProps {
  addToLocation: (location: ILocation) => void
  setDailyForecast: (dailyForecast: IDailyForecast[]) => void,
  selectedLocation: ILocation,
  locationList: ILocation[],
  dailyForecast: IDailyForecast[],
  units: Units
}

const Main = (props: MainProps) => {

  const [countryInput, setCountryInput] = useState<string>('')
  const [locationList, setLocationList] = useState<any[]>()
  const [weather, setWeather] = useState<any[]>(props.dailyForecast ? props.dailyForecast : [])

  const handleSearchFieldChange = async (e) => {
    e.preventDefault()
    setCountryInput(e.target.value)
    if (e.target.value.length > 3) {
      console.log('greater than 3..')
      const response = await fetch(`/location/${e.target.value}`)
      const processed = await response.json()
      if (processed.data && processed.data.Code !== 'ServiceUnavailable') {
        setLocationList(processed.data)
        console.log('data ? ', processed.data)
      }
    }
  }

  const handleSelectionClicked = async (key) => {
    const selectedLocation = _.find(locationList, { 'Key': key })
    const locationExists = _.find(props.locationList, { 'Key': key })
    if (selectedLocation) {
      setCountryInput(selectedLocation.LocalizedName)
      setLocationList([])
      getWeatherBylocation(selectedLocation)

      // make sure that we have unique locations @ locationList 
      if (!locationExists) {
        props.addToLocation(selectedLocation)
      }
    } else {
      console.log('error crapola')
    }
  }

  const getWeatherBylocation = async (location) => {
    const response = await fetch(`/weather/${location.Key}`)
    const processed = await response.json()
    if (processed.data && processed.data.Code !== 'ServiceUnavailable') {
      setWeather(processed.data.DailyForecasts)
      props.setDailyForecast(processed.data.DailyForecasts)
      console.log('DailyForecasts ? ', processed.data.DailyForecasts)
    }
  }

  return (
    <div className="main-wrapper">
      <div className="search-wrapper">
        <>
        <input className="search-field" autoComplete="off" value={countryInput} type="text" name="country" onFocus={handleFocus} onClick={handleFocus} onChange={handleSearchFieldChange} placeholder="Search City" />
        <div className="search-icon"></div>
        </>
        <div className="autofill-container">
          {
            locationList && locationList.map((location, idx) => {
              return (
                <button className="autofill-option" onClick={() => handleSelectionClicked(location.Key)} key={idx}>{location.LocalizedName}</button>
              )
            })
          }
        </div>
      </div>
      {
        weather && weather[0] && <TodaysWeather selectedLocation={props.selectedLocation} date={weather[0].Date} max={weather[0].Temperature.Maximum.Value} min={weather[0].Temperature.Minimum.Value} icon={weather[0].Day.Icon} iconPhrase={weather[0].Day.IconPhrase} units={props.units} />
      }
      <div className="results-wrapper">
        <div className="grid-container">
          {
            weather && weather.map((day, idx) => {
              return <DailyWeather key={idx} date={day.Date} max={day.Temperature.Maximum.Value} min={day.Temperature.Minimum.Value} icon={day.Day.Icon} iconPhrase={day.Day.IconPhrase} units={props.units} />
            })
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IAppState) => {
  return {
    locationList: state.global.locationList,
    dailyForecast: state.global.dailyForecast,
    units: state.global.units,
    selectedLocation: state.global.selectedLocation
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToLocation: (location: ILocation) => addToLocationList(dispatch, location),
    setDailyForecast: (dailyForecast: IDailyForecast[]) => setDailyForecast(dispatch, dailyForecast)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

