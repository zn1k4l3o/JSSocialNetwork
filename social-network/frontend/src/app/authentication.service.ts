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

  constructor(private data: DatabaseService, private router: Router) {
    afterNextRender(() => {
      const storedData = localStorage.getItem('access_token');
      if (storedData) {
        try {
          this.access_token = storedData;
        } catch (err) {}
      }
    });
  }
  ngOnInit(): void {}

  async login(username: string, password: string) {
    this.data.loginUser(username, password).subscribe({
      next: (userToken: JWTToken) => {
        this.access_token = userToken.access_token;
        localStorage.setItem('access_token', userToken.access_token);
        console.log('Login successful:', userToken);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        // Display error to the user
      },
    });
  }

  async register(credentials: {
    username: string;
    password: string;
    email: string;
    name: string;
    surname: string;
    hasAdmin: boolean;
  }) {
    this.data.addUser(credentials as User).subscribe({
      next: (userToken: JWTToken) => {
        this.access_token = userToken.access_token;
        localStorage.setItem('access_token', userToken.access_token); // Save token if needed
        console.log('Registration successful:', userToken);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        // Display error to the user
      },
    });
  }

  getUserFromStorage() {
    this.access_token = localStorage.getItem('access_token');
    console.log('access', this.access_token);
    if (this.access_token) {
      return this.data.getUserByToken(this.access_token).pipe(
        map((response: JWTTokenResponse) => response.user),
        catchError((error) => {
          console.error('Failed to fetch user', error);
          return of(null); // Return null if there's an error
        })
      );
    } else {
      return of(null); // Return an Observable of null if no token
    }
  }
}
