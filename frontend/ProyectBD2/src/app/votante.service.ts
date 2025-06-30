import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  private baseUrl = 'http://localhost:3000/api/votacion';

  constructor(private http: HttpClient) {}

  getPapeletas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/papeletas`);
  }

  emitirVoto(papeletaId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/emitir`, { papeletaId });
  }
}
