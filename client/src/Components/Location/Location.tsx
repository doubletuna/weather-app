import React from 'react'

import './Location.scss'
import { ILocation } from '../../interfaces/interfaces'

interface LocationProps {
  location: ILocation
  clickHandler: (key: number) => void
}

const Location = (props: LocationProps) => {

  return (
    <div className="location-wrapper" onClick={() => props.clickHandler(props.location.Key)}>
      <div className="location">{props.location.LocalizedName}</div>
      <div className="country">{props.location.Country.LocalizedName}</div>
    </div>
  )

}

export default Location