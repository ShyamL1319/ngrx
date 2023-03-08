import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoading } from 'src/app/store/shared/shared.actions';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private store:Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(setLoading({status:true}))
    return next.handle(request).pipe(
      finalize(() => this.store.dispatch(setLoading({status:false}))),
     );;
  }
}
