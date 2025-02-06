import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserFromStorage().subscribe((user) => {
      this.isLoggedIn = !!user;
      this.username = user?.username || null;
      this.isAdmin = user?.hasAdmin ?? false;
    });
  }

  logout() {
    sessionStorage.clear();
    this.username = null;
    this.isLoggedIn = false;
    this.router.navigate(['login']);
    //dodati da se brani da moze doc na stranicu itd
  }
}
