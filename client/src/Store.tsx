import {createStore} from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import RootReducer from './reducers/RootReducer'
import RootReducer from './redux/rootReducer'

const Store = createStore(RootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export default Store