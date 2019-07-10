import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AppCustomPreloading implements PreloadingStrategy {
  preloadedModules: string[] = [];
  preload(route: Route, preload: () => Observable<any>): Observable<any> {
    // return route.data && route.data.preload ? preload() : of(null);
    if (route.data && route.data.preload) {
      this.preloadedModules.push(route.path);
      // console.log('Preloaded: ' + route.path);
      return preload();
    } else {
      return of(null);
    }
  }

}
