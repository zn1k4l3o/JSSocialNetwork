import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.scss',
})
export class NewPageComponent implements OnInit {
  newPost!: FormGroup;

  ngOnInit(): void {
    this.newPost = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmitPost() {}
}
