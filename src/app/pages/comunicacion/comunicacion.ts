import { Component } from '@angular/core';
import { Padre } from './padre/padre/padre';
import { Hijo } from './hijo/hijo/hijo';
import { Store } from './store';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService, Pokemon } from '../../services/alumnos.service';

@Component({
  selector: 'app-comunicacion',
  imports: [Padre],
  templateUrl: './comunicacion.html',
  styleUrl: './comunicacion.css',
})
export class Comunicacion {

  alumnos: Pokemon[] = [];

  constructor(
    public store: Store, 
    private router: Router,
    private route: ActivatedRoute,
    private alumnosService: AlumnosService
  ) {
    this.alumnos = this.alumnosService.getPokemons();
  }

  enviarAlStorePadre() {
    this.store.setMensajePadre('Mensaje desde el Padre');
  }

  enviarAlStoreHijo() {
    this.store.setMensajeHijo('Mensaje desde el Hijo');
  }

  verDetalle(alumno: any){
    this.router.navigate(['/detalle', alumno.id]);
  }

}
