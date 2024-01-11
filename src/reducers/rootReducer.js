import { combineReducers } from 'redux';
import authReducer from './authReducer';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  search: newsReducer
});

export default rootReducer;