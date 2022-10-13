import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import CommentsReducer from './reducers/CommentsReducer';

const rootReducer = combineReducers({CommentsReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk))