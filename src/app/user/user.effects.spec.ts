import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { instance, mock } from 'ts-mockito';
import { ApiService, User, UserSetting } from '../api.service';
import { loadSettings, loadSettingsFailure, loadSettingsSuccess } from './setting.actions';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';

import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: ApiService,
          useValue: instance(mock(ApiService))
        }
      ]
    });

    effects = TestBed.get<UserEffects>(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('#loadUsers$', () => {
    it('should make a request', () => {
      // marbles
      const actions =  '-a-a';
      const request  = ' --(a|)';
      const expected = '---a';

      // data
      const user = {
        email: 'email@address.com'
      } as User;
      const action = loadUsers();
      const successAction = loadUsersSuccess({user});

      // spies
      spyOn(effects['apiService'], 'getUser').and.returnValue(cold(request, {
        a: user
      }));
      actions$ = hot(actions, {
        a: action
      });

      // expect
      expect(effects.loadUsers$).toBeObservable(cold(expected, {
        a: successAction
      }));
      expect(effects['apiService'].getUser).toHaveBeenCalledWith('myUser');
      expect(effects['apiService'].getUser).toHaveBeenCalledTimes(1);
    });
    it('should make a request', () => {
      // marbles
      const actions =  '-a';
      const request  = ' --#';
      const expected = '---a';

      // data
      const error = new Error('Failed to load');
      const action = loadUsers();
      const failureAction = loadUsersFailure({error});

      // spies
      spyOn(effects['apiService'], 'getUser').and.returnValue(cold(request, null, error));
      actions$ = hot(actions, {
        a: action
      });

      // expect
      expect(effects.loadUsers$).toBeObservable(cold(expected, {
        a: failureAction
      }));
      expect(effects['apiService'].getUser).toHaveBeenCalledWith('myUser');
      expect(effects['apiService'].getUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('#loadSettings$', () => {
    it('should make a request', () => {
      // marbles
      const actions =  '-a-a';
      const request  = ' --(a|)';
      const expected = '---a';

      // data
      const userSetting = {
        subscription: 1
      } as UserSetting;
      const action = loadSettings();
      const successAction = loadSettingsSuccess({userSetting});

      // spies
      spyOn(effects['apiService'], 'getUserSettings').and.returnValue(cold(request, {
        a: userSetting
      }));
      actions$ = hot(actions, {
        a: action
      });

      // expect
      expect(effects.loadSettings$).toBeObservable(cold(expected, {
        a: successAction
      }));
      expect(effects['apiService'].getUserSettings).toHaveBeenCalledTimes(1);
    });
    it('should make a request', () => {
      // marbles
      const actions =  '-a';
      const request  = ' --#';
      const expected = '---a';

      // data
      const error = new Error('Failed to load');
      const action = loadSettings();
      const failureAction = loadSettingsFailure({error});

      // spies
      spyOn(effects['apiService'], 'getUserSettings').and.returnValue(cold(request, null, error));
      actions$ = hot(actions, {
        a: action
      });

      // expect
      expect(effects.loadSettings$).toBeObservable(cold(expected, {
        a: failureAction
      }));
      expect(effects['apiService'].getUserSettings).toHaveBeenCalledTimes(1);
    });
  });
});
