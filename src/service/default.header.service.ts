import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

function getToken(): any {
  return localStorage.getItem('access_token') || '';
}

@Injectable()
export class CustomHttpService extends Http {
  constructor (backend: XHRBackend, options: RequestOptions) {
    options.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    });
    super(backend, options);
  }

  // its like interceptor, calls by each methods internally like get, post, put, delete etc
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      options.headers.set('Content-Type', 'application/json');
      options.headers.set('Authorization', `Bearer ${getToken()}`);
    } else {
      url.headers.set('Content-Type', 'application/json');
      url.headers.set('Authorization', `Bearer ${getToken()}`);
    }
    return super.request(url, options);
  }
}
