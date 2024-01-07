import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import {CookieService} from "ngx-cookie-service"
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private apiUrl = 'http://localhost:3000/'; // Replace with your API endpoint
  public token=this.cookie.get("token")
  private params= new HttpParams();
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').set('x-access-token', this.token);
  constructor(private http: HttpClient, private cookie:CookieService) {
  }

  public getIsAuth(): Observable<boolean> {

    return this.isLoggedIn$;
  }
  // Peticiones de usuarios
  login(username, password): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}user/login`, { username: username, password: password });
  }
  // Peticiones de companias
  getCompanias(): Observable<any> {

      return  this.http.get<any>(`${this.apiUrl}compania/getCompanias`, { headers: this.headers });
    
    
  }

  createCompania(data){
    return this.http.post(this.apiUrl+"compania/createCompania",data,{headers:this.headers});
  }
    updateCompania(data){
    return this.http.post(this.apiUrl+"compania/updateCompania",data,{headers:this.headers});
  }
  deleteCompania(data){

    return this.http.post(this.apiUrl+"compania/deleteCompania",data,{headers:this.headers});
  }
}
