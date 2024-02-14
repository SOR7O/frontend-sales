import {
  Component,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
  NgZone,
  ɵglobal,
  AfterViewInit,
  importProvidersFrom,
  inject,
  ApplicationRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";

import { NavbarComponent } from "./navbar/navbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatDrawerContent, MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatBadgeModule } from "@angular/material/badge";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CookieService } from "ngx-cookie-service";
import { LoadingComponent } from "./loading/loading.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ToastrService } from "ngx-toastr";
import { SocketServiceService } from "./socketService/socket-service.service";
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion'
import { Subject, debounceTime, fromEvent, take } from "rxjs";
import { CarPedidoComponent } from "./pedidos/car-pedido/car-pedido.component";
import { ApiService } from "./api/api.service";
import Swal from 'sweetalert2';
import { LocalService } from "./services/local.service";

@Component({
  selector: "app-root",
  standalone: true,
  host: { ngSkipHydration: 'true' },
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [

    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    LoadingComponent,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    NavbarComponent,
    MatListModule,
    MatBadgeModule,
    MatFormFieldModule,
    NavbarComponent,
    MatExpansionModule,
    CarPedidoComponent,
    MatDrawerContent
  ],
})
export class AppComponent implements OnChanges, OnInit, AfterViewInit {
  toUpdate: boolean;

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  title = "Ventas";

  badgevisible = false;
  headerVisible = false;
  badgeCounter = 0;

  private ngZone = inject(NgZone);


  ngAfterViewInit() {

  }

  constructor(
    private router: Router,
    private cookie: CookieService,
    private toastr: ToastrService,
    private serLocal: LocalService,
    private socketService: SocketServiceService,
    private service: ApiService
  ) {

    const ngZone = ɵglobal.Zone;
    if (this.cookie.get("token")) {
      this.headerVisible = true;
    }
    const TaskTrackingZone = ngZone.current._parent?._properties?.TaskTrackingZone;

    if (!TaskTrackingZone) {
      return;
    }

    inject(ApplicationRef).isStable.subscribe(stable => {
      this.printNgZone(TaskTrackingZone, 0);
      console.log('Is stable:', stable);
    });

    this.printNgZone(TaskTrackingZone, 2000);

  }
  private printNgZone(zone: any, delay: number): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Print to the console all pending tasks
        // (micro tasks, macro tasks and event listeners):
        console.debug('👀 Pending tasks in NgZone: 👀');
        console.debug({
          microTasks: zone.getTasksFor('microTask'),
          macroTasks: zone.getTasksFor('macroTask'),
          eventTasks: zone.getTasksFor('eventTask')
        });

      }, delay);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {

    let count: [] = this.serLocal.getItem('pedido');
    this.badgeCounter = count != undefined ? count.length : 0;

  }
  ngOnInit(): void {


    if (this.cookie.get("token")) {
      this.headerVisible = true;
      let count: [] = this.serLocal.getItem('pedido');
      this.badgeCounter = count != undefined ? count.length : 0;
      this.socketService.connect();
      this.socketService.listenPedidos().subscribe((val) => {
        this.badgeCounter = val;

      })
    }
  }
  badgevisibility() {


    this.badgevisible = true;
    // this.socketService.test()
  }
  CloseModel() {
    const modelDiv = document.getElementById("myModalPedido");
    if (modelDiv != null) {
      modelDiv.style.display = "none";

    }
  }
  confirmar() {
    let pedido = this.serLocal.getItem('pedido');
    this.service.createPedido(pedido).pipe(take(1)).subscribe((resp) => {

      if (resp['type'] == "ok") {
        this.toastr.success("Pedido enviado");
        this.socketService.test(0);
        this.CloseModel();
        this.serLocal.removeItem('pedido');
      }
    }, error => {
      this.toastr.error(error['statusText'], "Error")

    });
  }
  openModel() {
    const modelDiv = document.getElementById("myModalPedido");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }
  cancelarUpdate() {
    this.toUpdate = false;

  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
