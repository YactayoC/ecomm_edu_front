import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpleadoDialogComponent } from './empleado-dialog';
import { EmpleadoConfirmDialogComponent } from './empleado-confirm-dialog';
import { EmpleadoService } from '../../../core/services/empleado.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeDetectorRef } from '@angular/core';

export interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rolId: number;
  rolNombre: string;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class EmpleadosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'email',
    'rol',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Empleado>([]);
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.isLoading = true;
    this.empleadoService.getEmpleados().subscribe({
      next: (empleados) => {
        this.dataSource.data = empleados;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando empleados', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value || '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  agregarEmpleado() {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((nuevoEmpleado: Empleado | undefined) => {
      if (nuevoEmpleado) {
        this.empleadoService
          .createEmpleado(nuevoEmpleado)
          .subscribe(() => this.cargarEmpleados());
      }
    });
  }

  editarEmpleado(empleado: Empleado) {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      width: '400px',
      data: { ...empleado },
    });

    dialogRef
      .afterClosed()
      .subscribe((empleadoEditado: Empleado | undefined) => {
        if (empleadoEditado) {
          this.empleadoService
            .updateEmpleado(empleado.id!, empleadoEditado)
            .subscribe(() => this.cargarEmpleados());
        }
      });
  }

  eliminarEmpleado(empleado: Empleado) {
    const dialogRef = this.dialog.open(EmpleadoConfirmDialogComponent, {
      width: '350px',
      data: {
        mensaje: `¿Seguro que deseas eliminar a ${empleado.nombre} ${empleado.apellido}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.empleadoService
          .deleteEmpleado(empleado.id!)
          .subscribe(() => this.cargarEmpleados());
      }
    });
  }
}
