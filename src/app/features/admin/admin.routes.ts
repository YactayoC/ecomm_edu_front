import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../core/layout/admin-layout/admin-layout';
import { EmpleadosComponent } from './empleados/empleados';
import { ProveedoresComponent } from './proveedores/proveedores';
import { ProductosComponent } from './productos/productos';
import { CategoriasComponent } from './categorias/categorias';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: '', redirectTo: 'empleados', pathMatch: 'full' },
    ],
  },
];
