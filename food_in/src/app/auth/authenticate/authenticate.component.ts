import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserAuthenticationService } from 'src/app/user-authentication.service';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent {
  constructor(
    private userAuth: UserAuthenticationService,
    private http: HttpClient,
    private router: Router
  ) {}

  // signIn() {
  //   console.log('Hey');
  //   this.userAuth.userSignin().subscribe(
  //     (response) => {
  //       console.log('user signed In successfully:', response);
  //       // Handle the success response here (e.g., show a success message to the user)
  //     },
  //     (error) => {
  //       console.log('Error inserting Order: ', error);
  //     }
  //   );
  // }
  // signIn() {
  //   this.userAuth.userSignUp('tamil', 'king', 9293948567);
  // }
  // logIn() {
  //   this.userAuth.userLoginIn('tamil', 'king');
  // }

  //
  showSignUpForm = false;
  showSignUp() {
    this.showSignUpForm = !this.showSignUpForm;
  }
  invalidLoginId = false;
  userLogin(userLoginForm: NgForm) {
    this.userAuth
      .userLoginIn(userLoginForm.value.username, userLoginForm.value.password)
      .subscribe(
        (response) => {
          if (response.status == 'yes') {
            this.invalidLoginId = false;
            this.userAuth.saveUserCredentials(
              userLoginForm.value.username,
              8400000
            );
            this.router.navigate(['']);
          } else {
            this.invalidLoginId = true;
          }
        },
        (error) => {
          console.log('invalid username or password');
        }
      );
  }
  userSignIn(userSignUpForm: NgForm) {
    // console.log(userSignUpForm.value);
    this.userAuth
      .userSignUp(
        userSignUpForm.value.username,
        userSignUpForm.value.password,
        userSignUpForm.value.mobileNumber
      )
      .subscribe(
        (response) => {
          console.log('auth component ts: ', response);
          if (response.status == 'yes') {
            console.log('sessions login ');
            this.userAuth
              .userLoginIn(
                userSignUpForm.value.username,
                userSignUpForm.value.password
              )
              .subscribe(
                (response) => {
                  if (response.status == 'yes') {
                    this.invalidLoginId = false;
                    this.userAuth.saveUserCredentials(
                      userSignUpForm.value.username,
                      8400000
                    );
                    this.router.navigate(['']);
                  } else {
                    this.invalidLoginId = true;
                  }
                },
                (error) => {
                  console.log('invalid username or password');
                }
              );
            // this.router.navigate(['']);
          } else {
            // this.invalidLoginId = true;
            console.log('invalid Sign In');
          }
        },
        (error) => {
          console.log('invalid Sign In');
        }
      );
  }

  ngOnInit() {
    if (this.userAuth.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }
  // signInUrl = 'http://localhost:3000/api/signIn';
  // signUpUrl = 'http://localhost:3000/api/signUp';
  // encryptUserData(data: any, secretKey: string): string {
  //   const encryptedData = CryptoJS.AES.encrypt(
  //     JSON.stringify(data),
  //     secretKey
  //   ).toString();
  //   return encryptedData;
  // }
  // userSignIn(username: string, password: string) {
  //   const userDetails = { username, password };
  //   const encryptedData = this.encryptUserData(userDetails, 'your-secret-key');
  //   this.http
  //     .post<any>(this.signInUrl, { data: encryptedData })
  //     .subscribe((response) => {
  //       // Handle the response here
  //     });
  // }

  // userSignUp(username: string, password: string) {
  //   const userDetails = { username, password };
  //   const encryptedData = this.encryptUserData(userDetails, 'your-secret-key');
  //   this.http
  //     .post<any>(this.signUpUrl, { data: encryptedData })
  //     .subscribe((response) => {
  //       // Handle the response here
  //     });
  // }
}
