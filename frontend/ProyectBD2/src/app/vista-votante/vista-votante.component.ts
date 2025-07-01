import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  
  // Información del circuito
  circuito = {
    numero: 'A-001',
    establecimiento: 'Escuela No. 15',
    departamento: 'Montevideo',
    direccion: 'Av. 18 de Julio 1234'
  };

  ngOnInit() {
    this.cargarPapeletas();
  }

  cargarPapeletas() {
    // Datos de ejemplo -agregar srervio despues

    
    // this.papeletas = [
    //   {
    //     id: 1,
    //     numeroLista: 15,
    //     partido: 'Partido Colorado',
    //     color: '#FF6B6B',
    //     tipo: 'lista',
    //     candidatos: [
    //       { id: 1, nombre: 'Juan Pérez', cargo: 'Intendente' },
    //       { id: 2, nombre: 'María González', cargo: 'Edil Titular' },
    //       { id: 3, nombre: 'Carlos López', cargo: 'Edil Suplente' }
    //     ]
    //   },
    //   {
    //     id: 2,
    //     numeroLista: 25,
    //     partido: 'Partido Nacional',
    //     color: '#4ECDC4',
    //     tipo: 'lista',
    //     candidatos: [
    //       { id: 4, nombre: 'Ana Martínez', cargo: 'Intendente' },
    //       { id: 5, nombre: 'Roberto Silva', cargo: 'Edil Titular' },
    //       { id: 6, nombre: 'Laura Rodríguez', cargo: 'Edil Suplente' }
    //     ]
    //   },
    //   {
    //     id: 3,
    //     numeroLista: 35,
    //     partido: 'Frente Amplio',
    //     color: '#45B7D1',
    //     tipo: 'lista',
    //     candidatos: [
    //       { id: 7, nombre: 'Diego Fernández', cargo: 'Intendente' },
    //       { id: 8, nombre: 'Patricia Morales', cargo: 'Edil Titular' },
    //       { id: 9, nombre: 'Andrés Castro', cargo: 'Edil Suplente' }
    //     ]
    //   },
    //   {
    //     id: 4,
    //     numeroLista: 999,
    //     partido: 'Voto en Blanco',
    //     color: '#E8E8E8',
    //     tipo: 'blanco',
    //     candidatos: []
    //   }
    // ];
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
    // lógica para enviar el voto al backend
    console.log('Voto efectuado para papeleta ID:', this.papeletaSeleccionada);
    
    this.votoConfirmado = true;
    this.mostrarConfirmacion = false;
    
    // Simular envío al servidor
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