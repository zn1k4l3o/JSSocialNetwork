import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AUTH,
  COMMENTS,
  LOGIN,
  MESSAGES,
  POSTS,
  PROFILE,
  USERS,
} from '../connectionData';
import { environment } from '../environments/environment';
import {
  Comment,
  JWTToken,
  JWTTokenResponse,
  Message,
  Post,
  User,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  addUser(user: User) {
    return this.http.post<JWTToken>(`${environment.BACK_URL}${AUTH}`, user);
  }

  getUserByToken(access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.get<JWTTokenResponse>(
      `${environment.BACK_URL}${AUTH}${PROFILE}`,
      {
        headers,
      }
    );
  }

  loginUser(username: string, password: string) {
    return this.http.get<JWTToken>(
      `${environment.BACK_URL}${AUTH}${LOGIN}?username=${username}&password=${password}`
    );
  }

  getPosts() {
    return this.http.get<Post[]>(`${environment.BACK_URL}${POSTS}`);
  }

  getPostsById(id: string) {
    return this.http.get<Post[]>(`${environment.BACK_URL}${POSTS}/${id}`);
  }

  addPost(post: Post) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log('newPost', JSON.stringify(post));

    return this.http.post<Post>(
      `${environment.BACK_URL}${POSTS}`,
      post,
      httpOptions
    );
  }

  getUserById(id: string) {
    return this.http.get<User>(`${environment.BACK_URL}${USERS}/${id}`);
  }

  addMessage(message: Message) {
    return this.http.post<Message>(
      `${environment.BACK_URL}${MESSAGES}`,
      message
    );
  }

  getMessagesById(userId: string, chosenId: string) {
    return this.http.get<Message[]>(
      `${environment.BACK_URL}${MESSAGES}/pair?userId=${userId}&chosenId=${chosenId}`
    );
  }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.BACK_URL}${USERS}`);
  }

  addComment(comment: Comment) {
    return this.http.post<Comment>(
      `${environment.BACK_URL}${COMMENTS}`,
      comment
    );
  }

  getAllCommentsByPostId(postId: string) {
    return this.http.get<Comment[]>(
      `${environment.BACK_URL}${COMMENTS}/${postId}`
    );
  }

  patchPost(
    _id: string,
    changes: { title: string; content: string; timestamp: string }
  ) {
    return this.http.patch<Post>(
      `${environment.BACK_URL}${POSTS}/${_id}`,
      changes
    );
  }

  getPostById(postId: string) {
    return this.http.get<Post>(
      `${environment.BACK_URL}${POSTS}/post/${postId}`
    );
  }

  deletePost(postId: string) {
    return this.http.delete(`${environment.BACK_URL}${POSTS}/${postId}`);
  }

  deleteAllComentsOnPost(targetPostId: string) {
    return this.http.delete(
      `${environment.BACK_URL}${COMMENTS}/${targetPostId}`
    );
  }

  deleteUserById(userId: string) {
    return this.http.delete(`${environment.BACK_URL}${COMMENTS}/${userId}`);
  }
}
