import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-impuesto',
  standalone: true,
  imports: [],
  templateUrl: './impuesto.component.html',
  styleUrl: './impuesto.component.css'
})
export class ImpuestoComponent implements OnInit,OnDestroy{
  private destroy$: Subject<void> = new Subject<void>();
  impuestoForm=new FormGroup({
    _id:new FormControl(''),
    nombre:new FormControl('',[Validators.required]),
    correlativo:new FormControl('',[Validators.required]),
    valor:new FormControl('',[Validators.required]),
  });

  displayedcolumns= ['nombre','correlativo','valor'];
  dataSource = new MatTableDataSource();


  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getImpuestos(){
    // const dataSource = [...response['data']]
    // this.dataSource = new MatTableDataSource(dataSource);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
