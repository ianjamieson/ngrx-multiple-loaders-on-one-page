import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

export interface User {
  email: string;
  username: string;
}

export interface UserSetting {
  subscription: number;
}

export interface ApiServiceCallOptions {
  body?: object;
  endpoint: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private loadingEndpoints = new BehaviorSubject<Array<string>>([]);

  constructor(
    private http: HttpClient
  ) { }

  public getUser(username: string): Observable<User> {
    return this.call({
      endpoint: 'getUser',
      body: { username }
    });
  }

  public getUserSettings(): Observable<UserSetting> {
    return this.call({
      endpoint: 'getUser',
    });
  }

  public get loading$(): Observable<boolean> {
    return this.loadingEndpoints.asObservable().pipe(map((loadingEndpoints) => loadingEndpoints.length > 0));
  }

  public loadingEndpoints$(endpoints: Array<string>): Observable<boolean> {
    return this.loadingEndpoints.asObservable().pipe(
      map((loadingEndpoints) => _.filter(loadingEndpoints, (loadingEndpoint) => _.includes(endpoints, loadingEndpoint))),
      map((loadingEndpoints) => loadingEndpoints.length > 0)
    );
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
