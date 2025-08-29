import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  form!: FormGroup;
  hidePassword: boolean = true;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.form.valid) {
      this.loading = true;

      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          this.loading = false;

          localStorage.setItem(
            'empleado',
            JSON.stringify({
              id: response.id,
              nombre: response.nombre,
              apellido: response.apellido,
              email: response.email,
            })
          );

          this.snackBar.open(
            `Bienvenido ${response.nombre} ${response.apellido}`,
            'Cerrar',
            { duration: 2500 }
          );

          this.router.navigate(['/admin/empleados']);
        },
        error: (error) => {
          this.loading = false;

          const backendMessage =
            error.error?.message || 'Ocurrió un error inesperado';

          this.snackBar.open(backendMessage, 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }
}
