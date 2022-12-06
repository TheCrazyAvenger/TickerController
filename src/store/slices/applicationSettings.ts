import {Slices} from '@/constants';
import {createSlice} from '@reduxjs/toolkit';

type ApplicationSettingsStateType = {
  auto: boolean;
  caps: boolean;
  speed: number;
  bright: number;
  color: number;
};

const initialState: ApplicationSettingsStateType = {
  auto: false,
  caps: false,
  speed: 0.5,
  bright: 0.5,
  color: 0.5,
};

const applicationSettingsSlice = createSlice({
  name: Slices.applicationSettings,
  initialState,
  reducers: {
    setAuto: (state, action) => {
      return {...state, auto: action.payload};
    },
    setCaps: (state, action) => {
      return {...state, caps: action.payload};
    },
    setSpeed: (state, action) => {
      return {...state, speed: action.payload};
    },
    setBright: (state, action) => {
      return {...state, bright: action.payload};
    },
    setColor: (state, action) => {
      return {...state, color: action.payload};
    },
  },
});

export const {
  actions: {setAuto, setBright, setCaps, setColor, setSpeed},
  reducer: applicationSettingsReducer,
} = applicationSettingsSlice;
