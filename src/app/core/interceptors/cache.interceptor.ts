import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
import { RequestCacheService } from '../service/request-cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(public data: ApiService, private cache: RequestCacheService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.warn('CacheInterceptor');

    // continue if not cachable.
    if (!this.isCachable(request)) {
      return next.handle(request);
    }
    const cachedUrlResponse: HttpResponse<any> = this.cache.get(request);
    return cachedUrlResponse ? of(new HttpResponse<any>(cachedUrlResponse)) : this.sendRequest(request, next, this.cache);
  }

  public sendRequest(request: HttpRequest<any>, next: HttpHandler, cache: RequestCacheService): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(request, event);
        }
      })
    );
  }

  /** Is this request cachable? */
  public isCachable(request: HttpRequest<any>) {
    // console.log(request);
    if ((request.method === 'GET') && (request.url.indexOf(this.data.apiUrl) > -1)) {
      for (const api in this.data.CACHABLE_URL) {
        if (request.url.includes((this.data.CACHABLE_URL[api]))) {
          return true;
        } else { return false; }
      }
    } else { return false; }
  }

}
