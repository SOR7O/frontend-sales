import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../api/api.service';
import { take, pipe, takeUntil, Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import {} from("@angular/material/table")
@Component({
  selector: 'app-compania',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatInputModule, MatCardModule, MatProgressBarModule, MatRadioModule, MatDividerModule, MatGridListModule, ReactiveFormsModule],
  templateUrl: './compania.component.html',
  styleUrl: './compania.component.css'
})
export class CompaniaComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  public update = false;

  public companyForm = new FormGroup({
    _id: new FormControl('', [Validators.required, Validators.minLength(1)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
    fecha: new FormControl('', [Validators.required, Validators.minLength(1)]),
    nombrePropietario: new FormControl('', [Validators.required, Validators.minLength(1)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(1)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(1)]),
    correo: new FormControl('', [Validators.required, Validators.minLength(1)]),
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
    is_activated: new FormControl(),
  });
  public showLoading = true;
  displayedColumns: string[] = [
    "acciones",
    "nombre",
    "fecha",
    "nombrePropietario",
    "telefono",
    "direccion",
    "correo",
    "is_activated"
  ];

  dataSource = new MatTableDataSource();
  constructor(private api: ApiService, private router: Router,private toastr:ToastrService) {
    // this.getCompania();
  }
  ngOnInit(): void {
    this.getCompania();

  }


  getCompania() {


    this.api.getCompanias().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      
      


      if (response['type'] == "ok" && response['data'].length > 0) {
        const dataSource = [...response['data']]
        this.dataSource = new MatTableDataSource(dataSource);
      } else {
        const dataSource = [...[]]
        this.dataSource = new MatTableDataSource(dataSource);
      }

    },error=>{
      this.toastr.error(error['statusText'],"Error")
    })
  }
  filtrar(e) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();

  }
  onSubmit() {
    if (!this.update) {

      this.api.createCompania(this.companyForm.value).pipe(take(1)).subscribe((response) => {

        this.companyForm.reset();
        this.toastr.success("Creado exitosamente","Exitosamente")


      },error=>{
        this.toastr.error(error['statusText'],"Error")
      })
    } else {
      this.api.updateCompania(this.companyForm.value).pipe(take(1)).subscribe((up) => {

        this.companyForm.reset();
        this.toastr.success("Creado exitosamente","Exitosamente")

      },error=>{
        this.toastr.error(error['statusText'],"Error")
      })
    }
    this.getCompania();
  }
  edit(row) {

    row['fecha'] = new Date().toISOString().slice(0, 10)
    

    this.companyForm.patchValue(row)
    this.update = true;

  }

  delete(row) {
    

    this.api.deleteCompania(row).pipe(take(1)).subscribe((res) => {
      this.getCompania();

    })
  }
  navigateAndRefresh() {
    this.getCompania();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
