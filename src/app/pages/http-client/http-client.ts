import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnosService, Alumno } from '../../services/alumnos.service';

@Component({
  selector: 'app-http-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './http-client.html',
  styleUrl: './http-client.css',
})
export class HttpClient implements OnInit {
  alumnos: Alumno[] = [];
  alumnoSeleccionado: Alumno | null = null;
  modoEdicion: boolean = false;
  
  nuevoAlumno: Alumno = {
    nombre: '',
    apellido: '',
    edad: 0
  };

  constructor(private alumnosService: AlumnosService) {}

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnosService.getAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data;
      },
      error: (error) => {
        console.error('Error al cargar alumnos:', error);
        alert('Error al conectar con el servidor. Asegúrate de que el backend esté ejecutándose.');
      }
    });
  }

  crearAlumno() {
    if (!this.nuevoAlumno.nombre || !this.nuevoAlumno.apellido) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.alumnosService.createAlumno(this.nuevoAlumno).subscribe({
      next: (alumno) => {
        this.alumnos.push(alumno);
        this.limpiarFormulario();
        alert('Alumno creado exitosamente');
      },
      error: (error) => {
        console.error('Error al crear alumno:', error);
        alert('Error al crear el alumno');
      }
    });
  }

  editarAlumno(alumno: Alumno) {
    this.modoEdicion = true;
    this.alumnoSeleccionado = { ...alumno };
    this.nuevoAlumno = { ...alumno };
  }

  actualizarAlumno() {
    if (!this.alumnoSeleccionado?.id) return;

    this.alumnosService.updateAlumno(this.alumnoSeleccionado.id, this.nuevoAlumno).subscribe({
      next: (alumnoActualizado) => {
        const index = this.alumnos.findIndex(a => a.id === this.alumnoSeleccionado?.id);
        if (index !== -1) {
          this.alumnos[index] = alumnoActualizado;
        }
        this.cancelarEdicion();
        alert('Alumno actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar alumno:', error);
        alert('Error al actualizar el alumno');
      }
    });
  }

  eliminarAlumno(id: number | undefined) {
    if (!id) return;
    
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      this.alumnosService.deleteAlumno(id).subscribe({
        next: () => {
          this.alumnos = this.alumnos.filter(a => a.id !== id);
          alert('Alumno eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar alumno:', error);
          alert('Error al eliminar el alumno');
        }
      });
    }
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.alumnoSeleccionado = null;
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.nuevoAlumno = {
      nombre: '',
      apellido: '',
      edad: 0
    };
  }
}
