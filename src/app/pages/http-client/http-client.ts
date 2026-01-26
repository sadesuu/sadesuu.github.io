import { Component } from '@angular/core';
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
  corredores: Corredor[] = [];
  
  constructor(private apiService: ApiService) {}
  
  obtenerCorredores() {
    this.apiService.obtenerCorredores().subscribe({
      next: (datos) => {
        this.corredores = datos;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}