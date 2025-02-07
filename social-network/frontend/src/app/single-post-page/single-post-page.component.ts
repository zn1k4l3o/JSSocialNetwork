import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { Comment, Post, User } from '../../types';
import { forkJoin, map, of, switchMap, timestamp } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-post-page',
  standalone: false,
  templateUrl: './single-post-page.component.html',
  styleUrl: './single-post-page.component.scss',
})
export class SinglePostPageComponent implements OnInit {
  id: string | null = '';
  post: Post = { title: '', content: '', userId: '', timestamp: '' };
  user: User = {
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    hasAdmin: false,
    _id: '',
  };
  comments: Comment[] = [];
  newPost!: FormGroup;
  currentUser!: User | null;
  editing: boolean = false;

  private readonly route = inject(ActivatedRoute);
  constructor(
    private data: DatabaseService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.newPost = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required]),
      content: new FormControl(this.post.content, [Validators.required]),
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchPost();
    this.fetchComments();
    this.fetchCurrentUser();
  }

  fetchPost() {
    this.data
      .getPostById(this.id ?? '', this.authService.getTokenFromStorage() ?? '')
      .subscribe((post) => {
        this.post = post;
        this.getUserInfo();
      });
  }

  fetchCurrentUser() {
    this.authService.getUserFromStorage().subscribe((user) => {
      this.currentUser = user;
    });
  }
  getUserInfo() {
    this.data
      .getUserById(
        this.post.userId,
        this.authService.getTokenFromStorage() ?? ''
      )
      .subscribe((user) => {
        this.user = user;
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

  editPost() {
    this.editing = !this.editing;
    if (this.editing) {
      this.newPost.setValue({
        title: this.post.title,
        content: this.post.content,
      });
    } else {
      const changes = {
        title: this.newPost.value.title,
        content: this.newPost.value.content,
        timestamp: new Date().toISOString(),
      };
      this.data
        .patchPost(
          this.post?._id ?? '',
          changes,
          this.authService.getTokenFromStorage() ?? ''
        )
        .subscribe((post) => {
          this.post = post;
        });
    }
  }

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
