import { Component, inject, OnInit } from '@angular/core';
import { Storedam } from '../services/storedam';

@Component({
  selector: 'app-prueba2',
  imports: [],
  templateUrl: './prueba2.html',
  styleUrl: './prueba2.css',
})
export class Prueba2 implements OnInit{

  store = inject(Storedam)
  datosdelstore: string | undefined

  ngOnInit(): void{
    this.datosdelstore = this.store.usuario_selected()

  }
}
