import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  constructor(private userAuth: UserAuthenticationService) {}

  logout() {
    this.userAuth.userLogOut();
  }
}
