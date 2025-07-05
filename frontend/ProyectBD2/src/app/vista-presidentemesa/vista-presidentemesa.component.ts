import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PresidenteService } from '../presidente.service';

@Component({
  selector: 'app-presidente-mesa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-presidentemesa.component.html',
  styleUrls: ['./vista-presidentemesa.component.scss']
})
export class PresidenteMesaComponent {
  constructor(
    private router: Router,
    private presidenteService: PresidenteService
  ) {}

  mostrarConfirmacion = false;
  accionPendiente: 'abrir' | 'cerrar' | null = null;
  mensajeExito = '';
  mensajeError = '';

  confirmarAccion() {
    const estado = this.accionPendiente === 'abrir' ? '1' : '0';

    this.presidenteService.actualizarEstadoMesa(estado).subscribe({
      next: () => {
        this.mensajeExito =
          this.accionPendiente === 'abrir'
            ? 'Mesa abierta con éxito.'
            : 'Mesa cerrada con éxito.';

        if (this.accionPendiente === 'cerrar') {
          this.router.navigate(['/resultados']);
        }

        setTimeout(() => (this.mensajeExito = ''), 3000);
      },
      error: (err) => {
        this.mensajeError = err?.error?.error || 'Error al cambiar el estado de la mesa.';
        setTimeout(() => (this.mensajeError = ''), 3000);
      },
      complete: () => {
        this.mostrarConfirmacion = false;
        this.accionPendiente = null;
      }
    });
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

  verVotosObservados() {
    this.router.navigate(['/votosobservados']);
  }
}
