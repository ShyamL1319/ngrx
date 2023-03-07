import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActionsSubject } from "@ngrx/store";
import { exhaustMap, map } from "rxjs";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { loginStart, loginSucess } from "./auth.actions";

@Injectable()
export class AuthEffects { 
    constructor(private actions$: Actions, private authService:AuthService) { }
    login$ = createEffect(
        () => this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => { 
                return this.authService
                    .login(action.email, action.password)
                    .pipe(map(data => {
                        const user:User = this.authService.formatUser(data);
                        return loginSucess({ user });
                    }))
            })
        )
    )
}