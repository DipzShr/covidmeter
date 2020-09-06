import { createStore, combineReducers } from 'redux';

import countryData from './reducers/countryData';
import dateData from './reducers/dateData';

const appReducer = combineReducers({
  countryData,
  dateData,
});

const configureStore = () => createStore(appReducer);

export default configureStore;
