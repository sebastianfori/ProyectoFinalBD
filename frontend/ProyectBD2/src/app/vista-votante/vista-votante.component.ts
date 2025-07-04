import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PapeletasService } from '../papeletas.service'; // Asegurate de importar bien

interface Candidato {
  id: number;
  nombre: string;
  cargo: string;
}

interface Papeleta {
  id: number;
  numeroLista: number;
  partido: string;
  color: string;
  candidatos: Candidato[];
  tipo: 'lista' | 'blanco' | 'anulado';
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

  circuito = {
    numero: 'A-001',
    establecimiento: 'Escuela No. 15',
    departamento: 'Montevideo',
    direccion: 'Av. 18 de Julio 1234'
  };

  constructor(private votacionService: PapeletasService) {}

  ngOnInit() {
    this.cargarPapeletas();
  }

  cargarPapeletas() {
    this.votacionService.obtenerListas().subscribe({
      next: listas => {
        console.log('Listas recibidas del backend:', listas);
        this.papeletas = listas.map(lista => ({
          id: lista.ID_Lista,
          numeroLista: lista.Numero_Lista,
          partido: lista.Partido,
          color: this.generarColor(lista.ID_Lista), // opcional: genera un color por lista
          tipo: 'lista',
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

        // Agregar voto en blanco al final
        this.papeletas.push({
          id: 999,
          numeroLista: 999,
          partido: 'Voto en Blanco',
          color: '#CCCCCC',
          tipo: 'blanco',
          candidatos: []
        });
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
    console.log('Voto efectuado para papeleta ID:', this.papeletaSeleccionada);
    this.votoConfirmado = true;
    this.mostrarConfirmacion = false;

    setTimeout(() => {
      alert('¡Su voto ha sido registrado correctamente!');
    }, 1000);
  }

  cancelarVoto() {
    this.mostrarConfirmacion = false;
  }

  getPapeletaSeleccionada(): Papeleta | undefined {
    return this.papeletas.find(p => p.id === this.papeletaSeleccionada);
  }

  reiniciarVoto() {
    this.papeletaSeleccionada = null;
    this.votoConfirmado = false;
    this.mostrarConfirmacion = false;
  }
}
