import { Injectable, ApplicationRef } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, filter, take } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private socket: Socket;

  private server = "http://localhost:3000";
  constructor(private appRef: ApplicationRef) {
  }


  connect() {

    this.socket = io(this.server);
    this.socket.on("connected", (val) => {
      
      

    })
    this.socket.emit("joinSales", { "cookie": "test" });
  }
  test(size) {
    this.socket.emit("desdeFrontend", size)

  }
  listenPedidos(): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on("pedidoAgregado", (valor) => {
        subscribe.next(valor);
      })
    });
  }

}
