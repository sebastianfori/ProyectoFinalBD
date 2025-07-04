import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-inicio.component.html',
  styleUrls: ['./vista-inicio.component.scss']
})
export class VistaInicioComponent {

  constructor(private router: Router) {}

  irAVotante() {
    this.router.navigate(['/votante']);
  }

  irAPresidenteMesa() {
    this.router.navigate(['/presidentemesa']);
  }

}
