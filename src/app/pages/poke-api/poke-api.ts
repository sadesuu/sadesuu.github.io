import { Component } from '@angular/core';
import { PokeService, Pokemon } from '../../services/pokeService';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poke-api',
  imports: [AsyncPipe, CommonModule, RouterLink, FormsModule],
  templateUrl: './poke-api.html',
  styleUrl: './poke-api.css',
})
export class PokeApi {
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
  // Colores CSS para el borde superior
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

  pokeService = inject(PokeService);

  pokemonsList$!: Observable<Pokemon[]>;
  filteredPokemonsList$!: Observable<Pokemon[]>;
  searchTerm$ = new BehaviorSubject<string>('');
  searchTerm: string = '';

  ngOnInit(): void {
    // Cargar todos los pokémon de una vez
    this.pokemonsList$ = this.pokeService.listarPokemons();

    // Observable filtrado basado en el término de búsqueda
    this.filteredPokemonsList$ = combineLatest([
      this.pokemonsList$,
      this.searchTerm$
    ]).pipe(
      map(([pokemons, searchTerm]) => {
        if (!searchTerm.trim()) {
          return pokemons;
        }
        return pokemons.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }

  getTypeColor(type: string): string {
    return this.typeColorMap[type] || this.typeColorMap['default'];
  }

  onSearchChange(): void {
    this.searchTerm$.next(this.searchTerm);
  }
}