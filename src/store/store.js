import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddeware from 'redux-saga';
import { rootReducer } from './root-reducer';
// import { rootSaga } from './root-saga';
import { rootSaga } from './root-saga';

// Redux-Persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const sagaMiddleware = createSagaMiddeware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger,
sagaMiddleware
].filter(Boolean); //as long as we're not on production, render the logger

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

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);