import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriaDialogComponent } from './categoria-dialog';
import { EmpleadoConfirmDialogComponent } from '../empleados/empleado-confirm-dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../core/services/categoria.service';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

@Component({
  selector: 'app-categorias',
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
    MatSpinner,
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class CategoriasComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<Categoria>([]);
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource.filterPredicate = (data: Categoria, filter: string) => {
      const term = filter.trim().toLowerCase();
      return (
        String(data.id).toLowerCase().includes(term) ||
        data.nombre.toLowerCase().includes(term) ||
        (data.descripcion?.toLowerCase().includes(term) ?? false)
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.isLoading = true;
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.dataSource.data = categorias;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  aplicarFiltro(event: Event) {
    const value = (event.target as HTMLInputElement).value || '';
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  abrirDialog(categoria?: Categoria) {
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      width: '420px',
      data: categoria ? { ...categoria } : null,
    });

    dialogRef.afterClosed().subscribe((result: Categoria | undefined) => {
      if (!result) return;

      if (categoria) {
        this.categoriaService
          .updateCategoria(categoria.id, {
            nombre: result.nombre,
            descripcion: result.descripcion,
          })
          .subscribe(() => this.cargarCategorias());
      } else {
        this.categoriaService
          .createCategoria({
            nombre: result.nombre,
            descripcion: result.descripcion,
          })
          .subscribe(() => this.cargarCategorias());
      }
    });
  }

  eliminarCategoria(categoria: Categoria) {
    const dialogRef = this.dialog.open(EmpleadoConfirmDialogComponent, {
      width: '360px',
      data: {
        mensaje: `¿Seguro que deseas eliminar la categoría "${categoria.nombre}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.categoriaService
          .deleteCategoria(categoria.id)
          .subscribe(() => this.cargarCategorias());
      }
    });
  }
}
