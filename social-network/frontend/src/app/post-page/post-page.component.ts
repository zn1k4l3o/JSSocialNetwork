import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../types';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit {
  public currentUser: User | null = null;
  public posts: Post[] = [];

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth.getUserFromStorage().subscribe((user) => {
      this.currentUser = user;
    });
    console.log('useeeerPost', this.currentUser);
    this.fetchPosts();
  }

  fetchPosts() {
    
  }
}
