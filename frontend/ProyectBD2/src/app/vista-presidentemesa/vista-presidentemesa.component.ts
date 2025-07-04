import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presidente-mesa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-presidentemesa.component.html',
  styleUrls: ['./vista-presidentemesa.component.scss']
})
export class PresidenteMesaComponent {

  constructor(private router: Router) {}

  mostrarConfirmacion = false;
  accionPendiente: 'abrir' | 'cerrar' | null = null;
  mensajeExito = '';

  confirmarAccion() {
    if (this.accionPendiente === 'abrir') {
      console.log("Mesa abierta");
      this.mensajeExito = 'Mesa abierta con éxito.';
    } else if (this.accionPendiente === 'cerrar') {
      console.log("Mesa cerrada");
      this.mensajeExito = 'Mesa cerrada con éxito.';

      // Redirigir a resultados de escrutinio
      this.router.navigate(['/resultados']);
    }

    this.mostrarConfirmacion = false;
    this.accionPendiente = null;

    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }

  cancelarAccion() {
    this.mostrarConfirmacion = false;
    this.accionPendiente = null;
  }

  abrirMesa() {
    this.accionPendiente = 'abrir';
    this.mostrarConfirmacion = true;
  }

  cerrarMesa() {
    this.accionPendiente = 'cerrar';
    this.mostrarConfirmacion = true;
  }

}
