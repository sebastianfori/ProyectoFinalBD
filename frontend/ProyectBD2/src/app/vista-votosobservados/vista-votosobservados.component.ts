import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-votos-observados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vista-votosobservados.component.html',
  styleUrls: ['./vista-votosobservados.component.scss']
})
export class VotosObservadosComponent {

  votantesObservados: any[] = [];
  filtroCedula: string = '';

  constructor(private http: HttpClient) {
    this.obtenerVotantesObservados();
  }

  obtenerVotantesObservados() {
    this.http.get<any[]>('http://localhost:3000/votosobservados').subscribe({
      next: (data) => {
        this.votantesObservados = data;
      },
      error: (err) => {
        console.error('Error al obtener votantes observados:', err);
      }
    });
  }

  aprobarVotante(id: number) {
    this.http.post('http://localhost:3000/votosobservados/aprobar', {
      id: id,
      aprobado: true
    }).subscribe({
      next: () => {
        this.obtenerVotantesObservados();
      },
      error: (err) => {
        console.error('Error al aprobar votante:', err);
      }
    });
  }

  get votantesFiltrados() {
    if (!this.filtroCedula) {
      return this.votantesObservados;
    }
    return this.votantesObservados.filter(v =>
      v.cedula.includes(this.filtroCedula)
    );
  }

}
