import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../api/api.service';
import { SocketServiceService } from '../socketService/socket-service.service';
import { ShopcarService } from '../productos/shopcar/shopcar.service';
import { take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,MatIconModule,CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  dataSource = [];
  constructor(private service: ApiService, private socket: SocketServiceService,private lcstr:ShopcarService) { }
  ngOnInit(): void {
    console.log("this.init de pedidos");
    this.socket.listenConfirmarPedido().subscribe((pedido)=>{
      console.log(pedido);
    })
    this.getPedidosByUser();

  }
  displayedColumns = [
    'acciones',
    'nombre',
    'cantidad',
    'subtotal',
    'impuesto',
    'total'
  ];
  delete(element) {
    let idx = this.dataSource.indexOf(element);
    this.dataSource.splice(idx, 1)
    this.dataSource = [...this.dataSource]
    this.socket.test(this.dataSource.length)
  }
  confirmarPedido(data){
    this.socket.emitConfirmacionPedido(data);
  }

  getPedidosByUser(){


    this.service.getPedidosByUser().pipe(take(1)).subscribe((resp)=>{
      console.log(resp);
      
      if(resp['type']=="ok" && resp['data']){
        this.dataSource=[...resp['data']];
      }
    },error=>{
      console.log("este error");
      console.log(error);
      
      
    })

  }

  

}
