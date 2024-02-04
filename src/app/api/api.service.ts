import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Component, Inject } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { ShopcarService } from "../productos/shopcar/shopcar.service";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  public isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();
  // private apiUrl = "http://34.224.221.93:3000/"; // Replace with your API endpoint
  private apiUrl = "http://localhost:3000/"; // Replace with your API endpoint
  private urlProducto = this.apiUrl + "producto";
  private urlPedido = this.apiUrl + "pedido";
  public token = this.cookie.get("token");

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": this.token,
    }),
  };
  // private _params = {
  //   idUser: localStorage?.getItem("idUser"),
  //   idCompania: localStorage?.getItem("idCompania"),
  // };
  private headers = new HttpHeaders()
    .set("content-type", "application/json")
    .set("Access-Control-Allow-Origin", "*")
    .set("x-access-token", this.token);
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private lsto: ShopcarService
  ) { }

  public getIsAuth(): Observable<boolean> {
    return this.isLoggedIn$;
  }
  // Peticiones de usuarios
  login(username, password): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}user/login`, {
      username: username,
      password: password,
    });
  }

  // CRUD DE ROLES

  addRole(data) {
    const url = `${this.apiUrl}user/addRole`;
    return this.http.post(url, data, { headers: this.headers });
  }
  updateRole(data) {
    const url = `${this.apiUrl}user/updateRole`;
    return this.http.post(url, data, { headers: this.headers });
  }
  deleteRole(data) {
    const url = `${this.apiUrl}user/deleteRole`;
    return this.http.post(url, data, { headers: this.headers });
  }
  getRoles() {
    return this.http.get<any>(`${this.apiUrl}user/getRoles`, {
      headers: this.headers,
    });
  }

  // Peticiones de companias
  getCompanias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}compania/getCompanias`, {
      headers: this.headers,
    });
  }

  createCompania(data) {
    return this.http.post(this.apiUrl + "compania/createCompania", data, {
      headers: this.headers,
    });
  }
  updateCompania(data) {
    return this.http.post(this.apiUrl + "compania/updateCompania", data, {
      headers: this.headers,
    });
  }
  deleteCompania(data) {
    return this.http.post(this.apiUrl + "compania/deleteCompania", data, {
      headers: this.headers,
    });
  }

  // PETICIONES CRUD USUARIOS POR COMPANIA
  getUserByCompania(_idCompania): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}compania/getUserByCompania`,
      JSON.stringify({ _id: _idCompania }),
      this.httpOptions,
    );
  }

  addUsuario(data) {
    return this.http.post(this.apiUrl + "user/createUser", data, {
      headers: this.headers,
    });
  }
  updateUsuario(data) {
    return this.http.post(this.apiUrl + "user/updateUser", data, {
      headers: this.headers,
    });
  }
  deleteUsuario(data) {
    return this.http.post(this.apiUrl + "user/deleteUser", data, {
      headers: this.headers,
    });
  }

  //
  addProducto(data) {
    let idUser = this.lsto.getItem("idUser");
    let idCompania = this.lsto.getItem("idCompania");
    data.idUser = idUser;
    data.idCompania = idCompania;
    

    return this.http.post(this.urlProducto + "/addProducto", data, {
      headers: this.headers,
    });
  }
  getProductoByCompania(data): Observable<any> {

    let idCompania = this.lsto.getItem("idCompania");
    data["id"] = idCompania;
    let url = this.urlProducto + "/getProductoByCompania";

    

    return this.http.post<any>(url, data, { headers: this.headers });
  }
  getProducts(): Observable<any> {
    let url = this.urlProducto + "/getProductos";

    return this.http.get<any>(url, { headers: this.headers });
  }

  deleteProducto(data): Observable<any> {
    let url = this.urlProducto + "/deleteProducto";
    return this.http.post(url, data, { headers: this.headers });
  }

  updateProducto(data): Observable<any> {
    let url = this.urlProducto + "/updateProducto";
    return this.http.post(url, data, { headers: this.headers });
  }

  //CRUD PEDIDOS
  createPedido(data) {
    let body = {
      'idUsuario': this.lsto.getItem('idUser'),
      'idCompania': this.lsto.getItem('idCompania'),
      data:data

    }
    

    return this.http.post(this.urlPedido + "/addPedido", body, {
      headers: this.headers,
    });
  }
  getPedidosByUser(): Observable<any> {
    let id = this.lsto.getItem("idUser")
    let data = { id: id }
    return this.http.post<any>(this.urlPedido + "/getPedidosByUser", data, {
      headers: this.headers,
    });
  }
  getPedidosByCompania(): Observable<any> {
    let id = this.lsto.getItem("idCompania")
    let data = { id: id }
    return this.http.post(this.urlPedido + "/getPedidosByCompania", data, {
      headers: this.headers,
    });
  }
  updatePedido(data): Observable<any> {
    return this.http.post(this.urlPedido + "/updatePedido", data, {
      headers: this.headers,
    });
  }
  updatePedidoEstado(data): Observable<any> {
    return this.http.post(this.urlPedido + "/updatePedidoEstado", data, {
      headers: this.headers,
    });
  }
  delete(data): Observable<any> {
    return this.http.post(this.urlPedido + "/deletePedido", data, {
      headers: this.headers,
    });
  }
}
