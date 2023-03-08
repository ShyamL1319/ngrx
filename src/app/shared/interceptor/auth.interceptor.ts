import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { exhaustMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getToken } from 'src/app/auth/store/auth.selector';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store:Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(getToken).pipe(
      exhaustMap((token) => {
        if(!token) { 
          return next.handle(request)
        }

        let modifiedReq = request.clone({
          params: request.params.append('auth', token)
        })

        return next.handle(modifiedReq)
      })
    )
  }
}
