import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalService } from '../services/local.service';
import { InventarioService } from '../api/inventario.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatOptionModule, MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';


let element = { 'cantidad': 0, 'producto': 'init', saved: false, edit: false, idProducto: '' }

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,
    MatTableModule, MatInputModule,
    MatOptionModule, MatSelectModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, CommonModule,
    MatCardModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  invForm: FormGroup;
  prods = [];
  invs = [];
  invDetalles = []
  dataSource: MatTableDataSource<any>;
  tempData = [];
  test = 1;
  typeUser = 1;
  displayedColumns: string[] = ['actions', 'cantidad', 'producto'];
  constructor(private ls: LocalService,
    private api: InventarioService,
    private apiProd: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.invForm = this.fb.group({
      _id: [''],
      nombre: ['', Validators.required],
      descripcion: [''],
      typeInventario: ['entrada']
    })
    this.dataSource = new MatTableDataSource([element]);
  }

  ngOnInit(): void {
    // this.dataSource.push({ 'cantidad': '0', 'producto': '0' })
    this.getProductosByCompania();
    this.dataSource.sort = this.sort;

  }
  getProductosByCompania() {
    this.apiProd.getProductoByCompania({ any: "any" }).pipe(take(1)).subscribe((res) => {

      if (res['type'] == "ok" && res['data'].length > 0) {
        this.prods = [...res['data']]
      }
    })
  }
  saveInventario() {
    if (this.invForm.valid) {
      if (this.invForm.value['_id']) { } else {
        console.log(this.tempData);
        
        this.tempData.splice(this.tempData.length-1,1)
        console.log("======");
        console.log(this.tempData);

        this.api.saveInventario(this.invForm.value,this.tempData).pipe(take(1)).subscribe((res) => {
          this.toastr.success("Creado exitosamente", "Exitosamente")
        }, error => {
          this.toastr.error("Ha ocurrido un error comunicate con el administrador", "Error")
        })
      }
    }
  }

  addRow(idx) {
    let paso = true;

    if (this.tempData[idx - 1] !== undefined && !this.tempData[idx - 1]['saved']) {
      paso = false
      this.toastr.warning("Tienes que guardar los datos", "Informacion")
    }


    if (this.tempData.length > 1) {
      this.tempData.splice(this.tempData.length - 1, 1)
    }
    // if(this.tempData[this.tempData-1])
    if (!paso) return;
    let add = { "cantidad": this.test++, "producto": "falta producto", "saved": false, "edit": false };
    this.tempData.push(add);
    this.tempData.push(element);

    this.dataSource = new MatTableDataSource(this.tempData)


  }
  savedRow(index, row) {
    const ids = {}
    let saved = true;
    for (const ele of this.tempData) {
      let id = ele['idProducto']
      if (ids[id]) {
        ids[id] += 1
      }
      else if (id !== "") {
        ids[id] = 1
      }
    }

    if (this.tempData[index]['producto'] === 'falta producto') {
      this.toastr.warning("El elemento que deseas agregar ya existe");
      saved = false
    }

    if (!saved) return;
    this.tempData[index]['saved'] = true;
    this.tempData = [...this.tempData]
    this.dataSource = new MatTableDataSource(this.tempData)


  }
  changeCantidad(key, index) {

    this.tempData[index]['cantidad'] = key['value'];

  }
  changeProducto($event: MatOptionSelectionChange<any>, index) {
    let find = this.tempData.find((m) => m['idProducto'] === $event.source.value['_id']);
    let paso = find === undefined ? true : false;
    !paso ? this.toastr.warning("El producto ya existe", "Warning") : '';

    if (!paso) return;
    this.tempData[index]['producto'] = $event.source.value['nombre']
    this.tempData[index]['idProducto'] = $event.source.value['_id']

  }
  cancel(index, ele) {
    this.tempData.splice(index, 1)

  }
  deleteItem(index) {
    Swal.fire({
      title: "Eliminar",
      text: "Seguro que deseas eliminar el  punto de emisión?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        this.tempData.splice(index, 1);
        this.tempData = [...this.tempData];
        this.dataSource = new MatTableDataSource(this.tempData)
      } else {
        result.dismiss === Swal.DismissReason.cancel
      }
    })
  }
}
