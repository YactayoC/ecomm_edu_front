import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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
  empleado: any = null;

  links = [
    { path: '/admin/empleados', label: 'Empleados', icon: 'people' },
    { path: '/admin/productos', label: 'Productos', icon: 'inventory_2' },
    {
      path: '/admin/proveedores',
      label: 'Proveedores',
      icon: 'local_shipping',
    },
    { path: '/admin/categorias', label: 'Categorías', icon: 'category' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedEmpleado = localStorage.getItem('empleado');
    if (storedEmpleado) {
      this.empleado = JSON.parse(storedEmpleado);
    }
  }

  logout() {
    localStorage.removeItem('empleado');
    this.router.navigate(['/login']);
  }
}
