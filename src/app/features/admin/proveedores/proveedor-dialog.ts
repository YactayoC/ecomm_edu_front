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
import { Proveedor } from './proveedores';

@Component({
  selector: 'app-proveedor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>
      {{ data ? 'Editar Proveedor' : 'Agregar Proveedor' }}
    </h2>
    <form [formGroup]="form" (ngSubmit)="guardar()" class="dialog-form">
      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Contacto</mat-label>
        <input matInput formControlName="contacto" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Teléfono</mat-label>
        <input matInput formControlName="telefono" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Dirección</mat-label>
        <textarea matInput formControlName="direccion"></textarea>
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
      textarea {
        min-height: 60px;
      }
    `,
  ],
})
export class ProveedorDialogComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proveedor | null
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data?.id || null],
      nombre: [this.data?.nombre || '', Validators.required],
      contacto: [this.data?.contacto || ''],
      telefono: [this.data?.telefono || ''],
      email: [this.data?.email || '', Validators.email],
      direccion: [this.data?.direccion || ''],
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
