import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { DataBinding } from './pages/data-binding/data-binding';
import { Directivas } from './pages/directivas/directivas';
import { Comunicacion } from './pages/comunicacion/comunicacion';
import { Formularios } from './pages/formularios/formularios';
import { Servicios } from './pages/servicios/servicios';
import { HttpClientComponent } from './pages/http-client/http-client';
import { Detalle } from './pages/detalle/detalle';
import { PokeApi } from  './pages/poke-api/poke-api';
import { PokeDetalles } from './pages/poke-detalles/poke-detalles';
import { EquipoPokemon } from './pages/equipo-pokemon/equipo-pokemon';

export const routes: Routes = [
  
    {
        path: 'inicio',
        component: Inicio
    },
    {
        path: 'data-binding',
        component: DataBinding
    },
    {
        path: 'directivas',
        component: Directivas
    },
    {
        path: 'comunicacion',
        component: Comunicacion
    },
    {
        path: 'formularios',
        component: Formularios
    },
    {
        path: 'servicios',
        component: Servicios
    },
    {
        path: 'http-client',
        component: HttpClientComponent
    },
    {
        path: 'detalle/:id',
        component: Detalle
    },
    {
        path: 'poke-api',
        component: PokeApi

    },
    {
        path: 'poke-detalles/:id',
        component: PokeDetalles
    },
    {
        path: 'equipo-pokemon',
        component: EquipoPokemon
    },
    {
        path: '',
        component: Inicio
    }
];