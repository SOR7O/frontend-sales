import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { ApiService } from './api/api.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookie: CookieService, private api:ApiService ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      console.log(this.api.isLoggedInSubject.getValue());
      
  
    let token = this.cookie.get("token")
    console.log(token.length);
    console.log(token.length>0);
    
    let existToken=token.length>0?true:false;
    console.log(existToken);
    console.log(!existToken);
    
    if(!existToken){
      // this.router.navigate(['/login']);
      console.log("seeee");
      
      this.router.navigate(['/login'])
      return false
      
    }


    return existToken;
  }
}