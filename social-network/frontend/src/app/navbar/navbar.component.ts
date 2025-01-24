import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../../types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.getUserFromStorage().subscribe((user) => {
      this.isLoggedIn = !!user;
      this.username = user?.username || null;
    });
  }
}
