// store.js
import { applyMiddleware,legacy_createStore as createStore } from 'redux';
import Reducer from './Reducer'; 
import logger from 'redux-logger'
const Store = createStore(Reducer,applyMiddleware(logger));
console.log(Store)
export default Store;
