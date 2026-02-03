import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PokeService, Pokemon } from '../../services/pokeService';
import { EquipoService } from '../../services/equipo.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-poke-detalles',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './poke-detalles.html',
  styleUrl: './poke-detalles.css',
})
export class PokeDetalles implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokeService = inject(PokeService);
  private equipoService = inject(EquipoService);
  
  pokemon$!: Observable<Pokemon>;
  pokemonId!: number;
  currentPokemon: Pokemon | null = null;

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

  ngOnInit(): void {
    this.pokemonId = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemon$ = this.pokeService.getPokemonDetails(
      `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`
    );
    
    // Suscribirse para guardar el pokémon actual
    this.pokemon$.subscribe(pokemon => {
      this.currentPokemon = pokemon;
    });
  }

  getTypeClass(type: string): string {
    return this.typeColors[type] || this.typeColors['default'];
  }

  agregarAlEquipo(): void {
    if (!this.currentPokemon) {
      alert('Error: No se pudo cargar el pokémon');
      return;
    }

    this.equipoService.agregarPokemon(this.currentPokemon)
      .subscribe({
        next: () => {
          alert(`¡${this.currentPokemon!.name} ha sido añadido a tu equipo!`);
          this.router.navigate(['/equipo-pokemon']);
        },
        error: (err) => {
          console.error('Error al agregar al equipo:', err);
          alert('Error al agregar el pokémon al equipo. Verifica la configuración de Google Sheets.');
        }
      });
  }
}
