import { Component, OnInit } from '@angular/core';
import { Message, User } from '../../types';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrl: './message-view.component.scss',
})
export class MessageViewComponent implements OnInit {
  peopleView = true;
  allUsers: User[] = [];
  currentUser: User | null = null;
  chosenUser: User | null = null;
  people: User[] = [];
  messages: Message[] = [];
  newMessage!: FormControl;

  constructor(
    private authService: AuthenticationService,
    private dataService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.newMessage = new FormControl('', [Validators.required]);
    this.fetchUser();
    this.fetchUsers();
  }

  fetchUser() {
    this.authService.getUserFromStorage().subscribe((user) => {
      this.currentUser = user;
      this.fetchMessagesForUserId();
      this.fetchUsers();
    });
  }

  fetchUsers() {
    this.dataService.getAllUsers().subscribe((users) => {
      this.allUsers = users.filter((u) => u._id != this.currentUser?._id);
    });
  }

  fetchMessagesForUserId() {
    this.dataService
      .getMessagesById(this.currentUser?._id ?? '', this.chosenUser?._id ?? '')
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  setMessageView(peopleView: boolean) {
    this.peopleView = peopleView;
  }

  setChosenUser(chosenUser: User) {
    this.chosenUser = chosenUser;
    this.peopleView = false;
    this.fetchMessagesForUserId();
  }

  sendMessage() {
    const message: Message = {
      message: this.newMessage.value,
      timestamp: new Date().toISOString(),
      ownerId: this.currentUser?._id ?? '',
      targetId: this.chosenUser?._id ?? '',
    };
    this.dataService.addMessage(message).subscribe(() => {
      this.fetchMessagesForUserId();
    });
  }
}
