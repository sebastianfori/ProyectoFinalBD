import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Candidato {
  ID_Candidato: number;
  Nombre: string;
  Apellido: string;
}

interface ListaAPI {
  ID_Lista: number;
  Numero_Lista: number;
  Partido: string;
  Presidente: Candidato;
  Vicepresidente: Candidato;
}

@Injectable({ providedIn: 'root' })
export class PapeletasService {
  constructor(private http: HttpClient) {}

  obtenerListas(): Observable<ListaAPI[]> {
    return this.http.get<ListaAPI[]>('http://localhost:3001/api/votantes/view', {
    withCredentials: true
  }); // Ajustá la URL si es necesario
  }
}