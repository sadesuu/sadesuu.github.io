import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.css',
})
export class DataBinding {
  // Interpolación
  textoInterpolacion = 'Data binding: interpolación';

  // Property Binding
  imagenUrl = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/570_f2.png';

  // Event Binding
  contadorEventos = 0;

  // Two-way Data Binding
  valor1 = 0;
  valor2 = 0;

  incrementarContador() {
    this.contadorEventos++;
  }
}
