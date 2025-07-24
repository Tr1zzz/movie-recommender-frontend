import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  id: number;
  email: string;
  display_name: string;
  role: string;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface RegisterResponse {
  id: number;
  email: string;
  display_name: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://127.0.0.1:8000';
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {}

  /** Login via email/password */
  login(email: string, password: string): Observable<LoginResponse> {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post<LoginResponse>(
        `${this.api}/auth/login`,
        body.toString(),
        { headers }
      )
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.access_token);
          this._isLoggedIn.next(true);
        })
      );
  }

  /** Register a new user */
  register(
    display_name: string,
    email: string,
    password: string
  ): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.api}/auth/register`,
      { display_name, email, password }
    );
  }

  /** Retrieve the current user’s profile */
  getProfile(): Observable<UserProfile> {
    const token = this.token;
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.http.get<UserProfile>(
      `${this.api}/auth/me`,
      { headers }
    );
  }

  /** Log out */
  logout(): void {
    localStorage.removeItem('token');
    this._isLoggedIn.next(false);
  }

  /** Google Login: send id_token to the backend */
  googleLogin(idToken: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.api}/auth/google`,
        { token: idToken }
      )
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.access_token);
          this._isLoggedIn.next(true);
        })
      );
  }

  /** Current auth token */
  get token(): string | null {
    return localStorage.getItem('token');
  }
}
