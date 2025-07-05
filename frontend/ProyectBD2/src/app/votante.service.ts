import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  VotanteService {
  private baseUrl = 'http://localhost:3001/api/votantes';

  constructor(private http: HttpClient) {}

  emitirVoto(
    papeletaId: number,
    VotoExcepcional: 'blanco' | 'anulado' | 'normal' = 'normal'
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/votar`, { papeletaId, VotoExcepcional}, {
    withCredentials: true
  }); //);
  }

}
