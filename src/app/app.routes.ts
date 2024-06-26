import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';
import { CompaniaComponent } from './compania/compania.component';
import { LoadingComponent } from './loading/loading.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { PedidosComponent } from './pedidos/pedidos.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'company', component: CompaniaComponent, canActivate: [AuthGuard] },
    { path: 'clientes', component: ClientesComponent,canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
    { path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuard] }

];
