import { Component, ViewChild ,OnInit,OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatBadgeModule } from '@angular/material/badge'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CookieService } from 'ngx-cookie-service';
import { LoadingComponent } from './loading/loading.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, 
    LoadingComponent,
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatSidenavModule, 
    MatListModule, 
    MatBadgeModule, 
    MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnChanges,OnInit{
  title = 'Ventas';

  badgevisible = false;
  headerVisible=false;

  constructor(private router:Router,private cookie:CookieService){
    if(this.cookie.get("token")){
      this.headerVisible=true;
    }
    console.log("lo cargoo");
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("initChanges");
      
  }
  ngOnInit(): void {
      console.log("init");
          if(this.cookie.get("token")){
      this.headerVisible=true;
    }
      
  }
  badgevisibility() {
    this.badgevisible = true;
  }
  filtro(e){
    console.log(e);
    
  }
}
