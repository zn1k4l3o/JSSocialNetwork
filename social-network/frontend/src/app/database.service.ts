import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AUTH,
  BACK_URL,
  LOGIN,
  POSTS,
  PROFILE,
  USERS,
} from '../connectionData';
import { JWTToken, JWTTokenResponse, Post, User } from '../types';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  //private postsSubject = new BehaviorSubject<Post[]>([]);

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
    return this.http.get<Post[]>(`${BACK_URL}${POSTS}`);
  }

  getPostsById(id: string) {
    return this.http.get<Post[]>(`${BACK_URL}${POSTS}/${id}`);
  }

  addPost(post: Post) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log('newPost', JSON.stringify(post));

    return this.http.post<Post>(`${BACK_URL}${POSTS}`, post, httpOptions);
  }

  getUserById(id: string) {
    return this.http.get<User>(`${BACK_URL}${USERS}/${id}`);
  }
}
