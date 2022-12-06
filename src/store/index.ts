import {Slices} from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {applicationSettingsReducer} from './slices/applicationSettings';

const applicationSettingsPersistConfig = {
  key: Slices.applicationSettings,
  storage: AsyncStorage,
  whitelist: ['auto', 'caps', 'speed', 'bright', 'color'],
};

const reducers = combineReducers({
  [Slices.applicationSettings]: persistReducer(
    applicationSettingsPersistConfig,
    applicationSettingsReducer,
  ),
});

export const store = configureStore({
  reducer: reducers,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
