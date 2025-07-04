import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
  //  Nueva ruta para votos observados
  {
    path: 'votosobservados',
    loadComponent: () =>
      import('./vista-votosobservados/vista-votosobservados.component').then(m => m.VotosObservadosComponent)
  },
  { path: '**', redirectTo: 'login' }
];
