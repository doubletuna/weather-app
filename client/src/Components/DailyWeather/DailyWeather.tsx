import React from 'react'
import './DailyWeather.scss'
import { Units } from '../../constants'
import moment from 'moment'
import { tempConversion } from '../../util'
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


      <div className="temp"><span className="max-min">Max: </span>{tempConversion(props.max, convertTemp)}</div>
      <div className="temp"><span className="max-min">Min: </span>{tempConversion(props.min, convertTemp)}</div>


      <img className="weather-icon" src={`/images/${props.icon < 10 ? '0' + props.icon : props.icon}-s.png`} alt={props.iconPhrase} />
    </div>
  )
}

export default DailyWeather