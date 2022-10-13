import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import {createStore} from 'redux';
import CommentsReducer from './reducers/CommentsReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }

const persistedReducer = persistReducer(persistConfig, CommentsReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store)
