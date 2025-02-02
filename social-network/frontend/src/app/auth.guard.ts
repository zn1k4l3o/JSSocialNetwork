import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import path from 'path';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (typeof Storage !== 'undefined') {
      const { routeConfig } = route;
      const { path } = routeConfig as Route;
      if (
        path?.includes('admin') &&
        sessionStorage.length &&
        sessionStorage.getItem('hasAdmin') === '1'
      ) {
        return true;
      } else if (path?.includes('admin')) {
        this.router.navigate(['']);
        return false;
      }
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
