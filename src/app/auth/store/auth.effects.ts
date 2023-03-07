import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrosMessage, setLoading } from "src/app/store/shared/shared.actions";
import { loginStart, loginSucess } from "./auth.actions";

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
                            this.store.dispatch(setLoading({ status: false }));
                            this.store.dispatch(setErrosMessage({ message: '' }));
                            const user:User = this.authService.formatUser(data);
                            return loginSucess({ user });
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
    loginRedirect$ = createEffect(
        () => this.actions$.pipe(
            ofType(loginSucess),
            tap((action) => { 
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false });
}