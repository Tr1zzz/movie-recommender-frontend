import { Component, OnInit } from '@angular/core';
import { AuthService, UserProfile } from '../../../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name = '';
  email = '';
  role = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Call our new endpoint instead of manually decoding
    this.auth.getProfile().subscribe({
      next: (profile: UserProfile) => {
        this.name = profile.display_name;
        this.email = profile.email;
        this.role = profile.role;
      },
      error: () => {
        // if token invalid, redirect to login
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}