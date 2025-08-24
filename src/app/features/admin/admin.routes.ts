import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../core/layout/admin-layout/admin-layout';
import { EmpleadosComponent } from './empleados/empleados';
import { ProveedoresComponent } from './proveedores/proveedores';
import { ProductosComponent } from './productos/productos';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'productos', component: ProductosComponent },
      { path: '', redirectTo: 'empleados', pathMatch: 'full' },
    ],
  },
];
