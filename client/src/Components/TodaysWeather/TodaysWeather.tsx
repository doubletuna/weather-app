import React from 'react'
import './TodaysWeather.scss'
import { tempConversion } from '../../util'
import moment from 'moment'
import { Units } from '../../constants'
import { ILocation } from '../../interfaces/interfaces'

interface TodaysWeatherProps {
  selectedLocation: ILocation,
  date: string,
  max: number,
  min: number,
  icon: number,
  iconPhrase: string,
  units: string,
}

const TodaysWeather = (props: TodaysWeatherProps) => {
  const date = moment(props.date).format('llll').split(',')
  const convertTemp: boolean = props.units === Units.METRIC ? false : true
  console.log('props.selectedLocation ? ', props.selectedLocation)
  return (
    <div className="todays-weather-wrapper">
      <div className="location-title">{props.selectedLocation.LocalizedName}, {props.selectedLocation.Country.LocalizedName}</div>
      <div className="streachy-wrapper">
        <div className="temp">{tempConversion(props.max, convertTemp)}</div>
        <div className="icon-temp">
          <img className="weather-icon" src={`/images/${props.icon < 10 ? '0' + props.icon : props.icon}-s.png`} alt={props.iconPhrase} />
          <div className="inner-temp">{tempConversion(props.max, convertTemp)}&#176;/{tempConversion(props.min, convertTemp)}&#176;</div>
        </div>
      </div>
    </div>
  )
}

export default TodaysWeather