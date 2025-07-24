import {
  Component,
  AfterViewInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import * as jwtDecodeModule from 'jwt-decode';
import { AuthService } from '../../../api/auth.service';

interface TokenPayload {
  user_id: number;
  email?: string;
  display_name?: string;
  role?: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('input') inputElement!: ElementRef;

  searchVisible = false;
  query = '';

  isLoggedIn = false;
  userName: string | null = null;

  constructor(private router: Router, public auth: AuthService) {
    // subscribe to login state
    this.auth.isLoggedIn$.subscribe((logged) => {
      this.isLoggedIn = logged;
      this.updateUserName();
    });
  }

  ngAfterViewInit(): void {
    if (this.searchVisible) {
      this.focusInput();
    }
  }

  toggleSearch(): void {
    this.searchVisible = !this.searchVisible;
    if (this.searchVisible) {
      this.focusInput();
    }
  }

  private focusInput(): void {
    setTimeout(() => {
      if (this.inputElement?.nativeElement) {
        this.inputElement.nativeElement.focus();
        this.inputElement.nativeElement.select();
      }
    }, 100);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.query.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.query.trim() },
      });
    } else {
      this.closeSearch();
    }
  }

  closeSearch(): void {
    this.searchVisible = false;
    this.query = '';
    this.router.navigate(['/']);
  }

  goToRoute(): void {
    if (this.query.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.query.trim() },
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.query = '';
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      this.searchVisible &&
      !target.closest('.navbar') &&
      !target.closest('.form')
    ) {
      this.closeSearch();
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private updateUserName(): void {
    const token = this.auth.token;
    if (token) {
      try {
        const jwt_decode =
          (jwtDecodeModule as any).default ?? (jwtDecodeModule as any);
        const payload = jwt_decode(token) as TokenPayload;
        this.userName = payload.display_name ?? payload.email ?? null;
      } catch {
        this.userName = null;
      }
    } else {
      this.userName = null;
    }
  }
}
