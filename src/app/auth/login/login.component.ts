import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/models/auth.model';
import { AppState } from 'src/app/store/app.state';

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
    const loginDetails: Login = {
      email: this.loginForm.value.email,
      password:this.loginForm.value.password
    }
  }

}
