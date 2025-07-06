// src/app/services/presidente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PresidenteService {
  private baseUrl = 'http://localhost:3001/api/presidentes';

  constructor(private http: HttpClient) {}

  actualizarEstadoMesa(estado: '1' | '0'): Observable<any> {
    return this.http.post(`${this.baseUrl}/actualizar-estado-mesa`, { estado }, {
      withCredentials: true // ✅ Envia cookies con la solicitud
    });
  }
    buscarVotante(cedula: string) {
    return this.http.get<any>(`http://localhost:3001/api/presidentes/buscar-votante/${cedula}`, {
      withCredentials: true
    });
  }

  observarVoto(cedula: string) {
    return this.http.post<any>('http://localhost:3001/api/presidentes/observar-voto', { cedula }, {
      withCredentials: true
    });
  }
  getResumenVotos() {
  return this.http.get<any>('http://localhost:3001/api/presidentes/resumen-votos', {
    withCredentials: true
  });
}
}
