import { Units } from '../constants'

export interface IDailyForecast {
  date: string,
  max: number,
  min: number,
  icon: number,
  unit: Units,
}

export interface ILocation {
  Key: number,
  LocalizedName: string,
  Country: ICountry
}

export interface ICountry {
  ID: string,
  LocalizedName: string,
}