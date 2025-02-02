import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../types';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  userList: User[] = [];
  postList: Post[] = [];

  constructor(private data: DatabaseService) {}

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
    this.data.getPosts().subscribe((posts) => {
      this.postList = posts;
    });
  }

  deleteUser(index: number) {
    this.data.deleteUserById(this.userList[index]._id).subscribe(() => {
      this.loadUsers();
    });
  }

  deletePost(index: number) {
    this.data
      .deletePost(this.postList[index]._id ?? '')
      .subscribe(() => this.loadPosts());
    this.data
      .deleteAllComentsOnPost(this.postList[index]._id ?? '')
      .subscribe();
  }
}
