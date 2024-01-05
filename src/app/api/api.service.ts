import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private apiUrl = 'http://localhost:3000/'; // Replace with your API endpoint
  // private token= sessionStorage.getItem("token");
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').set('x-access-token', sessionStorage?.getItem("token"));
  constructor(private http: HttpClient) {
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
    let data;
    if (typeof sessionStorage !== 'undefined') {

      data = this.http.get<any>(`${this.apiUrl}compania/getCompanias`, { headers: this.headers });
    }
    return data;
  }
}
