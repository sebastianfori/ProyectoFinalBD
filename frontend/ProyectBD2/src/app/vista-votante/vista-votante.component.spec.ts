import { Component, OnInit } from '@angular/core';

interface Ballot {
  id: number;
  numero: number;
  partido: string;
  candidato: string;
  tipo: string;
  departamento: string;
  color: string;
}

interface Circuit {
  id: number;
  numero: string;
  establecimiento: string;
  departamento: string;
  barrio: string;
  direccion: string;
}

interface Message {
  type: 'success' | 'error';
  text: string;
}

@Component({
  selector: 'app-voter-view',
  templateUrl: './voter-view.component.html',
  styleUrls: ['./voter-view.component.scss']
})
export class VoterViewComponent implements OnInit {
  voter: { ci: string; credencial: string; nombre: string } | null = null;
  ballots: Ballot[] = [];
  selectedBallot: Ballot | null = null;
  circuit: Circuit | null = null;
  loading = false;
  message: Message | null = null;
  hasVoted = false;
  loginData = { ci: '', credencial: '' };

  mockBallots: Ballot[] = [
    { id: 1, numero: 15, partido: 'Partido Colorado', candidato: 'Juan Pérez', tipo: 'Intendente', departamento: 'Montevideo', color: '#FF6B6B' },
    { id: 2, numero: 40, partido: 'Partido Nacional', candidato: 'María González', tipo: 'Intendente', departamento: 'Montevideo', color: '#4ECDC4' },
    { id: 3, numero: 77, partido: 'Frente Amplio', candidato: 'Carlos Rodríguez', tipo: 'Intendente', departamento: 'Montevideo', color: '#45B7D1' },
    { id: 4, numero: 99, partido: 'Cabildo Abierto', candidato: 'Ana Martínez', tipo: 'Intendente', departamento: 'Montevideo', color: '#96CEB4' },
  ];

  mockCircuit: Circuit = {
    id: 1,
    numero: '001A',
    establecimiento: 'Escuela No. 1',
    departamento: 'Montevideo',
    barrio: 'Centro',
    direccion: '18 de Julio 1234'
  };

  ngOnInit(): void {}

  async handleLogin() {
    this.loading = true;
    this.message = null;

    await this.delay(1000);

    if (this.loginData.ci && this.loginData.credencial) {
      this.voter = {
        ci: this.loginData.ci,
        credencial: this.loginData.credencial,
        nombre: 'Votante Ejemplo'
      };
      this.ballots = this.mockBallots;
      this.circuit = this.mockCircuit;
      this.message = { type: 'success', text: 'Bienvenido al sistema de votación electrónica' };
    } else {
      this.message = { type: 'error', text: 'Por favor complete todos los campos' };
    }

    this.loading = false;
  }

  async handleVote(isBlank = false) {
    if (!isBlank && !this.selectedBallot) {
      this.message = { type: 'error', text: 'Debe seleccionar una papeleta para votar' };
      return;
    }

    this.loading = true;
    this.message = null;

    const voteData = {
      voterId: this.voter!.ci,
      credencial: this.voter!.credencial,
      circuitId: this.circuit!.id,
      ballotId: isBlank ? null : this.selectedBallot!.id,
      isBlank,
      timestamp: new Date().toISOString()
    };

    console.log('Enviando voto:', voteData);

    await this.delay(2000);

    this.hasVoted = true;
    this.message = {
      type: 'success',
      text: isBlank
        ? 'Su voto en blanco ha sido registrado exitosamente.'
        : `Su voto ha sido registrado exitosamente. Lista ${this.selectedBallot!.numero} - ${this.selectedBallot!.partido}`
    };

    this.loading = false;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

