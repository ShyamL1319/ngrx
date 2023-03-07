import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoading } from 'src/app/store/shared/shared.actions';
import { signupStart } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb:FormBuilder, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSignup() { 
    if (this.signupForm.invalid) return;
    const signupData = {
      email: this.signupForm.value.email,
      password:this.signupForm.value.password,
    }

    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(signupStart(signupData));
  }

}
