import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Pokemon } from './pokeService';

export interface PokemonEquipo extends Pokemon {
  rowId?: number; // Para identificar la fila en Google Sheets
}

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  // URL del Google Apps Script Web App
  private readonly apiUrl = 'https://script.google.com/macros/s/AKfycbxhxjFiDJ3_U9BiMt2YM5eAkttPVIlDav8iBAJXWv8STotCnbAtihW6GJzs2ly-8Awx/exec';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los pokémon del equipo
   */
  obtenerEquipo(): Observable<PokemonEquipo[]> {
    return this.http.get<any>(`${this.apiUrl}?action=getAll`)
      .pipe(
        map(response => response.data || response || []),
        catchError(error => {
          console.error('Error al obtener el equipo:', error);
          return throwError(() => new Error('No se pudo cargar el equipo'));
        })
      );
  }

  /**
   * Agregar un pokémon al equipo (usando GET para evitar CORS)
   */
  agregarPokemon(pokemon: Pokemon): Observable<any> {
    const params = new URLSearchParams();
    params.set('action', 'add');
    params.set('id', pokemon.id.toString());
    params.set('name', pokemon.name);
    params.set('image', pokemon.image);
    params.set('types', pokemon.types.join(','));
    
    return this.http.get<any>(`${this.apiUrl}?${params.toString()}`)
      .pipe(
        map(response => response.data || response),
        catchError(error => {
          console.error('Error al agregar pokémon:', error);
          return throwError(() => new Error('No se pudo agregar el pokémon al equipo'));
        })
      );
  }

  /**
   * Eliminar un pokémon del equipo (usando GET para evitar CORS)
   */
  eliminarPokemon(rowId: number): Observable<any> {
    const params = new URLSearchParams();
    params.set('action', 'delete');
    params.set('rowId', rowId.toString());
    
    return this.http.get<any>(`${this.apiUrl}?${params.toString()}`)
      .pipe(
        map(response => response.data || response),
        catchError(error => {
          console.error('Error al eliminar pokémon:', error);
          return throwError(() => new Error('No se pudo eliminar el pokémon'));
        })
      );
  }
}
