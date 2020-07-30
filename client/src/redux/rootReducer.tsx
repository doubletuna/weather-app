import { combineReducers, Reducer, CombinedState } from 'redux';
import { globalReducer } from './global/global.reducer';
import { IGlobalState } from './app.state';

const rootReducer: Reducer<CombinedState<any>, any> = combineReducers<{global: (lastState: IGlobalState, action: any) => IGlobalState}>({
  global: globalReducer
});

export default rootReducer;