import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ ESTE ES
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule // ✅ esto es lo que te faltaba
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.auth.login(username, password).subscribe({
        next: (res) => {
          if (res.tipo === 'miembro_mesa') {
            this.router.navigate(['/miembro-mesa']);
          } else if (res.tipo === 'votante') {
            this.router.navigate(['/votante']);
          }
        },
        error: (err) => {
          console.error(err);
          this.error = err.error?.error || 'Error desconocido';
        }
      });
    }
  }
}


