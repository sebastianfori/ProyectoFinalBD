import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VistaVotanteComponent } from './vista-votante/vista-votante.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'votante', component: VistaVotanteComponent },
  // rutas
  {
    path: '',
    redirectTo: '/votante',
    pathMatch: 'full'
  }
];
