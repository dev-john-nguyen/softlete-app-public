import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../services'

const middlewares: any = [
    reduxThunk
]

if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
}

const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
);

export default store
