import { Component, Input, OnInit } from '@angular/core';
import { Comment, Post } from '../../types';
import { DatabaseService } from '../database.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-post',
  standalone: false,
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  @Input() post: Post | null = null;
  @Input() currentUserId: string = '';
  username = '';
  enabledComments = false;
  comments: Comment[] = [];
  newComment!: FormControl;
  isEdited = false;
  newPostTitle!: FormControl;
  newPostContent!: FormControl;

  constructor(
    private dataService: DatabaseService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.newComment = new FormControl('', Validators.required);
    this.newPostTitle = new FormControl(this.post?.title, Validators.required);
    this.newPostContent = new FormControl(
      this.post?.content,
      Validators.required
    );
    this.fetchUsername();
  }

  fetchUsername() {
    this.dataService
      .getUserById(
        this.post?.userId ?? '',
        this.authService.getTokenFromStorage() ?? ''
      )
      .subscribe((user) => {
        this.username = user?.username ?? '';
      });
  }

  setEnabledComments() {
    this.enabledComments = !this.enabledComments;
    if (this.enabledComments) {
      this.fetchComments();
    }
  }

  sendComment() {
    if (this.newComment.valid) {
      const comment: Comment = {
        content: this.newComment.value,
        targetPostId: this.post?._id ?? '',
        timestamp: new Date().toISOString(),
        ownerId: this.currentUserId,
      };
      this.dataService
        .addComment(comment, this.authService.getTokenFromStorage() ?? '')
        .subscribe(() => {
          this.enabledComments = true;
          this.fetchComments();
          this.newComment.setValue('');
        });
    }
  }

  fetchComments() {
    this.dataService
      .getAllCommentsByPostId(
        this.post?._id ?? '',
        this.authService.getTokenFromStorage() ?? ''
      )
      .subscribe((comments) => {
        this.comments = comments;
        this.comments.sort((a, b) => {
          const da = new Date(a.timestamp).getTime();
          const db = new Date(b.timestamp).getTime();
          return da - db;
        });
      });
  }

  editPost() {
    if (this.isEdited) {
      this.isEdited = false;
      if (this.newPostContent.valid) {
        if (this.newPostTitle.valid) {
          const changes = {
            title: this.newPostTitle.value,
            content: this.newPostContent.value,
            timestamp: new Date().toISOString(),
          };
          this.dataService
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
    } else {
      this.isEdited = true;
    }
  }

  openPostPage() {
    this.router.navigate(['post', this.post?._id]);
  }
}
