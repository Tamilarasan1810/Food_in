import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  userDetails: any;
  ngOnInit() {
    this.userDetails = this.userAuth.getUserDetails();
    this.userAuth.userDetailsChanged.subscribe((response) => {
      this.userDetails = response;
    });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  constructor(private userAuth: UserAuthenticationService) {}

  logout() {
    this.userAuth.userLogOut();
  }
}
