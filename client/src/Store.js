import {createStore} from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// import RootReducer from './reducers/RootReducer'
import RootReducer from './redux/rootReducer'

// const Store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));
const Store = createStore(RootReducer);

export default Store