import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    let changedReq;
    // console.log("token intersector: " + token)
    if (req.headers.get('skip')) {
      changedReq = req;
    } else if (token) {
      // console.log("token intersector 2: " + token)
      changedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });

    } else {
      changedReq = req;
    }
    return next.handle(changedReq).pipe(
      // finalize(() => { this.loader.close(); }),
      catchError((err: any) => {
        if (err && err?.status === 440) {

        }
        else if (err && err?.status === 401 || err?.status === 403) {

        }
        else if (err && err?.status === 500) {
          return throwError(err);
        }
        else {
          return throwError(err);
        }
        return Observable.throw(err);
      })
    );
  }
}

