import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';

export interface Pokemon {
  id: number;          // Número de la Pokédex
  name: string;        // Nombre
  image: string;       // Imagen oficial
  types: string[];     // Tipos (fire, water, etc.)
}

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  readonly #endpoint = 'https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) {}
  
  listarPokemons(limit: number = 1500, offset: number = 0): Observable<Pokemon[]> {
        return this.http.get<any>(`${this.#endpoint}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        mergeMap(res =>
          forkJoin<Pokemon[]>(
            res.results.map((pkmn: any) => this.getPokemonDetails(pkmn.url))
          )
        )
      );
  }

    getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<any>(url).pipe(
      map(res => ({
        id: res.id,
        name: res.name,
        image: res.sprites?.other?.['official-artwork']?.front_default ?? '',
        types: res.types.map((t: any) => t.type.name)
      }))
    );
  }
}
