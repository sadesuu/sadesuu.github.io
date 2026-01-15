import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Store {

  // Signal almacena mensajes compartidos
  private mensajeSignalPadre = signal<string>('');
  private mensajeSignalHijo = signal<string>('');

  //Exponer el signal como readonly

  readonly mensaje = this.mensajeSignalPadre.asReadonly()
  readonly mensajeHijo = this.mensajeSignalHijo.asReadonly()
  setMensajePadre(nuevoMensaje: string){
    this.mensajeSignalPadre.set(nuevoMensaje);
  }

  setMensajeHijo(nuevoMensaje: string){
    this.mensajeSignalHijo.set(nuevoMensaje);
  }

}
