import { Component ,ViewChild ,OnInit,OnChanges, SimpleChanges} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatBadgeModule } from '@angular/material/badge'
import { MatFormFieldModule } from '@angular/material/form-field'
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ 
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatSidenavModule, 
    MatListModule, 
    MatBadgeModule, 
    MatFormFieldModule
  ],
    templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  title = 'Ventas';
  badgevisible = false;

  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("initChanges");
      
  }

  ngOnInit(): void {
      console.log("iqnit");
      
  }
  badgevisibility() {
    this.badgevisible = true;
  }
  someMethod() {
    this.trigger.openMenu();

  }
  filtro(e){
    console.log(e);
    
  }
  foo = 'Hello';
  bar = 'World';
  changeFn(e) {
    this.foo = e.target.value;
  }
  modelChangeFn(value) {
    this.bar = value;
  }
}