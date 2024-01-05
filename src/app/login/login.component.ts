import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card"
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button"
import { BehaviorSubject, Observable, take } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor(private api: ApiService, private router: Router) { }

  onSubmit() {

    if (this.loginForm.valid) {
      const isAuthenticated = true;
      try {

        const { email, password } = this.loginForm.value;
        this.api.login(email, password).pipe(take(1)).subscribe((response) => {

          if (response['message'] == 'Logged in') {
            sessionStorage.setItem("token", response.token)
              
              this.router.navigate(['company']);

          }


        });
      } catch (e) {


      }

    }
  }
}
