import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';
import { Post } from '../../types';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-page',
  standalone: false,
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.scss',
})
export class NewPageComponent implements OnInit {
  newPost!: FormGroup;
  userId = '';

  constructor(
    private authService: AuthenticationService,
    private dataService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newPost = new FormGroup({
      description: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
    });
    this.getUser();
  }

  getUser() {
    this.authService
      .getUserFromStorage()
      .pipe(map((user) => user?._id || ''))
      .subscribe((userId) => {
        this.userId = userId;
      });
  }

  async onSubmitPost() {
    if (this.newPost.valid) {
      const post = {
        title: this.newPost.value.title,
        content: this.newPost.value.description,
        userId: this.userId,
        timestamp: new Date().toISOString(),
      };
      await this.dataService
        .addPost(post as Post, this.authService.getTokenFromStorage() ?? '')
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }
}
