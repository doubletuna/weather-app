import { IGlobalState, INITIAL_GLOBAL_STATE } from '../app.state'

import * as _ from 'lodash'
import { GLOBAL_ACTIONS_CONST } from './global.actions'

export const globalReducer = (lastState: IGlobalState, action: any): IGlobalState => {
  console.log('action ? ', action)

  if (!lastState) return INITIAL_GLOBAL_STATE

  switch (action.type) {
    case GLOBAL_ACTIONS_CONST.ADD_TO_LOCATION_LIST:
      const locationList = _.cloneDeep(lastState.locationList)
      locationList.push(action.payload)
      return { ...lastState, locationList: locationList, selectedLocation: action.payload}
    case GLOBAL_ACTIONS_CONST.SET_DAILY_FORECAST:
      return { ...lastState, dailyForecast: action.payload }
    case GLOBAL_ACTIONS_CONST.TOGGLE_UNITS:
      return { ...lastState, units: action.payload }
    default:
      return lastState;
  }


}