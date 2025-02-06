import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../types';
import { DatabaseService } from '../database.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-admin-page',
  standalone: false,
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  userList: User[] = [];
  postList: Post[] = [];

  constructor(
    private data: DatabaseService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadPosts();
  }

  loadUsers() {
    this.data.getAllUsers().subscribe((users) => {
      this.userList = users;
    });
  }

  loadPosts() {
    this.data
      .getPosts(this.authService.getTokenFromStorage() ?? '')
      .subscribe((posts) => {
        this.postList = posts;
      });
  }

  deleteUser(index: number) {
    this.data
      .deleteUserById(
        this.userList[index]._id,
        this.authService.getTokenFromStorage() ?? ''
      )
      .subscribe(() => {
        this.loadUsers();
      });
  }

  deletePost(index: number) {
    this.data
      .deletePost(
        this.postList[index]._id ?? '',
        this.authService.getTokenFromStorage() ?? ''
      )
      .subscribe(() => this.loadPosts());
    this.data
      .deleteAllComentsOnPost(
        this.postList[index]._id ?? '',
        this.authService.getTokenFromStorage() ?? ''
      )
      .subscribe();
  }
}
