import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAuthServiceService {
  beareToken: any = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  HttpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.beareToken,
    })
  };

  constructor(
    private httpClient: HttpClient,
  ) { 
    this.beareToken = sessionStorage.getItem('token');
  }

  post(req: any, urlRout: string): Observable<any> {
    const URL = `${environment?.baseurl}${urlRout}`;
    return this.httpClient.post<Response>(URL, req, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  get(urlRout: string): Observable<any> {
    this.beareToken = sessionStorage.getItem('token');
    const URL = `${environment?.baseurl}${urlRout}`;
    return this.httpClient.get<Response>(URL, this.HttpOption)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }
}
