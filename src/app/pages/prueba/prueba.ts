import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Storedam } from '../../services/storedam';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prueba.html',
  styleUrls: ['./prueba.css']
})
export class Prueba {
  stores = inject(Storedam);
  usuario: string = ''; // Propiedad local
  
  enviar() {
    this.stores.enviar(this.usuario);
  }
}