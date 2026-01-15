import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Store } from '../../store';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [],
  templateUrl: './hijo.html',
  styleUrl: './hijo.css'
})
export class Hijo {
// @Input: recibe datos del padre
  @Input() mensajeDelPadre: string = '';

  // @Output: emite eventos al padre
  @Output() mensajeEmitido = new EventEmitter<string>();

  enviarMensaje(mensaje: string) {
    // Emitir el evento con el mensaje
    this.mensajeEmitido.emit(mensaje);
  }
  constructor(private store: Store) {}

  mostrarDesdeStoreHijo(nuevoMensaje: string){
    this.store.setMensajeHijo(nuevoMensaje);
  }
  
}
