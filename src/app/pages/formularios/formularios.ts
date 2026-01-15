import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formularios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formularios.html',
  styleUrl: './formularios.css',
})
export class Formularios {
  loginForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido1: new FormControl('', Validators.required),
    apellido2: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(10),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{10,15}$/)
    ]),
  })

  enviar(){
    console.log(this.loginForm.value)
  }
}
