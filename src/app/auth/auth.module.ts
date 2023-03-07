import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo : 'login', pathMatch:'full'},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([]),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
