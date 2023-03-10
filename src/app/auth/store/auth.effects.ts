import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrosMessage, setLoading } from "src/app/store/shared/shared.actions";
import { autoLogin, loginStart, loginSucess, logout, signupStart, signupSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects { 
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router,
    ) { }
    login$ = createEffect(
        () => this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => { 
                return this.authService
                    .login(action.email, action.password)
                    .pipe(
                        map(data => {
                            this.store.dispatch(setErrosMessage({ message: '' }));
                            const user: User = this.authService.formatUser(data);
                            this.authService.setUserInLocalStorage(user);
                            return loginSucess({ user , redirect: true});
                        }),
                        catchError((errResp) => { 
                            this.store.dispatch(setLoading({status:false}))
                            const errMessage = this.authService.getErrorMessage(errResp.error.error.message)
                            return of(setErrosMessage({message:errMessage}));
                        })
                    )
            })
        )
    )
    authRedirect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loginSucess,signupSuccess),
            tap((action) => { 
                this.store.dispatch(setErrosMessage({ message: '' }));                
                if (action.redirect) { 
                this.router.navigate(['/']);
                }
            })
        ),
        { dispatch: false });
    
    signup$ = createEffect(
        () => this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authService
                    .signup(action.email, action.password)
                    .pipe(
                        map(data => { 
                            this.store.dispatch(setErrosMessage({ message: '' }));
                            const user:User = this.authService.formatUser(data);
                            this.authService.setUserInLocalStorage(user);
                            return signupSuccess({ user , redirect:true});
                        }),
                        catchError((errResp) => {
                            this.store.dispatch(setLoading({status:false}))
                            const errMessage = this.authService.getErrorMessage(errResp.error.error.message)
                            return of(setErrosMessage({message:errMessage}));                            
                        })
                    )
            })
        )
    );

    autoLogin$ = createEffect(() => this.actions$.pipe(
        ofType(autoLogin),
        mergeMap((action) => {
            const user = this.authService.getUserFromLocalStorage();
            return of(loginSucess({ user,redirect:false }));
        })
    ));


    logout$ = createEffect(() => { 
        return this.actions$.pipe(
            ofType(logout),
            map((action) => { 
                this.authService.logout();
                this.router.navigate(['auth'])
            })
        )
    }, {dispatch:false})
}