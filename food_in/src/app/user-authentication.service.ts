import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
// const jwt = require("jsonwebtoken");

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  constructor(private http: HttpClient) {}

  // userSignin(): Observable<any> {
  //   const userDetails = [
  //     { userName: 'testing', password: 'testing', mobilenumber: 9392847263 },
  //   ];
  //   console.log('test');
  //   const signInUrl = `http://localhost:3000/api/signIn`;
  //   return this.http.post<any>(signInUrl, { userDetails });
  // }

  //

  encryptUserData(data: any, secretKey: string): string {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    return encryptedData;
  }

  // userLoginIn(username: string, password: string) {          --------> userlogin for session
  //   const loginInUrl = `http://localhost:3000/api/logIn`;
  //   const encUserPassword = this.encryptUserData(password, 'MySecretKey');
  //   const userDetails = { username, encUserPassword };
  //   return this.http.post<any>(loginInUrl, { data: userDetails });
  // }
  userSignUp(username: string, password: string, mobileNumber: number) {
    const signUpUrl = `http://localhost:3000/api/signIn`;
    const encUserPassword = this.encryptUserData(password, 'MySecretKey');
    const userDetails = { username, encUserPassword, mobileNumber };
    // console.log(userDetails);
    return this.http.post<any>(signUpUrl, { data: userDetails });
  }

  // isLoggedIn(): boolean {   -------->for session storage
  //   const userCredentials = sessionStorage.getItem('userCredentials');
  //   if (userCredentials) {
  //     const credentials = JSON.parse(userCredentials);
  //     const currentTime = new Date().getTime();
  //     const sessionExpiry = credentials.sessionExpiry;
  //     if (currentTime < sessionExpiry) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  saveUserCredentials(username: string, sessionDuration: number): void {
    const currentTime = new Date().getTime();
    const sessionExpiry = currentTime + sessionDuration;
    const credentials = { username, sessionExpiry };
    sessionStorage.setItem('userCredentials', JSON.stringify(credentials));
  }

  //////// the below code is for implementing tokens

  private readonly SESSION_STORAGE_KEY = 'MySecretSessionStorageKey';

  private saveToken(token: string): void {
    localStorage.setItem(this.SESSION_STORAGE_KEY, token);
  }
  private getToken(): string | null {
    return localStorage.getItem(this.SESSION_STORAGE_KEY);
  }
  private removeToken(): void {
    localStorage.removeItem(this.SESSION_STORAGE_KEY);
  }

  userLoginIn(username: string, password: string) {
    const loginInUrl = `http://localhost:3000/api/logIn`;
    const encUserPassword = this.encryptUserData(password, 'MySecretKey');
    const userDetails = { username, encUserPassword };
    return this.http.post<any>(loginInUrl, { data: userDetails }).pipe(
      map((response) => {
        console.log('auth service ts: ', response.userId);
        if (response.token) {
          this.saveToken(response.token);
        }
        return response;
      })
    );
  }
  userLogOut(): void {
    this.removeToken();
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        this.userLogOut();
        return true;
      }
      return false;
    } catch (error) {
      this.userLogOut();
      return true;
    }
  }

  //^^^^^^^^ the above code is for implementing tokens

  // userSignUp(username: string, password: string, mobileNumber: number) {
  //   const userDetails = { username, password, mobileNumber };
  //   const encryptedData = this.encryptUserData(userDetails, 'your-secret-key');
  //   this.http.post<any>(this.signUpUrl, { data: encryptedData }).subscribe((response) => {
  //     // Handle the response here
  //   });
  // }

  //
}
