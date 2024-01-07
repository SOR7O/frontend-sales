import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn,Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private cookie:CookieService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let token= this.cookie.get("token")
    let auth=false;
    console.log("aaa2" + token);
    if (token) {
      return true; // Use the double-bang operator to convert to boolean
    }

    else{
      // If authentication fails, redirect to a login page or any other desired route
      this.router.navigate(['/login']); // Adjust the route accordingly
      return false
    }

  }
}