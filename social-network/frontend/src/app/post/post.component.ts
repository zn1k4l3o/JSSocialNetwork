import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../types';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  @Input() post: Post | null = null;
  username = '';
  postDate = '';

  constructor(private dataService: DatabaseService) {}

  ngOnInit(): void {
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
}
