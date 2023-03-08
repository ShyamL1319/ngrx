import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { exhaustMap, Observable, of, map } from 'rxjs';
import { isAuthenticated } from 'src/app/auth/store/auth.selector';
import { AppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store:Store<AppState>, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(isAuthenticated)
      .pipe(
        map(authenticate => { 
          if (!authenticate) { 
            return this.router.createUrlTree(['auth']);
          }
          return true;
        })
      )

  }
  
}
