import { afterNextRender, Injectable, OnInit } from '@angular/core';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';
import { JWTToken, JWTTokenResponse, User } from '../types';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  private access_token: string | null = null;
  errorMessage: string | null = null;

  constructor(private data: DatabaseService, private router: Router) {
    afterNextRender(() => {
      const storedData = sessionStorage.getItem('access_token');
      if (storedData) {
        try {
          this.access_token = storedData;
        } catch (err) {}
      }
    });
  }
  ngOnInit(): void {}

  async login(username: string, password: string, func: () => void) {
    this.data.loginUser(username, password).subscribe({
      next: (userToken: JWTToken) => {
        this.access_token = userToken.access_token;
        sessionStorage.setItem('access_token', userToken.access_token);
        console.log('Login successful:', userToken);
        this.fetchUser();
        this.errorMessage = null;
        this.router.navigate(['/']).then(() => {
          func();
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = "Username and password don't match";
        func();
      },
    });
  }

  async register(
    credentials: {
      username: string;
      password: string;
      email: string;
      name: string;
      surname: string;
      hasAdmin: boolean;
    },
    func: () => void
  ) {
    this.data.addUser(credentials as User).subscribe({
      next: (userToken: JWTToken) => {
        this.access_token = userToken.access_token;
        sessionStorage.setItem('access_token', userToken.access_token);
        sessionStorage.setItem('hasAdmin', credentials.hasAdmin ? '1' : '0');
        console.log('Registration successful:', userToken);
        this.errorMessage = null;
        this.router.navigate(['/']).then(() => {
          func();
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.errorMessage = 'Username already exists!';
        func();
      },
    });
  }

  fetchUser() {
    this.getUserFromStorage().subscribe((user) => {
      sessionStorage.setItem('hasAdmin', user?.hasAdmin ? '1' : '0');
    });
  }

  getUserFromStorage() {
    if (typeof Storage !== 'undefined') {
      this.access_token = sessionStorage.getItem('access_token');
      console.log('access', this.access_token);
      if (this.access_token) {
        return this.data.getUserByToken(this.access_token).pipe(
          map((response: JWTTokenResponse) => {
            console.log(response.user);
            return response.user;
          }),
          catchError((error) => {
            console.error('Failed to fetch user', error);
            return of(null);
          })
        );
      } else {
        return of(null);
      }
    } else {
      return of(null);
    }
  }

  getTokenFromStorage() {
    if (typeof Storage !== 'undefined') {
      this.access_token = sessionStorage.getItem('access_token');
    }
    return this.access_token;
  }
}
