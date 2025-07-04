import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //  home
  {
    path: 'inicio',
    loadComponent: () =>
      import('./vista-inicio/vista-inicio.component').then(m => m.VistaInicioComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'votante',
    loadComponent: () =>
      import('./vista-votante/vista-votante.component').then(m => m.VistaVotanteComponent)
  },
  {
    path: 'presidentemesa',
    loadComponent: () =>
      import('./vista-presidentemesa/vista-presidentemesa.component').then(m => m.PresidenteMesaComponent)
  },
  {
    path: 'resultados',
    loadComponent: () =>
      import('./vista-resultados/vista-resultados.component').then(m => m.VistaResultadosComponent)
  },
  {
    path: 'votosobservados',
    loadComponent: () =>
      import('./vista-votosobservados/vista-votosobservados.component').then(m => m.VotosObservadosComponent)
  },
  { path: '**', redirectTo: 'inicio' } // 
];

