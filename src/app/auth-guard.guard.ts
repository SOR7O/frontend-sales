import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn,Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let auth = false;

    if (sessionStorage) {
      const token = sessionStorage.getItem('token');
      auth = !!token; // Use the double-bang operator to convert to boolean
    }

    if (!auth) {
      // If authentication fails, redirect to a login page or any other desired route
      this.router.navigate(['/login']); // Adjust the route accordingly

    }

    return auth;
  }
}