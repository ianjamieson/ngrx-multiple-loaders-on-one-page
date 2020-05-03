import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface User {
  email: string;
  username: string;
}

export interface UserSetting {
  subscription: number;
}

export interface ApiServiceCallOptions {
  endpoint: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private loadingEndpoints = new BehaviorSubject<Array<string>>([]);
  public loading$: Observable<boolean>;

  constructor(
    private http: HttpClient
  ) { }

  public getUser(username: string): Observable<User> {

  }

  public getUserSettings(): Observable<UserSetting> {

  }

  public loadingEndpoints$(): Observable<boolean> {

  }

  private call(options: ApiServiceCallOptions): Observable<any> {
    this.startLoading(options.endpoint);

    return this.http.post(
      'http://localapi:1234' + options.endpoint,
      null
    ).pipe(
      finalize(() => this.stopLoading(options.endpoint))
    );
  }

  private startLoading(endpoint: string): void {
    this.loadingEndpoints.next(_.concat(this.loadingEndpoints.getValue(), endpoint));
  }

  private stopLoading(endpoint: string): void {
    this.loadingEndpoints.next(_.filter(this.loadingEndpoints.getValue(), (currentEndpoint) => currentEndpoint !== endpoint));
  }
}
