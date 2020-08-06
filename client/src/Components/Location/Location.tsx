import React from 'react'

import './Location.scss'
import { ILocation } from '../../interfaces/interfaces'

interface LocationProps {
  location: ILocation
}

const Location = (props: LocationProps) => {
  return (
    <div className="location-wrapper">
      <div className="location">{props.location.LocalizedName}</div>
      <div className="country">{props.location.Country.LocalizedName}</div>
    </div>
  )

}


export default Location