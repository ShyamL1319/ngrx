import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoading } from 'src/app/store/shared/shared.actions';
import { loginStart } from '../store/auth.actions';
import { AuthState } from '../store/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb:FormBuilder, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  onLogin() { 
    if (this.loginForm.invalid) return;
    const loginDetails = {
      email: this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(loginStart(loginDetails));
  }

}
