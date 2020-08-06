import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { IAppState } from '../../redux/app.state'
import './Favorites.scss'
import { ILocation } from '../../interfaces/interfaces'
import Location from '../Location/Location'
interface FavoritesProps {
  locationList: ILocation[]
}
const Favorites = (props: FavoritesProps) => {
  const [favorites, setFavorites] = useState<ILocation[]>(props.locationList ? props.locationList : [])

  useEffect(() => {
    setFavorites(props.locationList)
    console.log('favorites ? ', props.locationList)
  }, [props.locationList])

  return (
    <div className="favorites-wrapper">
      <div className="favorites-container">
        {favorites && favorites.length > 0 &&
          favorites.map((location, idx) => {
            return <Location key={idx} location={location} />
          }) || <div>nothing here.. yet</div>
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
export default connect(mapStateToProps, null)(Favorites)

