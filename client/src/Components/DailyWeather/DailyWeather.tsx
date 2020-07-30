import React from 'react'
import './DailyWeather.scss'
import { Units } from '../../constants'
import moment from 'moment'
import {tempConversion} from '../../util'
interface DailyWeatherProps {
  date: string,
  max: number,
  min: number,
  icon: number,
  iconPhrase: string,
  units: string,
}

const DailyWeather = (props: DailyWeatherProps) => {
  const date = moment(props.date).format('llll').split(',')
  const convertTemp: boolean = props.units === Units.METRIC ? false : true

  return (
    <div className="daily-weather" >
      <div className="day-of-week">{date[0]} <span className="date">{date[1]}</span>  </div>

      {convertTemp ?
        <><div className="temp">Max: {tempConversion(props.max)}&#8457;</div>
          <div className="temp">Min: {tempConversion(props.min)}&#8457;</div>
        </>
        :
        <><div className="temp">Max: {props.max}&#8451;</div>
          <div className="temp">Min: {props.min}&#8451;</div>
        </>
      }

      <img className="weather-icon" src={`/images/0${props.icon}-s.png`} alt={props.iconPhrase} />
    </div>
  )
}

export default DailyWeather