import { Component } from '@angular/core';
import { AuthService } from '../../api/auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <h2>Welcome, {{ name }}</h2>
    <p>Email: {{ email }}</p>
  `
})
export class ProfileComponent {
  name = '';
  email = '';

  constructor(private auth: AuthService) {
    const token = this.auth.token;
    if (token) {
      const data: any = JSON.parse(atob(token.split('.')[1]));
      this.name = data.display_name;
      this.email = data.email;
    }
  }
}