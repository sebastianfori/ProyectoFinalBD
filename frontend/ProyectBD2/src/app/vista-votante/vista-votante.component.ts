import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PapeletasService } from '../papeletas.service';
import { VotanteService } from '../votante.service';

interface Candidato {
  id: number;
  nombre: string;
  cargo: string;
}

interface Papeleta {
  numeroLista: number;
  partido: string;
  color: string;
  candidatos: Candidato[];
  tipo: 'normal' | 'blanco' | 'anulado';
}

@Component({
  selector: 'app-vista-votante',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './vista-votante.component.html',
  styleUrls: ['./vista-votante.component.scss']
})
export class VistaVotanteComponent implements OnInit {
  papeletas: Papeleta[] = [];
  papeletaSeleccionada: number | null = null;
  votoConfirmado = false;
  mostrarConfirmacion = false;
  fechaActual = new Date();

  constructor(
    private votacionService: PapeletasService,
    private votanteService: VotanteService // ✅ Servicio correctamente inyectado
  ) {}

  ngOnInit() {
    this.cargarPapeletas();
  }

  cargarPapeletas() {
    this.votacionService.obtenerListas().subscribe({
      next: listas => {
        this.papeletas = listas.map(lista => ({
          numeroLista: lista.Numero_Lista,
          partido: lista.Partido,
          color: this.generarColor(lista.ID_Lista),
          tipo: 'normal',
          candidatos: [
            {
              id: lista.Presidente.ID_Candidato,
              nombre: `${lista.Presidente.Nombre} ${lista.Presidente.Apellido}`,
              cargo: 'Presidente'
            },
            {
              id: lista.Vicepresidente.ID_Candidato,
              nombre: `${lista.Vicepresidente.Nombre} ${lista.Vicepresidente.Apellido}`,
              cargo: 'Vicepresidente'
            }
          ]
        }));

        this.papeletas.push(
          {
            numeroLista: 999,
            partido: 'Voto en Blanco',
            color: '#CCCCCC',
            tipo: 'blanco',
            candidatos: []
          },
          {
            numeroLista: 998,
            partido: 'Voto Anulado',
            color: '#FF0000',
            tipo: 'anulado',
            candidatos: []
          }
        );
      },
      error: err => {
        console.error('Error al cargar papeletas:', err);
      }
    });
  }

  generarColor(id: number): string {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFD166'];
    return colors[id % colors.length];
  }

  seleccionarPapeleta(papeletaId: number) {
    if (this.votoConfirmado) return;
    this.papeletaSeleccionada = papeletaId;
  }

  confirmarVoto() {
    if (this.papeletaSeleccionada === null) {
      alert('Por favor, seleccione una papeleta antes de votar.');
      return;
    }
    this.mostrarConfirmacion = true;
  }

  efectuarVoto() {
    const papeleta = this.getPapeletaSeleccionada();
    if (!papeleta) return;

    this.votanteService.emitirVoto(papeleta.numeroLista, papeleta.tipo).subscribe({
      next: () => {
        this.votoConfirmado = true;
        this.mostrarConfirmacion = false;
      },
      error: err => {
        console.error('Error al registrar el voto:', err);
        alert(err.error?.error || 'Error al registrar el voto.');
        this.mostrarConfirmacion = false;
      }
    });
  }

  cancelarVoto() {
    this.mostrarConfirmacion = false;
  }

  getPapeletaSeleccionada(): Papeleta | undefined {
    return this.papeletas.find(p => p.numeroLista === this.papeletaSeleccionada);
  }

  reiniciarVoto() {
    this.papeletaSeleccionada = null;
    this.votoConfirmado = false;
    this.mostrarConfirmacion = false;
  }
}
