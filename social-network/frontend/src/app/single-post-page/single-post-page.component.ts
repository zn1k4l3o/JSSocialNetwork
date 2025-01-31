import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post-page',
  templateUrl: './single-post-page.component.html',
  styleUrl: './single-post-page.component.scss',
})
export class SinglePostPageComponent implements OnInit {
  heroId: string | null = '';

  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id');
  }
}
