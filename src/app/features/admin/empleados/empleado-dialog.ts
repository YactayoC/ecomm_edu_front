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
import { Empleado } from './empleados';
import { Rol, RolService } from '../../../core/services/rol.service';

@Component({
  selector: 'app-empleado-dialog',
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
      {{ data ? 'Editar Empleado' : 'Agregar Empleado' }}
    </h2>
    <form [formGroup]="form" (ngSubmit)="guardar()" class="dialog-form">
      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Apellido</mat-label>
        <input matInput formControlName="apellido" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Rol</mat-label>
        <mat-select formControlName="rolId">
          <mat-option *ngFor="let rol of roles" [value]="rol.id">
            {{ rol.nombre }}
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
export class EmpleadoDialogComponent {
  form!: FormGroup;
  roles: Rol[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmpleadoDialogComponent>,
    private rolService: RolService,
    @Inject(MAT_DIALOG_DATA) public data: Empleado | null
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data?.id || null],
      nombre: [this.data?.nombre || '', Validators.required],
      apellido: [this.data?.apellido || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      rolId: [this.data?.rolId || null, Validators.required], // Selección por defecto
    });

    this.rolService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;

        if (this.data && this.data.rolId) {
          const rolExistente = this.roles.find(
            (r) => r.id === this.data!.rolId
          );
          if (rolExistente) {
            this.form.patchValue({ rolId: rolExistente.id });
          }
        }
      },
      error: (err) => console.error('Error cargando roles', err),
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
