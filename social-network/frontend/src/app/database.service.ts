import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AUTH,
  BACK_URL,
  LOGIN,
  POSTS,
  PROFILE,
  USERS,
} from '../connectionData';
import { JWTToken, JWTTokenResponse, User } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  addUser(user: User) {
    return this.http.post<JWTToken>(`${BACK_URL}${AUTH}`, user);
  }

  getUserByToken(access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.get<JWTTokenResponse>(`${BACK_URL}${AUTH}${PROFILE}`, {
      headers,
    });
  }

  loginUser(username: string, password: string) {
    return this.http.get<JWTToken>(
      `${BACK_URL}${AUTH}${LOGIN}?username=${username}&password=${password}`
    );
  }

  getPosts() {
    return this.http.get(`${BACK_URL}${POSTS}`);
  }
}
