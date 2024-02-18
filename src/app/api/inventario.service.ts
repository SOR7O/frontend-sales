import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalService } from '../services/local.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = "http://localhost:3000/inventario/";

  public token = this.cookie.get("token");
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": this.token,
    }),
  };
  constructor(private http: HttpClient, private cookie: CookieService,
    private localStorage: LocalService) { }

  saveInventario(header,data): Observable<any> {
    let url= this.apiUrl + 'createInventario';
    let body={
      nombre:header['nombre'],
      descripcion:header['descripcion'],
      prods:data,
      idUser:this.localStorage.getItem("idUser"),
      typeInventario:'entrada',
      idCompania: this.localStorage.getItem("idCompania")

    }
    return this.http.post(url, body, this.httpOptions);
  }
}
