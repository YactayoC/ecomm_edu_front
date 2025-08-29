import { Component, Inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmar</h2>
    <mat-dialog-content>
      {{ data.mensaje }}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cerrar(false)">Cancelar</button>
      <button mat-raised-button color="warn" (click)="cerrar(true)">
        Eliminar
      </button>
    </mat-dialog-actions>
  `,
})
export class ProveedorConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ProveedorConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {}

  cerrar(confirmado: boolean) {
    this.dialogRef.close(confirmado);
  }
}
