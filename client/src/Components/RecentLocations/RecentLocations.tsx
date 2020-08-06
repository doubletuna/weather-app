import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { IAppState } from '../../redux/app.state'
import './RecentLocations.scss'
import { ILocation, IDailyForecast } from '../../interfaces/interfaces'
import Location from '../Location/Location'
import _ from 'lodash'
import { setSelectedLocation, setDailyForecast } from '../../redux/global/global.actions'
import { useHistory } from 'react-router-dom'

interface RecentLocationsProps {
  locationList: ILocation[]
  selectedLocation: ILocation
  dailyForecast: IDailyForecast[]
  updateSelectedLocation: (location: ILocation) => void
  setDailyForecast: (dailyForecast: IDailyForecast[]) => void,
}
const RecentLocations = (props: RecentLocationsProps) => {
  const [recentLocations, setRecentLocations] = useState<ILocation[]>(props.locationList ? props.locationList : [])

  let history = useHistory()
  useEffect(() => {
    setRecentLocations(props.locationList)
  }, [props.locationList])

  const handleClickedLocation = async (key) => {
    const selectedLocation = _.find(recentLocations, { 'Key': key })
    if (selectedLocation) {
      props.updateSelectedLocation(selectedLocation)
      const response = await fetch(`/weather/${key}`)
      const processed = await response.json()
      if (processed.data && processed.data.Code !== 'ServiceUnavailable') {
        props.setDailyForecast(processed.data.DailyForecasts)
        history.push('/')
      }
    }
  }

  return (
    <div className="recent-locations-wrapper">
      <div className="recent-locations-container">
        {(recentLocations && recentLocations.length > 0 &&
          recentLocations.map((location, idx) => {
            return <Location key={idx} location={location} clickHandler={handleClickedLocation} />
          })) || <div>nothing here.. yet</div>
        }
      </div>
    </div>
  )

}

const mapStateToProps = (state: IAppState) => {
  return {
    locationList: state.global.locationList,
    selectedLocation: state.global.selectedLocation,
    dailyForecast: state.global.dailyForecast
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSelectedLocation: (location: ILocation) => setSelectedLocation(dispatch, location),
    setDailyForecast: (dailyForecast: IDailyForecast[]) => setDailyForecast(dispatch, dailyForecast)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentLocations)

