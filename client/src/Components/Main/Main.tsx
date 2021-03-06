import React, { useState, useEffect } from 'react'
import './Main.scss'
import { ILocation, IDailyForecast } from '../../interfaces/interfaces'
import { connect } from 'react-redux'
import { IAppState } from '../../redux/app.state'
import DailyWeather from '../DailyWeather/DailyWeather'
import { Units } from '../../constants'
import TodaysWeather from '../TodaysWeather/TodaysWeather'

interface IMainProps {
  dailyForecast: IDailyForecast[],
  selectedLocation: ILocation,
  units: Units
}

const Main: React.FC<IMainProps> = ({ dailyForecast, selectedLocation, units }: IMainProps) => {
  const [weather, setWeather] = useState<any[]>(dailyForecast ? dailyForecast : [])

  useEffect(() => {
    setWeather(dailyForecast)
  }, [dailyForecast])

  return (
    <div className="main-wrapper">
      {
        weather?.[0] &&
        <TodaysWeather
          selectedLocation={selectedLocation}
          date={weather[0].Date}
          max={weather[0].Temperature.Maximum.Value}
          min={weather[0].Temperature.Minimum.Value}
          icon={weather[0].Day.Icon}
          iconPhrase={weather[0].Day.IconPhrase}
          units={units}
        />
      }
      <div className="results-wrapper">
        <div className="grid-container">
          {
            weather?.map((day, idx) => {
              return <DailyWeather
                key={idx}
                date={day.Date}
                max={day.Temperature.Maximum.Value}
                min={day.Temperature.Minimum.Value}
                icon={day.Day.Icon}
                iconPhrase={day.Day.IconPhrase}
                units={units} />
            })
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IAppState) => {
  return {
    dailyForecast: state.global.dailyForecast,
    units: state.global.units,
    selectedLocation: state.global.selectedLocation
  }
}

export default connect(mapStateToProps, null)(Main)

