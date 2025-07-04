import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-resultados.component.html',
  styleUrls: ['./vista-resultados.component.scss']
})
export class VistaResultadosComponent {

  constructor(private router: Router) {}

  // Datos simulados (reemplazá con tu API)
  circuito = {
    numero: 123,
    establecimiento: 'Escuela Nº1',
    direccion: 'Calle Falsa 123',
    departamento: 'Montevideo'
  };

  resultados = [
    { numeroLista: 1, partido: 'Partido A', votos: 120 },
    { numeroLista: 2, partido: 'Partido B', votos: 95 },
    { numeroLista: 3, partido: 'Partido C', votos: 78 },
    { numeroLista: 'Blanco', partido: 'Voto en blanco', votos: 12 }
  ];

  volver() {
    this.router.navigate(['/presidentemesa']);
  }

}
