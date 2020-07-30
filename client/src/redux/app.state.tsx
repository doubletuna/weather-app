import { ILocation, IDailyForecast } from '../interfaces/interfaces';
import { Units } from '../constants';

export interface IGlobalState {
  selectedLocation?: ILocation,
  locationList: ILocation[],
  favorites?: ILocation[],
  dailyForecast: IDailyForecast[],
  units: Units,
}

export const INITIAL_GLOBAL_STATE: IGlobalState = {
  locationList: [],
  dailyForecast: [],
  units: Units.METRIC
}

export interface IAppState {
  global: IGlobalState
}

export const INITIAL_STATE: IAppState = {
  global: INITIAL_GLOBAL_STATE
}
