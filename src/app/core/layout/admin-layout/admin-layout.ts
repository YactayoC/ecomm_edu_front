import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayoutComponent {
  opened = true;
  links = [
    { path: '/admin/empleados', label: 'Empleados' },
    { path: '/admin/productos', label: 'Productos' },
    { path: '/admin/proveedores', label: 'Proveedores' },
    { path: '/admin/categorias', label: 'Categorías' },
  ];

  showInfo(link: any) {
    console.log('Info de:', link);
  }
}
