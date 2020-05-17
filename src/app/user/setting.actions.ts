import { createAction, props } from '@ngrx/store';
import { UserSetting } from '../api.service';

export const loadSettings = createAction(
  '[Setting] Load Settings'
);

export const loadSettingsSuccess = createAction(
  '[Setting] Load Settings Success',
  props<{ userSetting: UserSetting }>()
);

export const loadSettingsFailure = createAction(
  '[Setting] Load Settings Failure',
  props<{ error: any }>()
);
