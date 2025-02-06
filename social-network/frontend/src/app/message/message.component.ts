import { Component, input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  text = input('');
  right = input(false);
}
