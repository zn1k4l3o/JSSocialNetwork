import { Component, Input, OnInit } from '@angular/core';
import { Comment, Post } from '../../types';
import { DatabaseService } from '../database.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  @Input() post: Post | null = null;
  @Input() currentUserId: string = '';
  username = '';
  postDate = '';
  enabledComments = false;
  comments: Comment[] = [];
  newComment!: FormControl;
  isEdited = false;
  newPostTitle!: FormControl;
  newPostContent!: FormControl;

  constructor(private dataService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.newComment = new FormControl('', Validators.required);
    this.newPostTitle = new FormControl(this.post?.title, Validators.required);
    this.newPostContent = new FormControl(
      this.post?.content,
      Validators.required
    );
    this.fetchUsername();
    this.calculatePostDate();
  }

  calculatePostDate() {
    this.postDate = this.post?.timestamp.split('T')[0].split('.')[0] ?? '';
  }

  fetchUsername() {
    this.dataService.getUserById(this.post?.userId ?? '').subscribe((user) => {
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
      this.dataService.addComment(comment).subscribe(() => {
        this.enabledComments = true;
        this.fetchComments();
        this.newComment.setValue('');
      });
    }
  }

  fetchComments() {
    this.dataService
      .getAllCommentsByPostId(this.post?._id ?? '')
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
          };
          this.dataService
            .patchPost(this.post?._id ?? '', changes)
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
    this.router.navigate(["post", this.post?._id ]);
  }
}
