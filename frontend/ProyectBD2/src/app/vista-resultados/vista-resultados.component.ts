import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PresidenteService } from '../presidente.service';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-resultados.component.html',
  styleUrls: ['./vista-resultados.component.scss']
})
export class VistaResultadosComponent implements OnInit {
  circuito = {
    numero: 123,
    establecimiento: 'Escuela Nº1',
    direccion: 'Calle Falsa 123',
    departamento: 'Montevideo'
  };

  resumen: any = null;
  mensajeError = '';

  constructor(
    private router: Router,
    private presidenteService: PresidenteService
  ) {}

  ngOnInit() {
    this.presidenteService.getResumenVotos().subscribe({
      next: (data) => {
        this.resumen = data;
      },
      error: (err) => {
        this.mensajeError = err?.error?.error || 'Error al obtener los resultados.';
      }
    });
  }

  volver() {
    this.router.navigate(['/presidentemesa']);
  }
}
