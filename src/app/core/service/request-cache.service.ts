import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 30000;

@Injectable()
export class RequestCacheService {

  public cache = new Map<string, any>();

  public get(request: HttpRequest<any>): HttpResponse<any> | undefined {
    // console.log(request);
    const url = request.urlWithParams;
    const cached = this.cache.get(url);
    if (!cached) {
      return undefined;
    }
    // console.log(cached);
    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : 'Not expired';
    if (isExpired) {
      this.cache.delete(url);
    }
    // console.warn(expired);
    return cached.response;
  }

  public put(request: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = request.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);
    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
