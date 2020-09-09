import React from 'react'
import './DailyWeather.scss'
import { Units } from '../../constants'
import moment from 'moment'
import { tempConversion } from '../../util'
interface IDailyWeatherProps {
  date: string,
  max: number,
  min: number,
  icon: number,
  iconPhrase: string,
  units: string,
}

const DailyWeather: React.FC<IDailyWeatherProps> = ({ date, max, min, icon, iconPhrase, units }: IDailyWeatherProps) => {
  const dateArr = moment(date).format('llll').split(',')
  const convertTemp: boolean = units === Units.METRIC ? false : true

  return (
    <div className="daily-weather" >
      <div className="day-of-week">{dateArr[0]} <span className="date">{dateArr[1]}</span>  </div>


      <div className="temp"><span className="max-min">Max: </span>{tempConversion(max, convertTemp)}</div>
      <div className="temp"><span className="max-min">Min: </span>{tempConversion(min, convertTemp)}</div>


      <img className="weather-icon" src={`/images/${icon < 10 ? '0' + icon : icon}-s.png`} alt={iconPhrase} />
    </div>
  )
}

export default DailyWeather