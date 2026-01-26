import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Corredor {
  dorsal: string;
  corredor: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://dam.colegiolitterator.es/php/bbdd.php';

  constructor(private http: HttpClient) {}

  obtenerCorredores(): Observable<Corredor[]> {
    return this.http.get<Corredor[]>(this.apiUrl);
  }
}