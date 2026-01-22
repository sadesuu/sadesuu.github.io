import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlumnosService, Pokemon } from '../../services/alumnos.service';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle implements OnInit {
  alumno: Pokemon | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alumno = this.alumnosService.getPokemonById(parseInt(id));
    }
  }

  volver() {
    this.router.navigate(['/comunicacion']);
  }
}
