import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { AUTH_SATATE_NAME } from './store/auth.selector';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo : 'login', pathMatch:'full'},
      { path: 'login', component: LoginComponent }
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_SATATE_NAME,authReducer),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
