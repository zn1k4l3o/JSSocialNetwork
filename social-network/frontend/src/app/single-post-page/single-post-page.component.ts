import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { Comment, Post, User } from '../../types';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-single-post-page',
  templateUrl: './single-post-page.component.html',
  styleUrl: './single-post-page.component.scss',
})
export class SinglePostPageComponent implements OnInit {
  id: string | null = '';
  post!: Post;
  user: User | null = null;
  comments: Comment[] = [];
  postDate: string = '';

  private readonly route = inject(ActivatedRoute);
  constructor(
    private data: DatabaseService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchPost();
    this.fetchComments();
  }

  fetchPost() {
    this.data
      .getPostById(this.id ?? '', this.authService.getTokenFromStorage() ?? '')
      .subscribe((post) => {
        this.post = post;
        this.calculatePostDate();
        this.data
          .getUserById(
            post.userId,
            this.authService.getTokenFromStorage() ?? ''
          )
          .subscribe((user) => {
            this.user = user;
          });
      });
  }

  fetchComments() {
    this.data
      .getAllCommentsByPostId(
        this.id ?? '',
        this.authService.getTokenFromStorage() ?? ''
      )
      .pipe(
        switchMap((comments) => {
          return forkJoin(
            comments.map((comment) =>
              this.data
                .getUserById(
                  comment.ownerId,
                  this.authService.getTokenFromStorage() ?? ''
                )
                .pipe(map((user) => ({ ...comment, username: user.username })))
            )
          );
        })
      )
      .subscribe((updatedComments) => {
        this.comments = updatedComments;
      });
  }

  calculatePostDate() {
    this.postDate = this.post?.timestamp.split('T')[0].split('.')[0] ?? '';
  }

  editPost() {}

  deletePost() {
    this.data
      .deleteAllComentsOnPost(
        this.id ?? '',
        this.authService.getTokenFromStorage() ?? ''
      )
      .subscribe(() => {
        console.log('ok');
      });
    this.data
      .deletePost(this.id ?? '', this.authService.getTokenFromStorage() ?? '')
      .subscribe(() => {
        this.router.navigate(['']);
      });
    this;
  }
}
