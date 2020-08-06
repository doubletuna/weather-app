import React, { useState } from 'react'
import './Search.scss'
import { ILocation, IDailyForecast } from '../../interfaces/interfaces'
import { setDailyForecast, addToLocationList } from '../../redux/global/global.actions'
import { IAppState } from '../../redux/app.state'
import { connect } from 'react-redux'
import _ from 'lodash'
import { handleFocus } from '../../util'

interface SearchProps {
  addToLocation: (location: ILocation) => void
  setDailyForecast: (dailyForecast: IDailyForecast[]) => void,
  selectedLocation: ILocation,
  locationList: ILocation[],
  dailyForecast: IDailyForecast[],
}

const Search = (props: SearchProps) => {
  const [countryInput, setCountryInput] = useState<string>('')
  const [locationList, setLocationList] = useState<any[]>()

  const handleSearchFieldChange = async (e) => {
    e.preventDefault()
    setCountryInput(e.target.value)
    if (e.target.value.length > 3) {
      const response = await fetch(`/location/${e.target.value}`)
      const processed = await response.json()
      if (processed.data && processed.data.Code !== 'ServiceUnavailable') {
        setLocationList(processed.data)
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
      props.setDailyForecast(processed.data.DailyForecasts)
    }
  }

  return (
    <div className="search-wrapper">
      <>
        <input className="search-field" autoComplete="off" value={countryInput} type="text" name="country" onFocus={handleFocus} onClick={handleFocus} onChange={handleSearchFieldChange} placeholder="Search City" />
        <div className="search-icon"></div>
      </>
      <div className="autofill-container">
        {
          locationList && locationList.map((location, idx) => {
            return (
              <button className="autofill-option" onClick={() => handleSelectionClicked(location.Key)} key={idx}>{location.LocalizedName}, {location.Country.LocalizedName}</button>
            )
          })
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)


