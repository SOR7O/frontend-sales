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
//crud punto de emision
  getById(id: string): Observable<any> {
    let apiUrl=this.apiUrl+'getPuntosEmisionByCompania';
    return this.http.post(`${apiUrl}/${id}`,{id:id}, this.httpOptions);
  }

  create(data: any): Observable<any> {
    let apiUrl=this.apiUrl+'createPuntoEmision';
    data['idCompania']= this.localStorage.getItem('idCompania');
    console.log(data);
    
    return this.http.post(apiUrl, data, this.httpOptions);
  }

  update(id: string, data: any): Observable<any> {
    let apiUrl=this.apiUrl+'updatePuntoEmisionById';
    console.log(this.apiUrl);
    
    return this.http.put(`${apiUrl}/${id}`, data, this.httpOptions);
  }

  delete(id: string): Observable<any> {
    let apiUrl=this.apiUrl+'deletePuntoEmisionById';
    return this.http.delete(`${apiUrl}/${id}`, this.httpOptions);
  }

  // crud Establecimiento
  getEstablecimientoById(id: string): Observable<any> {
    let apiUrl=this.apiUrl+'getEstablecimientoByCompania';
    return this.http.post(`${apiUrl}/${id}`,{id:id}, this.httpOptions);
  }

  createEstablecimiento(data: any): Observable<any> {
    let apiUrl=this.apiUrl+'createEstablecimiento';
    data['idCompania']= this.localStorage.getItem('idCompania');
    console.log(data);
    
    return this.http.post(apiUrl, data, this.httpOptions);
  }

  updatEstablecimiento(id: string, data: any): Observable<any> {
    let apiUrl=this.apiUrl+'updateEstablecimientoById';
    console.log(this.apiUrl);
    
    return this.http.put(`${apiUrl}/${id}`, data, this.httpOptions);
  }

  deleteEstablecimiento(id: string): Observable<any> {
    let apiUrl=this.apiUrl+'deleteEstablecimientoById';
    return this.http.delete(`${apiUrl}/${id}`, this.httpOptions);
  }

  //crud Tipos de documento
  getTiposDocumentosById(id: string): Observable<any> {
    let apiUrl=this.apiUrl+'getTipoDocumentoByCompania';
    return this.http.post(`${apiUrl}/${id}`,{id:id}, this.httpOptions);
  }

  createTipoDocumento(data: any): Observable<any> {
    let apiUrl=this.apiUrl+'createTipoDocumento';
    data['idCompania']= this.localStorage.getItem('idCompania');
    console.log(data);
    
    return this.http.post(apiUrl, data, this.httpOptions);
  }

  updateTipoDocumento(id: string, data: any): Observable<any> {
    let apiUrl=this.apiUrl+'updateTipoDocumentoById';
    console.log(this.apiUrl);
    
    return this.http.put(`${apiUrl}/${id}`, data, this.httpOptions);
  }

  deleteTipoDocumento(id: string): Observable<any> {
    let apiUrl=this.apiUrl+'deleteTipoDocumentoById';
    return this.http.delete(`${apiUrl}/${id}`, this.httpOptions);
  }

}
