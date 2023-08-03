import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
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

  userLoginIn(username: string, password: string) {
    const loginInUrl = `http://localhost:3000/api/logIn`;
    //const encUserName = this.encryptUserData(username, 'your-secret-key');
    const encUserPassword = this.encryptUserData(password, 'MySecretKey');
    const userDetails = { username, encUserPassword };
    console.log(userDetails);
    this.http
      .post<any>(loginInUrl, { data: userDetails })
      .subscribe((response) => {
        console.log(response);
      });
  }
  userSignUp(username: string, password: string, mobileNumber: number) {
    const signUpUrl = `http://localhost:3000/api/signIn`;
    const encUserPassword = this.encryptUserData(password, 'MySecretKey');
    const userDetails = { username, encUserPassword, mobileNumber };
    console.log(userDetails);
    this.http
      .post<any>(signUpUrl, { data: userDetails })
      .subscribe((response) => {
        console.log(response);
      });
  }
  // userSignUp(username: string, password: string, mobileNumber: number) {
  //   const userDetails = { username, password, mobileNumber };
  //   const encryptedData = this.encryptUserData(userDetails, 'your-secret-key');
  //   this.http.post<any>(this.signUpUrl, { data: encryptedData }).subscribe((response) => {
  //     // Handle the response here
  //   });
  // }

  //
}
