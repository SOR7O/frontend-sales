import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams,HttpResponse } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { LocalService } from '../services/local.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl="http://localhost:3000/facturas/";
  public token = this.cookie.get("token");
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": this.token,
    }),
  };
  constructor(private http: HttpClient,private cookie:CookieService,
    private localStorage:LocalService) { }
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    this.apiUrl=this.apiUrl+'getPuntosEmisionByCompania';
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    this.apiUrl=this.apiUrl+'createPuntoEmision';
    data['idCompania']= this.localStorage.getItem('idCompania');
    console.log(data);
    
    return this.http.post(this.apiUrl, data, this.httpOptions);
  }

  update(id: string, data: any): Observable<any> {
    this.apiUrl=this.apiUrl+'updatePuntoEmision';
    return this.http.put(`${this.apiUrl}/${id}`, data, this.httpOptions);
  }

  delete(id: string): Observable<any> {
    this.apiUrl=this.apiUrl+'deletePuntoEmisionById';
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
