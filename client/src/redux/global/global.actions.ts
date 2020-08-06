import { ILocation, IDailyForecast } from '../../interfaces/interfaces';
import { Units } from '../../constants';


export const GLOBAL_ACTIONS_CONST = {
  CLEAR_STATE_GLOBAL: 'CLEAR_STATE_GLOBAL',
  ADD_TO_LOCATION_LIST: 'ADD_TO_LOCATION_LIST',
  SET_DAILY_FORECAST: 'SET_DAILY_FORECAST',
  TOGGLE_UNITS: 'TOGGLE_UNITS',
  SET_SELECTED_LOCATION: 'SET_SELECTED_LOCATION',
}

export const clearStateGlobal = (dispatch: any) => {
  dispatch({
    type: GLOBAL_ACTIONS_CONST.CLEAR_STATE_GLOBAL,
  });
};

export const addToLocationList = (dispatch: any, payload: ILocation)  => {
  dispatch({
    type: GLOBAL_ACTIONS_CONST.ADD_TO_LOCATION_LIST,
    payload,
  });
}

export const setDailyForecast = (dispatch: any, payload: IDailyForecast[])  => {
  dispatch({
    type: GLOBAL_ACTIONS_CONST.SET_DAILY_FORECAST,
    payload,
  });
}

export const toggleUnits = (dispatch: any, payload: Units) => {
  dispatch({
    type: GLOBAL_ACTIONS_CONST.TOGGLE_UNITS,
    payload,
  });
}

export const setSelectedLocation = (dispatch: any, payload: ILocation) => {
  dispatch({
    type: GLOBAL_ACTIONS_CONST.SET_SELECTED_LOCATION,
    payload
  })
}