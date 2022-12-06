import {Slices} from '@/constants';

export const selectApplicationSettings = (state: any) =>
  state[Slices.applicationSettings];
