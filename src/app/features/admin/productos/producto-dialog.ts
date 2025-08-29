import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Producto } from './productos';
import { Categoria } from '../categorias/categorias';
import { Proveedor } from '../proveedores/proveedores';
import { CategoriaService } from '../../../core/services/categoria.service';
import { ProveedorService } from '../../../core/services/proveedor.service';

@Component({
  selector: 'app-producto-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  template: `
    <h2 mat-dialog-title>
      {{ data ? 'Editar Producto' : 'Agregar Producto' }}
    </h2>
    <form [formGroup]="form" (ngSubmit)="guardar()" class="dialog-form">
      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Descripción</mat-label>
        <textarea matInput formControlName="descripcion"></textarea>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Precio</mat-label>
        <input
          matInput
          type="number"
          step="0.01"
          formControlName="precio"
          required
        />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Stock</mat-label>
        <input matInput type="number" formControlName="stock" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Categoría</mat-label>
        <mat-select formControlName="categoriaId">
          <mat-option
            *ngFor="let categoria of categorias"
            [value]="categoria.id"
          >
            {{ categoria.nombre }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Proveedor</mat-label>
        <mat-select formControlName="proveedorId">
          <mat-option
            *ngFor="let proveedor of proveedores"
            [value]="proveedor.id"
          >
            {{ proveedor.nombre }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" (click)="cerrar()">Cancelar</button>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="form.invalid"
        >
          Guardar
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .dialog-form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 8px;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 12px;
      }
    `,
  ],
})
export class ProductoDialogComponent {
  form!: FormGroup;
  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto | null,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data?.id || null],
      nombre: [this.data?.nombre || '', Validators.required],
      descripcion: [this.data?.descripcion || ''],
      precio: [
        this.data?.precio || 0,
        [Validators.required, Validators.min(0)],
      ],
      stock: [this.data?.stock || 0, [Validators.required, Validators.min(0)]],
      categoriaId: [this.data?.categoriaId || null, Validators.required],
      proveedorId: [this.data?.proveedorId || null, Validators.required],
    });

    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });

    this.proveedorService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
