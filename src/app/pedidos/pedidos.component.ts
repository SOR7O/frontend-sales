import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../api/api.service';
import { SocketServiceService } from '../socketService/socket-service.service';
import { ShopcarService } from '../productos/shopcar/shopcar.service';
import { take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';
import Swal from 'sweetalert2';

export interface PedidoShow {
  nameCompany: string,
  fecha: Date,
  detalle: Array<any>
}
@Component({
  selector: 'app-pedidos',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})

export class PedidosComponent implements OnInit, AfterViewInit {
  // 'impuesto',
  // 'total'
  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  displayedColumns = [
    'acciones',
    'nameCompany',
    'fecha'
    // 'impuesto',
    // 'total'
  ];
  typeUser = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any[] = [];
  pedido = new MatTableDataSource<PedidoShow>(this.dataSource);
  detallePedido = [];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: PedidoShow | null;

  constructor(private service: ApiService, private socket: SocketServiceService, private lcstr: ShopcarService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.socket.listenConfirmarPedido().subscribe((pedido) => {

      
    })
    this.typeUser == 3 ? this.getPedidosByUser() : this.getPedidosByCompany();

  }
  ngAfterViewInit() {
    this.typeUser = this.lcstr.getItem('typeUser')
    this.displayedColumns[1] = this.typeUser == 1 || this.typeUser == 2 ? 'nombreCliente' : 'nameCompany'
    console.log(this.displayedColumns[1]);

    // this.pedido.paginator = this.paginator;
  }

  delete(element) {
    let idx = this.dataSource.indexOf(element);
    this.dataSource.splice(idx, 1)
    this.dataSource = [...this.dataSource]
    this.socket.test(this.dataSource.length)
  }
  confirmarPedido(data) {
    this.socket.emitConfirmacionPedido(data);
  }

  getPedidosByUser() {
    this.service.getPedidosByUser().pipe(take(1)).subscribe((resp) => {
      console.log(resp);

      if (resp['type'] == "ok" && resp['data']) {
        this.dataSource = [];
        this.detallePedido = [];

        resp['data'].forEach(element => {
          element['nameCompany'] = element['pedido']['idCompania']['nombre']
          element['fecha'] = element['pedido']['fecha']
          element['nombreCliente'] = element['pedido']['idUsuario']['nombre']
          this.dataSource.push(element);

          element['detalle'].forEach(element2 => {
            element2['nombre'] = element2['idProducto']['nombre']
            element2['descripcion'] = element2['idProducto']['descripcion']
            this.detallePedido.push(element2);
          });

        });

        this.dataSource = [...this.dataSource];
        this.detallePedido = [...this.detallePedido];
        // this.dataSource = [...resp['data']];
      }
    }, error => {

      console.log(error);



    })

  }
  getPedidosByCompany() {
    this.service.getPedidosByCompania().pipe(take(1)).subscribe((resp) => {
      console.log(resp);

      if (resp['type'] == "ok" && resp['data']) {
        this.dataSource = [];
        this.detallePedido = [];

        resp['data'].forEach(element => {
          element['nameCompany'] = element['pedido']['idCompania']['nombre']
          element['fecha'] = element['pedido']['fecha']
          element['nombreCliente'] = element['pedido']['idUsuario']['nombre']
          this.dataSource.push(element);

          element['detalle'].forEach(element2 => {
            element2['nombre'] = element2['idProducto']['nombre']
            element2['descripcion'] = element2['idProducto']['descripcion']
            this.detallePedido.push(element2);
          });

        });

        this.dataSource = [...this.dataSource];
        this.detallePedido = [...this.detallePedido];
        // this.dataSource = [...resp['data']];
      }
    }, error => {

      console.log(error);



    })

  }

  openDialog(element) {
    const dialogRef = this.dialog.open(DetallePedidoComponent, {
      data: element['detalle']
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })

  }

}
