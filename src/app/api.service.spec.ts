import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { instance, mock } from 'ts-mockito';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: instance(mock(HttpClient))
        }
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUser', () => {
    it('should call .call()', () => {
      // marbles
      const call     = '-a';
      const expected = '-a';

      // spies
      spyOn(service as any, 'call').and.returnValue(cold(call));

      // expect
      expect(service.getUser('username')).toBeObservable(cold(expected));
      expect(service['call']).toHaveBeenCalledTimes(1);
      expect(service['call']).toHaveBeenCalledWith({
        endpoint: 'getUser',
        body: { username: 'username' }
      });
    });
  });

  describe('#getUserSettings', () => {
    it('should call .call()', () => {
      // marbles
      const call     = '-a';
      const expected = '-a';

      // spies
      spyOn(service as any, 'call').and.returnValue(cold(call));

      // expect
      expect(service.getUserSettings()).toBeObservable(cold(expected));
      expect(service['call']).toHaveBeenCalledTimes(1);
      expect(service['call']).toHaveBeenCalledWith({
        endpoint: 'getUser',
      });
    });
  });

  describe('#loading$', () => {
    it('should return loading status', () => {
      // marbles
      const endpoints = '--a--b';
      const expected =  '--f--t';

      // spies
      spyOn(service['loadingEndpoints'], 'asObservable').and.returnValue(hot(endpoints, {
        a: [],
        b: ['endpoint1', 'endpoint2']
      }));

      // expect
      expect(service.loading$).toBeObservable(cold(expected, {
        t: true,
        f: false
      }));
    });
  });

  describe('#loadingEndpoints$', () => {
    it('should return loading status', () => {
      // marbles
      const endpoints = '--a--b';
      const expected =  '--f--t';

      // spies
      spyOn(service['loadingEndpoints'], 'asObservable').and.returnValue(hot(endpoints, {
        a: [],
        b: ['endpoint1', 'endpoint2']
      }));

      // expect
      expect(service.loadingEndpoints$(['endpoint1'])).toBeObservable(cold(expected, {
        t: true,
        f: false
      }));
    });
    it('should return loading status when multiple endpoints are passed in', () => {
      // marbles
      const endpoints = '--a--b';
      const expected =  '--f--t';

      // spies
      spyOn(service['loadingEndpoints'], 'asObservable').and.returnValue(hot(endpoints, {
        a: [],
        b: ['endpoint1', 'endpoint2']
      }));

      // expect
      expect(service.loadingEndpoints$(['endpoint1', 'endpoint2'])).toBeObservable(cold(expected, {
        t: true,
        f: false
      }));
    });
    it('should return false loading status when non matching endpoints are passed in', () => {
      // marbles
      const endpoints = '--a--b';
      const expected =  '--f--f';

      // spies
      spyOn(service['loadingEndpoints'], 'asObservable').and.returnValue(hot(endpoints, {
        a: [],
        b: ['endpoint1', 'endpoint2']
      }));

      // expect
      expect(service.loadingEndpoints$(['endpoint100'])).toBeObservable(cold(expected, {
        t: true,
        f: false
      }));
    });
  });

  describe('#call', () => {
    it('should make an http post request', () => {
      // marbles
      const request  = '------a|';
      const expected = '------a|';

      // data
      const callResponse = {
        foo: 'bar'
      };
      const options = {
        endpoint: 'getUser'
      };

      // spies
      spyOn(service['http'], 'post').and.returnValue(hot(request, {
        a: callResponse
      }));
      spyOn(service as any, 'startLoading');
      spyOn(service as any, 'stopLoading');

      // expect
      expect(service['call'](options)).toBeObservable(cold(expected, {
        a: callResponse
      }));
      expect(service['http'].post).toHaveBeenCalledTimes(1);
      expect(service['http'].post).toHaveBeenCalledWith(
        'http://localapi:1234' + options.endpoint,
        null
      );
      expect(service['startLoading']).toHaveBeenCalledTimes(1);
      expect(service['startLoading']).toHaveBeenCalledWith(options.endpoint);
      expect(service['startLoading']).toHaveBeenCalledBefore(service['stopLoading']);
      expect(service['stopLoading']).toHaveBeenCalledTimes(1);
      expect(service['stopLoading']).toHaveBeenCalledWith(options.endpoint);
    });
  });

  describe('#startLoading', () => {
    it('should append endpoint to loading behavior subject', () => {
      // data
      const endpoints = ['endpoint1'];

      // spies
      service['loadingEndpoints'].next(endpoints);

      // expect
      service['startLoading']('endpoint2');
      expect(service['loadingEndpoints'].getValue()).toEqual(['endpoint1', 'endpoint2']);
    });
  });

  describe('#stopLoading', () => {
    it('should remove endpoint to loading behavior subject', () => {
      // data
      const endpoints = ['endpoint1', 'endpoint2'];

      // spies
      service['loadingEndpoints'].next(endpoints);

      // expect
      service['stopLoading']('endpoint2');
      expect(service['loadingEndpoints'].getValue()).toEqual(['endpoint1']);
    });
  });

});
