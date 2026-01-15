import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hijo } from '../../hijo/hijo/hijo';
import { Store } from '../../store';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [FormsModule, Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.css'
})
export class Padre {
  mensajeParaHijo: string = 'Hola desde el padre';
  mensajeDelHijo: string = '';

  recibirMensaje(mensaje: string) {
    this.mensajeDelHijo = mensaje;
  }

  constructor(private store: Store){}

  enviarAlStorePadre(){
    this.store.setMensajePadre('Mensaje desde el Padre')
  }
}
