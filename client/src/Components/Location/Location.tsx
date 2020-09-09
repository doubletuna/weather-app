import React from 'react'

import './Location.scss'
import { ILocation } from '../../interfaces/interfaces'

interface ILocationProps {
  location: ILocation
  clickHandler: (key: number) => void
}

const Location: React.FC<ILocationProps> = ({location, clickHandler}: ILocationProps) => {

  return (
    <div className="location-wrapper" onClick={() => clickHandler(location.Key)}>
      <div className="location">{location.LocalizedName}</div>
      <div className="country">{location.Country.LocalizedName}</div>
    </div>
  )

}

export default Location