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
  constructor(private api: ApiService, private router: Router, private cookie: CookieService) {
    console.log(this.cookie.get("token"));
    console.log(this.cookie.get("token").length==0);
    
    if (this.cookie.get("token").length==0) {
      this.login = true;
    }

  }

  onSubmit() {
    console.log(this.cookie.getAll());


    if (this.loginForm.valid) {
      const isAuthenticated = true;
      try {

        const { email, password } = this.loginForm.value;
        this.api.login(email, password).pipe(take(1)).subscribe((response) => {
          console.log(response);

          if (response['message'] == 'Logged in') {
            this.cookie.set("token", response["token"]);
            this.router.navigate(['/dashboard']);
            // window.location.reload();
          }


        });
      } catch (e) {
        console.log(e);


      }

    }
  }
  ngOnInit(): void {
    console.log("111");

  }
}
