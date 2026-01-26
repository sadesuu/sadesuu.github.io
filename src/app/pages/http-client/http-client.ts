import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Corredor } from '../../services/api';

@Component({
  selector: 'app-http-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-client.html',
  styleUrl: './http-client.css'
})
export class HttpClientComponent {

  cargando = signal(false);
  corredores: Corredor[] = [];
  
  constructor(private apiService: ApiService) {}
  
  obtenerCorredores() {
     
    this.cargando.set(true);

    this.apiService.obtenerCorredores().subscribe({
      next: (datos) => {
        this.corredores = datos;
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}