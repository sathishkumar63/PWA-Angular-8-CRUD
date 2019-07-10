import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationCancel, Event, NavigationEnd, ActivatedRoute, NavigationError, NavigationStart, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string;
  basePath: any;
  responseData: any;
  namePattern = '[a-zA-Z ]*';
  emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  CACHABLE_URL = {
    userLists: 'users'
  };

  constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router, public snackBar: MatSnackBar) {
    this.apiUrl = environment.apiUrl;
  }
  public openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [className]
    });
  }
  // GET Method
  public getDataX(path): Observable<any> {
    return this.http.get(this.apiUrl + path).pipe(
      map((result: any) => result),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  // POST Method
  public postDataX(credentials, type): Observable<any> {
    return this.http.post(this.apiUrl + type, credentials).pipe(
      map((result: any) => result),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  // PUT Method
  public putDataX(credentials, type): Observable<any> {
    return this.http.put(this.apiUrl + type, credentials).pipe(
      map((result: any) => result),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  // DELETE Method
  public deleteDataX(path): Observable<any> {
    return this.http.delete(this.apiUrl + path).pipe(
      map((result: any) => result),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
