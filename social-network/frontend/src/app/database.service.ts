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

  getPosts(access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.get<Post[]>(`${environment.BACK_URL}${POSTS}`, {
      headers,
    });
  }

  getPostsById(id: string, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.get<Post[]>(`${environment.BACK_URL}${POSTS}/${id}`, {
      headers,
    });
  }

  addPost(post: Post, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    console.log('newPost', JSON.stringify(post));

    return this.http.post<Post>(`${environment.BACK_URL}${POSTS}`, post, {
      headers,
    });
  }

  getUserById(id: string, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.get<User>(`${environment.BACK_URL}${USERS}/${id}`, {
      headers,
    });
  }

  addMessage(message: Message, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.post<Message>(
      `${environment.BACK_URL}${MESSAGES}`,
      message,
      {
        headers,
      }
    );
  }

  getMessagesById(userId: string, chosenId: string, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.get<Message[]>(
      `${environment.BACK_URL}${MESSAGES}/pair?userId=${userId}&chosenId=${chosenId}`,
      {
        headers,
      }
    );
  }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.BACK_URL}${USERS}`);
  }

  addComment(comment: Comment, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.post<Comment>(
      `${environment.BACK_URL}${COMMENTS}`,
      comment,
      {
        headers,
      }
    );
  }

  getAllCommentsByPostId(postId: string, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.get<Comment[]>(
      `${environment.BACK_URL}${COMMENTS}/${postId}`,
      {
        headers,
      }
    );
  }

  patchPost(
    _id: string,
    changes: { title: string; content: string; timestamp: string },
    access_token: string
  ) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.patch<Post>(
      `${environment.BACK_URL}${POSTS}/${_id}`,
      changes,
      {
        headers,
      }
    );
  }

  getPostById(postId: string, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.get<Post>(
      `${environment.BACK_URL}${POSTS}/post/${postId}`,
      {
        headers,
      }
    );
  }

  deletePost(postId: string, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.delete(`${environment.BACK_URL}${POSTS}/${postId}`, {
      headers,
    });
  }

  deleteAllComentsOnPost(targetPostId: string, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.delete(
      `${environment.BACK_URL}${COMMENTS}/${targetPostId}`,
      {
        headers,
      }
    );
  }

  deleteUserById(userId: string, access_token: string) {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.http.delete(`${environment.BACK_URL}${USERS}/${userId}`, {
      headers,
    });
  }
}
