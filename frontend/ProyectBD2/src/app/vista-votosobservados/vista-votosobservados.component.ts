import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresidenteService } from '../presidente.service';

@Component({
  selector: 'app-vista-votosobservados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vista-votosobservados.component.html',
  styleUrls: ['./vista-votosobservados.component.scss']
})
export class VistaVotosObservadosComponent {
  cedula = '';
  votante: any = null;
  mensajeExito = '';
  mensajeError = '';

  constructor(private presidenteService: PresidenteService) {}

  buscarVotante() {
    this.presidenteService.buscarVotante(this.cedula).subscribe({
      next: (data) => {
        this.votante = data;
        this.mensajeError = '';
      },
      error: (err) => {
        this.votante = null;
        this.mensajeError = err?.error?.error || 'Error al buscar el votante.';
      }
    });
  }

  observarVoto() {
    if (!this.votante?.usuario?.Cedula) return;
    this.presidenteService.observarVoto(this.votante.usuario.Cedula).subscribe({
      next: (data) => {
        this.mensajeExito = data.message || 'Voto observado con éxito.';
        setTimeout(() => (this.mensajeExito = ''), 3000);
      },
      error: (err) => {
        this.mensajeError = err?.error?.error || 'Error al observar el voto.';
        setTimeout(() => (this.mensajeError = ''), 3000);
      }
    });
  }
}
