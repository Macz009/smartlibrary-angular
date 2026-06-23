import { Component, signal } from '@angular/core';
import { Usuarios } from './usuarios/usuarios';
import { Libros } from './libros/libros';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Usuarios, Libros, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('smartlibrary-angular');

  moduloSeleccionado = '';

  mostrarUsuarios() {
    this.moduloSeleccionado = 'usuarios';
  }

  mostrarLibros() {
    this.moduloSeleccionado = 'libros';
  }

}