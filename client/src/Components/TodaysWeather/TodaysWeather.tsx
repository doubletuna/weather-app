import React from 'react'
import './TodaysWeather.scss'
import { tempConversion } from '../../util'
import { Units } from '../../constants'
import { ILocation } from '../../interfaces/interfaces'
import moment from 'moment'

interface ITodaysWeatherProps {
  selectedLocation: ILocation,
  date: string,
  max: number,
  min: number,
  icon: number,
  iconPhrase: string,
  units: string,
}

const TodaysWeather: React.FC<ITodaysWeatherProps> = ({selectedLocation,  date,  max,  min,  icon,  iconPhrase,  units}: ITodaysWeatherProps) => {
  const dateArr = moment(date).format('LLLL').split(',')
  const convertTemp: boolean = units === Units.METRIC ? false : true
  return (
    <div className="todays-weather-wrapper">
      <div className="location-title">{selectedLocation.LocalizedName}, {selectedLocation.Country.LocalizedName}, {dateArr[0]}</div>
      <div className="streachy-wrapper">
        <div className="temp">{tempConversion(max, convertTemp)}</div>
        <div className="icon-temp">
          <img className="weather-icon" src={`/images/${icon < 10 ? '0' + icon : icon}-s.png`} alt={iconPhrase} />
          <div className="inner-temp">{tempConversion(max, convertTemp)}/{tempConversion(min, convertTemp)}</div>
        </div>
      </div>
    </div>
  )
}

export default TodaysWeather