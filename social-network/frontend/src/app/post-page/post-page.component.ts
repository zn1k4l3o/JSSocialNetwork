import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../types';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit {
  public currentUser: User | null = null;
  public posts: Post[] = [];

  constructor(
    private auth: AuthenticationService,
    private data: DatabaseService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.fetchPosts();
  }

  fetchPosts() {
    this.data.getPosts().subscribe((posts) => {
      this.posts = posts as Post[];
      this.posts.sort((a, b) => {
        const da = new Date(a.timestamp).getTime();
        const db = new Date(b.timestamp).getTime();
        return db - da;
      });
    });
  }

  loadUser() {
    this.auth.getUserFromStorage().subscribe((user) => {
      this.currentUser = user;
      console.log('useeeerPost', this.currentUser);
    });
  }
}
