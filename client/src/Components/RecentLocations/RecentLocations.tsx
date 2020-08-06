import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { IAppState } from '../../redux/app.state'
import './RecentLocations.scss'
import { ILocation } from '../../interfaces/interfaces'
import Location from '../Location/Location'
interface RecentLocationsProps {
  locationList: ILocation[]
}
const RecentLocations = (props: RecentLocationsProps) => {
  const [recentLocations, setRecentLocations] = useState<ILocation[]>(props.locationList ? props.locationList : [])

  useEffect(() => {
    setRecentLocations(props.locationList)
  }, [props.locationList])

  return (
    <div className="recent-locations-wrapper">
      <div className="recent-locations-container">
        {(recentLocations && recentLocations.length > 0 &&
          recentLocations.map((location, idx) => {
            return <Location key={idx} location={location} />
          })) || <div>nothing here.. yet</div>
        }
      </div>
    </div>
  )

}

const mapStateToProps = (state: IAppState) => {
  return {
    locationList: state.global.locationList
  }
}
export default connect(mapStateToProps, null)(RecentLocations)

