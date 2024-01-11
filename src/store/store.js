// Import necessary dependencies
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
  token:localStorage.getItem('token')
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
