import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CalculosService } from '../../services/calculos.service';
import { ApiService } from '../../api/api.service';
import { take } from 'rxjs';

import Swal from 'sweetalert2';
import { SocketServiceService } from '../../socketService/socket-service.service';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from '../../services/local.service';
@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css'
})
export class DetallePedidoComponent implements OnInit {


  typeUser = 3;
  editar = false;
  newCantidad = 0;
  headersColum = [
    'acciones',
    'nombre',
    'descripcion',
    'cantidad',
    'subtotal',
    'impuesto',
    'total',
    'confirmado'
  ];
  displayedTotalColumns = [
    'totalAmountTitle',
    'emptyFooter',
    'emptyFooter'];
    total:number = 0.0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: [],
    public dialog: MatDialog,
    private cal: CalculosService,
    private lcstr: LocalService,
    private service: ApiService,
    private socket: SocketServiceService,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.typeUser = this.lcstr.getItem('typeUser')
 
    for (let index = 0; index < this.data.length; index++) {
      let to= parseFloat(this.data[index]['total']['$numberDecimal'])
      this.total+=to;
  
    }

  }
  edit(element): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.newCantidad
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        let temp = [];
        temp = this.data
        const resultData = temp.find((f) => f["_id"] === element['_id']);

        let precio = element['idProducto']['precio']['$numberDecimal'];
        let imp=element['idProducto']['imp']==undefined?0.0:element['idProducto']['imp']['$numberDecimal']
        let calcular = this.cal.calcularTotal(result, precio, imp)
        resultData['cantidad'] = result;
        resultData['subtotal'] = calcular['subtotal'];
        resultData['total'] = calcular['total'];
        resultData['impuesto'] = calcular['impuesto'];

        this.data = [...this.data]
        this.editar = true;
      }
      this.newCantidad = result;
    });
  }
  updateEstado(element) {
    element['confirmado'] = element['confirmado'] ? false : true;
    this.service.updatePedidoEstado(element).pipe(take(1)).subscribe((resp) => {

      this.socket.emitConfirmacionPedido(element);

    }, error => {
      this.toastr.error("error")

    })

  }


}


@Component({
  selector: 'editar_pedido',
  templateUrl: 'editar_pedido.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public cantidad: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}