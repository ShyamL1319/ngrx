import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  timeoutInterval: any;
  constructor(private http: HttpClient) { }
  

  login(email: string, password: string):Observable<AuthResponse> { 
    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      {email,password, returnSecureToken:true}
    );
  }

  signup(email:string, password:string):Observable<AuthResponse> { 
    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      {email,password, returnSecureToken:true})
  }

  formatUser(data: AuthResponse) { 
    const expirationDate = new Date(new Date().getTime()+ (+data.expiresIn * 1000));
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  getErrorMessage(message: string) { 
    switch (message) { 
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Invalid password';
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account.';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'Too many attempts. Try again later!'
      default:
        return 'Unknow error occured. Please try again!'
    }
  }

  setUserInLocalStorage(user:User) { 
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user:User) { 
    const todayDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todayDate;
    this.timeoutInterval =  setTimeout(() => {
      //:TODO logout functionality or get the refresh token
     }, timeInterval);
  }
    getUserFromLocalStorage() {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) { 
        const userData = JSON.parse(userDataString);
        const expirationDate = new Date(userData.expirationDate);
        const user = new User(userData.email, userData.token, userData.localid, expirationDate);
        this.runTimeoutInterval(user)
        return user;
      }
      return null;
  }
}
