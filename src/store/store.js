import { compose, createStore, applyWiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const middleWares = [logger]

const composedEnhancers = compose(applyWiddleware(...middleWares));
// root-reducers
export const store = createStore(rootReducer, undefined, composedEnhancers);