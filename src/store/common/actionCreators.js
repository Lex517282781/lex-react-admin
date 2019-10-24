import * as types from './types';

export const setting_update = data => ({
  type: types.SETTING_UPDATE,
  data
});

export const global_update = data => ({
  type: types.GLOBAL_UPDATE,
  data
});
