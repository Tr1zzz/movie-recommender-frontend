import { Component } from '@angular/core';
import { AuthService } from '../../api/auth.service';
import { ModalService } from '../global/modal/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private modal: ModalService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    this.auth
      .register(this.name, this.email, this.password)
      .subscribe({
        next: () => {
          this.modal.close();            // close the modal
          this.router.navigate(['/login']); // navigate to the login page
        },
        error: () => {
          this.error = 'Registration failed';
        },
      });
  }
}
