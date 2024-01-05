import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';
import { CompaniaComponent } from './compania/compania.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent ,pathMatch:'full'},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'company', component: CompaniaComponent, canActivate: [AuthGuard] },

];
