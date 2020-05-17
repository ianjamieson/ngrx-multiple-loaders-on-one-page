import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { loadSettings, loadSettingsFailure, loadSettingsSuccess } from './setting.actions';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';



@Injectable()
export class UserEffects {

  public loadUsers$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      exhaustMap(() => {
        return this.apiService.getUser('myUser').pipe(
          map((user) => loadUsersSuccess({user})),
          catchError((error) => {
            return of(loadUsersFailure({error}));
          })
        );
      })
    );
  });

  public loadSettings$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSettings),
      exhaustMap(() => {
        return this.apiService.getUserSettings().pipe(
          map((userSetting) => loadSettingsSuccess({userSetting})),
          catchError((error) => {
            return of(loadSettingsFailure({error}));
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

}
