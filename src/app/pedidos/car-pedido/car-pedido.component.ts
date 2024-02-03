import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ShopcarService } from '../../productos/shopcar/shopcar.service';
import { CommonModule } from '@angular/common';
import { SocketServiceService } from '../../socketService/socket-service.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-car-pedido',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './car-pedido.component.html',
  styleUrl: './car-pedido.component.css'
})
export class CarPedidoComponent implements OnInit, AfterViewInit {
displayedColumns=[
  'acciones',
  'nombre',
  'cantidad',
  'subtotal',
  'impuesto',
  'total'
];
delete(element) {
  let idx= this.dataSource.indexOf(element);
  
  this.dataSource.splice(idx,1)
  
  this.dataSource=[...this.dataSource]
  this.lsts.setItem('pedido',this.dataSource);
  this.socket.test(this.dataSource.length)
  
  

  
  

}

dataSource=[];
  constructor(private lsts: ShopcarService, private socket: SocketServiceService, private service:ApiService) {

  }
  ngAfterViewInit(): void {
    
    this.socket.listenPedidos().subscribe((val) => {
      
      this.getPedido();
    })
  }
  ngOnInit(): void {
    this.getPedido();



  }
  getPedido() {
    let pedidos: [] = this.lsts.getItem('pedido');
    
    if (pedidos == undefined) return;
    
    this.dataSource = [...pedidos]
    

  }

}
