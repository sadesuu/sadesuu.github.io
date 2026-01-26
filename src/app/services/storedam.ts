import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storedam {
  
  //1. Creamos el elemento a compartir
  usuario_selected = signal<string>("")

  enviar(nuevoTexto:string){
    this.usuario_selected.set(nuevoTexto)
  }
}
