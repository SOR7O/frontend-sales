import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FacturaService } from '../../api/factura.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { LocalService } from '../../services/local.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-punto-emision',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatRadioModule, MatTableModule,MatButtonModule,MatInputModule,MatIconModule,MatFormFieldModule,ReactiveFormsModule,FormsModule],
  templateUrl: './punto-emision.component.html',
  styleUrl: './punto-emision.component.css'
})
export class PuntoEmisionComponent implements AfterViewInit,OnDestroy{
  displayedColumns=['acciones','puntoEmision','descripcion','correlativo','activo']
  puntoEmisionForm: FormGroup;
  dataSource = new MatTableDataSource();
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private toastr:ToastrService,
    private fb: FormBuilder,
    private localStorage:LocalService,
    private puntoEmisionService: FacturaService){
      this.puntoEmisionForm = this.fb.group({
        puntoEmision: ['', Validators.required],
        descripcion: ['', Validators.required],
        correlativo: ['', Validators.required],
        activo: [true],
      });
    }
  ngAfterViewInit(): void {
this.getPuntosEmision();
  }
  getPuntosEmision(){
    let id= this.localStorage.getItem("idCompania")
    this.puntoEmisionService.getById(id).subscribe((resp) => {
      let _data=resp['data']
      console.log(_data);
      const dataSource = [..._data]
      this.dataSource = new MatTableDataSource(dataSource);

    });
  }
  onSubmit(): void {
    console.log("to save");
    
    if (this.puntoEmisionForm.valid) {
      if (this.puntoEmisionForm.value._id) {
        this.puntoEmisionService
          .update(this.puntoEmisionForm.value._id, this.puntoEmisionForm.value)
          .subscribe((response) => {
            console.log('Punto de emisión actualizado:', response);
            this.resetForm();
          });
      } else {
        this.puntoEmisionService
          .create(this.puntoEmisionForm.value)
          .subscribe((response) => {
            console.log('Punto de emisión creado:', response);
            this.resetForm();
          });
      }
    }
    else{
      this.toastr.warning("Rellena todos los campos",'Warning')
    }
  }
  editPuntoEmision(puntoEmision: any): void {
    this.puntoEmisionForm.patchValue(puntoEmision);
  }

  deletePuntoEmision(id: string): void {
    if (confirm('¿Estás seguro de eliminar este punto de emisión?')) {
      this.puntoEmisionService.delete(id).subscribe((response) => {
        console.log('Punto de emisión eliminado:', response);

      });
    }
  }

  resetForm(): void {
    this.puntoEmisionForm.reset();
    this.puntoEmisionForm.patchValue({ activo: true });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
