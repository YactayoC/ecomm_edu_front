import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './features/admin/admin.routes';
import { LoginComponent } from './features/auth/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    children: ADMIN_ROUTES,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
