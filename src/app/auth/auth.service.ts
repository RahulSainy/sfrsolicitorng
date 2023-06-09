import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { AuthData } from './user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token!: string;
  private tokenTimer: any;
  private userId!: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

 


  createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    contact: string,
    agree:boolean,
    approve:boolean
  ) {
    const authData: AuthData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      contact: contact,
      agree:agree,
      approve:approve
    };
    console.log('Auth Data: ', authData);
    this.http.post('http://localhost:3000/api/user/signup', authData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
        console.log(response);
      }
      // error =>{
      //   this.authStatusListener.next(false)
      // }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = {
      firstName: '',
      lastName: '',
      email: email,
      password: password,
      contact: '',
      agree:true,
      approve:true
    };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'http://localhost:3000/api/user/login',
        // BACKEND_URL + "/login",
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/profileUpdate']);
          }
        }
        // error=>{
        //   this.authStatusListener.next(false)
        // }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId!;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null!;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null!;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }

  // updateFrom(formData: any): Observable<any> {
  //   console.log("From serviec",formData)
  //   return this.http.post<any>('http://localhost:3000/api/user/updateProfile', formData);
  // }
  
  updateFrom(formData: any): Observable<any> {
    console.log('From service', formData);
    return this.http.post<any>('http://localhost:3000/api/user/updateProfile', formData)
      .pipe(
        catchError(error => {
          console.error('updateFrom error', error);
          return throwError(error);
        })
      );

  }
 
}
