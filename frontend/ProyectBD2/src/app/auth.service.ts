import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3001/api/auth/login', { cedula: username, password }, {
      withCredentials: true, // ⬅️ MUY IMPORTANTE para enviar/recibir cookies
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }}










