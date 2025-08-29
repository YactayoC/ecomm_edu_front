import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ProductoDialogComponent } from './producto-dialog';
import { ProductoConfirmDialogComponent } from './producto-confirm-dialog';
import { ProductoService } from '../../../core/services/productos.service';

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoriaId: number;
  proveedorId: number;
}

@Component({
  selector: 'app-productos',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSpinner,
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class ProductosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'proveedor',
    'categoria',
    'precio',
    'stock',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Producto>([]);
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource.filterPredicate = (data: Producto, filter: string) => {
      const term = filter.trim().toLowerCase();
      return (
        String(data.id).toLowerCase().includes(term) ||
        data.nombre.toLowerCase().includes(term) ||
        (data.descripcion?.toLowerCase().includes(term) ?? false) ||
        String(data.precio).includes(term) ||
        String(data.stock).includes(term)
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cargarProductos();
  }

  cargarProductos() {
    this.isLoading = true;
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.dataSource.data = productos;
        console.log(productos);
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

  abrirDialog(producto?: Producto) {
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      width: '420px',
      data: producto ? { ...producto } : null,
    });

    console.log(producto);

    dialogRef.afterClosed().subscribe((result: Producto | undefined) => {
      if (!result) return;

      if (producto) {
        console.log(producto);
        this.productoService
          .actualizarProducto(producto.id, {
            ...result,
            categoriaId: result.categoriaId,
            proveedorId: result.proveedorId,
          })
          .subscribe(() => this.cargarProductos());
      } else {
        console.log(result);
        this.productoService
          .crearProducto(result)
          .subscribe(() => this.cargarProductos());
      }
    });
  }

  eliminarProducto(producto: Producto) {
    const dialogRef = this.dialog.open(ProductoConfirmDialogComponent, {
      width: '360px',
      data: {
        mensaje: `¿Seguro que deseas eliminar el producto "${producto.nombre}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.productoService
          .eliminarProducto(producto.id)
          .subscribe(() => this.cargarProductos());
      }
    });
  }
}
