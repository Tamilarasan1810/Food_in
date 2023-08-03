import { Component } from '@angular/core';
import { UserAuthenticationService } from 'src/app/user-authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent {
  constructor(private userAuth: UserAuthenticationService) {}

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
  signIn() {
    this.userAuth.userSignUp('tamil', 'king', 9293948567);
  }
  logIn() {
    this.userAuth.userLoginIn('tamil', 'king');
  }
}
