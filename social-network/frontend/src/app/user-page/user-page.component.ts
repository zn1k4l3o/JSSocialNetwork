import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../types';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-user-page',
  standalone: false,
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  user: User | null = null;
  userPosts: Post[] = [];

  constructor(
    private authService: AuthenticationService,
    private dataService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  async fetchUser() {
    await this.authService.getUserFromStorage().subscribe((user) => {
      this.user = user;
      this.fetchPosts();
    });
  }

  fetchPosts() {
    this.dataService
      .getPostsById(
        this.user?._id ?? '',
        this.authService.getTokenFromStorage() ?? ''
      )
      .subscribe((posts) => {
        this.userPosts = posts;
        this.userPosts.sort((a, b) => {
          const da = new Date(a.timestamp).getTime();
          const db = new Date(b.timestamp).getTime();
          return db - da;
        });
      });
  }
}
