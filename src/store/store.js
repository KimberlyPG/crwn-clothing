import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

// Redux-Persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger,
thunk
].filter( //as long as we're not on production, render the logger
    Boolean
    ); 

const composedEnhancer = (
    process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose; //if this fail use the compose, in other case use the compose of redux devtools

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));
// root-reducers
export const store = createStore(
    persistedReducer, 
    undefined, 
    composedEnhancers
    );

export const persistor = persistStore(store);