import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpResponse } from '@angular/common/http'


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookie: CookieService ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let token = this.cookie.get("token")
    let existToken=token.length>0?false:true;
    if(existToken){
      this.router.navigate(['/login']);
      
    }


    return !existToken;
  }
}