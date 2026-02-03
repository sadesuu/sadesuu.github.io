import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EquipoService, PokemonEquipo } from '../../services/equipo.service';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-equipo-pokemon',
  imports: [CommonModule, AsyncPipe, FormsModule, RouterLink],
  templateUrl: './equipo-pokemon.html',
  styleUrl: './equipo-pokemon.css',
})
export class EquipoPokemon implements OnInit {
  private equipoService = inject(EquipoService);
  private router = inject(Router);
  
  equipo$!: Observable<PokemonEquipo[]>;
  
  typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    ice: 'bg-cyan-300',
    fighting: 'bg-orange-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-stone-500',
    ghost: 'bg-violet-700',
    dark: 'bg-gray-800',
    dragon: 'bg-indigo-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
    default: 'bg-gray-400'
  };

  private typeColorMap: Record<string, string> = {
    normal: '#9ca3af',
    fire: '#ef4444',
    water: '#3b82f6',
    grass: '#22c55e',
    electric: '#facc15',
    ice: '#67e8f9',
    fighting: '#c2410c',
    poison: '#a855f7',
    ground: '#ca8a04',
    flying: '#a5b4fc',
    psychic: '#ec4899',
    bug: '#84cc16',
    rock: '#78716c',
    ghost: '#6d28d9',
    dark: '#1f2937',
    dragon: '#3730a3',
    steel: '#6b7280',
    fairy: '#f9a8d4',
    default: '#9ca3af'
  };

  ngOnInit(): void {
    // Cargar al inicio
    this.cargarEquipo();
    
    // Recargar cada vez que se navega a esta página
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url === '/equipo-pokemon') {
        this.cargarEquipo();
      }
    });
  }

  cargarEquipo(): void {
    this.equipo$ = this.equipoService.obtenerEquipo();
  }

  getTypeColor(type: string): string {
    return this.typeColorMap[type] || this.typeColorMap['default'];
  }

  eliminarPokemon(pokemon: PokemonEquipo): void {
    if (!pokemon.rowId) {
      console.error('No se puede eliminar: falta rowId');
      return;
    }

    if (confirm(`¿Estás seguro de que quieres eliminar a ${pokemon.name} del equipo?`)) {
      this.equipoService.eliminarPokemon(pokemon.rowId)
        .subscribe({
          next: () => {
            console.log('Pokémon eliminado correctamente');
            this.cargarEquipo();
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            alert('Error al eliminar el pokémon. Intenta de nuevo.');
          }
        });
    }
  }
}
