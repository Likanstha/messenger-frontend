import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { authReducer } from './reducers/authReducer';
import { messengerReducer } from './reducers/messagerReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  messenger: messengerReducer,
});

export function getMiddleware(env) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const middleware = [];
  if (env !== 'production') {
    middleware.push(logger);
  }
  return middleware;
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getMiddleware(process.env.ENVIRONMENT)),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
