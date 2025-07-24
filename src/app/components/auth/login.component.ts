// src/app/components/auth/login.component.ts
import { Component, AfterViewInit, NgZone } from '@angular/core';
import { AuthService } from '../../api/auth.service';
import { ModalService } from '../global/modal/modal.service';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private modal: ModalService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  onSubmit(): void {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.modal.close();
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.error = 'Incorrect email or password';
      },
    });
  }

  ngAfterViewInit(): void {
    // Initialize Google Identity Services
    window.google.accounts.id.initialize({
      client_id: '43948168528-smprs8qavl1381351sp9j6j7s18oj68u.apps.googleusercontent.com',  // ← replace with your Client ID
      callback: (response: any) => this.handleGoogleCredential(response),
    });

    // Render the Google Sign-In button
    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }
    );
  }

  private handleGoogleCredential(response: { credential: string }) {
    // Send the ID token to the backend
    this.auth
      .googleLogin(response.credential)
      .pipe(
        tap(() => {
          // Navigate within Angular's zone
          this.ngZone.run(() => {
            this.modal.close();
            this.router.navigate(['/profile']);
          });
        }),
        catchError(err => {
          console.error(err);
          this.error = 'Failed to sign in with Google';
          return of(null);
        })
      )
      .subscribe();
  }

  openRegister(): void {
    this.modal.open(RegisterComponent);
  }
}
