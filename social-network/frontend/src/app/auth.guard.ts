import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof Storage !== 'undefined') {
      if (!sessionStorage.length && !sessionStorage.getItem('access_token')) {
        console.log('kurcina');
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
    return false;
  }
}
