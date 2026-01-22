import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pokemon {
  id: number;
  nombre: string;
  tipos: string[];
  habilidades: string[];
  altura: number;
  peso: number;
  foto: string;
}

// Nueva interfaz para alumnos
export interface Alumno {
  id?: number;
  nombre: string;
  apellido: string;
  edad: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private apiUrl = 'http://localhost:3000/api/alumnos';

  private pokemons: Pokemon[] = [
    {
      id: 1,
      nombre: 'Pikachu',
      tipos: ['Eléctrico'],
      habilidades: ['Impactrueno', 'Ataque Rápido', 'Rayo'],
      altura: 0.4,
      peso: 6.0,
      foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
    },
    {
      id: 2,
      nombre: 'Charizard',
      tipos: ['Fuego', 'Volador'],
      habilidades: ['Lanzallamas', 'Vuelo', 'Garra Dragón'],
      altura: 1.7,
      peso: 90.5,
      foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png'
    },
    {
      id: 3,
      nombre: 'Blastoise',
      tipos: ['Agua'],
      habilidades: ['Hidrobomba', 'Pistola Agua', 'Protección'],
      altura: 1.6,
      peso: 85.5,
      foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png'
    },
    {
      id: 4,
      nombre: 'Venusaur',
      tipos: ['Planta', 'Veneno'],
      habilidades: ['Rayo Solar', 'Látigo Cepa', 'Bomba Germen'],
      altura: 2.0,
      peso: 100.0,
      foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png'
    },
    {
      id: 5,
      nombre: 'Gengar',
      tipos: ['Fantasma', 'Veneno'],
      habilidades: ['Bola Sombra', 'Hipnosis', 'Come Sueños'],
      altura: 1.5,
      peso: 40.5,
      foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png'
    },
    {
      id: 6,
      nombre: 'Dragonite',
      tipos: ['Dragón', 'Volador'],
      habilidades: ['Furia Dragón', 'Ala de Acero', 'Hiperrayo'],
      altura: 2.2,
      peso: 210.0,
      foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png'
    },
  ];

  constructor(private http: HttpClient) { }

  // Métodos para ALUMNOS (Base de datos)
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  getAlumnoById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  createAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno);
  }

  deleteAlumno(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Métodos para POKEMONS (Local)
  getPokemons() {
    return this.pokemons;
  }

  getPokemonById(id: number) {
    return this.pokemons.find(pokemon => pokemon.id === id);
  }
}