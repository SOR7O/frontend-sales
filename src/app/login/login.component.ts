import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card"
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button"
import { BehaviorSubject, Observable, take } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from 'ngx-toastr';
import { LocalService } from '../services/local.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  login = false;
  constructor(
    private toastr: ToastrService,
    private api: ApiService, private router: Router, private cookie: CookieService, private lst: LocalService) {

    if (this.cookie.get("token").length == 0) {
      this.login = true;
    }

  }

  onSubmit() {



    if (this.loginForm.valid) {
      try {

        const { email, password } = this.loginForm.value;
        this.api.login(email, password).pipe(take(1)).subscribe((response) => {


          if (response['message'] == 'Logged in') {
            const myDate: Date = new Date();
            this.cookie.set("token", response["token"],myDate.getHours() + 1 );
            this.lst.setItem('typeUser', response['typeUser'])
            this.lst.setItem('idUser', response['idUser'])
            this.lst.setItem('idCompania', response['idCompania'])
            this.toastr.success("Iniciado sesion", "Exitosamente")
            setTimeout(() => {
              window.location.reload();
            }, 3000);
            return;
          }

          this.toastr.warning(response['message'],"Warning")


        },error=>{
          console.log("error here?");
          console.log(error);
          
          this.toastr.error(error['statusText'],"Error")
          
        });
      } catch (e) {
        
        
        this.toastr.error("Ha ocurrido u","Exitosamente")

      }

    }
  }
  ngOnInit(): void {

  }
}
