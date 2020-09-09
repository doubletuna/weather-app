import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { IAppState } from '../../redux/app.state'
import './RecentLocations.scss'
import { ILocation, IDailyForecast } from '../../interfaces/interfaces'
import Location from '../Location/Location'
import _ from 'lodash'
import { setSelectedLocation, setDailyForecast } from '../../redux/global/global.actions'
import { useHistory } from 'react-router-dom'

interface IRecentLocationsProps {
  locationList: ILocation[]
  updateSelectedLocation: (location: ILocation) => void
  setDailyForecast: (dailyForecast: IDailyForecast[]) => void,
}
const RecentLocations: React.FC<IRecentLocationsProps> = ({ locationList, updateSelectedLocation, setDailyForecast }: IRecentLocationsProps) => {
  const [recentLocations, setRecentLocations] = useState<ILocation[]>(locationList ? locationList : [])

  let history = useHistory()
  useEffect(() => {
    setRecentLocations(locationList)
  }, [locationList])

  const handleClickedLocation = async (key) => {
    const location = _.find(recentLocations, { 'Key': key })
    if (location) {
      updateSelectedLocation(location)
      const response = await fetch(`/weather/${key}`)
      const processed = await response.json()
      if (processed.data?.Code !== 'ServiceUnavailable') {
        setDailyForecast(processed.data.DailyForecasts)
        history.push('/')
      }
    }
  }

  return (
    <div className="recent-locations-wrapper">
      <div className="recent-locations-container">
        {(recentLocations?.length > 0 &&
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
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSelectedLocation: (location: ILocation) => setSelectedLocation(dispatch, location),
    setDailyForecast: (dailyForecast: IDailyForecast[]) => setDailyForecast(dispatch, dailyForecast)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentLocations)

