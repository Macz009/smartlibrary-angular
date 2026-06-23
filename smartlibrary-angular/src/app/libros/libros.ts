import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { LibroService } from '../services/libro';

@Component({
  selector: 'app-libros',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './libros.html',
  styleUrl: './libros.css'
})
export class Libros {

  libro = {
    idAutor: null,
    idCategoria: null,
    titulo: '',
    editorial: '',
    paginas: 0,
    lanzamiento: 0
  };

  libros: any[] = [];

  idBuscar: number | null = null;
  libroEncontrado: any = null;

  idActualizar: number | null = null;

  libroActualizar = {
    idAutor: null,
    idCategoria: null,
    titulo: '',
    editorial: '',
    paginas: 0,
    lanzamiento: 0
  };

  idEliminar: number | null = null;

  constructor(private libroService: LibroService) { }

  guardarLibro(formLibro: any) {
    this.libroService.registrarLibro(this.libro).subscribe({
      next: (respuesta: any) => {
        alert('Libro registrado correctamente');

        this.libro = {
          idAutor: null,
          idCategoria: null,
          titulo: '',
          editorial: '',
          paginas: 0,
          lanzamiento: 0
        };

        formLibro.resetForm();
        this.listarLibros();
      }
    });
  }

  listarLibros() {
    this.libroService.listarLibros().subscribe({
      next: (respuesta: any) => {
        this.libros = respuesta;
      }
    });
  }

  buscarLibro() {
    if (this.idBuscar == null) {
      alert('Ingrese un ID de libro para buscar');
      return;
    }

    this.libroService.buscarLibro(this.idBuscar).subscribe({
      next: (respuesta: any) => {
        this.libroEncontrado = respuesta;
      },
      error: () => {
        alert('Libro no encontrado');
        this.libroEncontrado = null;
      }
    });
  }

  actualizarLibro(formActualizarLibro: any) {
    if (this.idActualizar == null) {
      alert('Ingrese el ID del libro a actualizar');
      return;
    }

    this.libroService.actualizarLibro(this.idActualizar, this.libroActualizar).subscribe({
      next: () => {

        alert('Libro actualizado correctamente');

        this.idActualizar = null;

        this.libroActualizar = {
          idAutor: null,
          idCategoria: null,
          titulo: '',
          editorial: '',
          paginas: 0,
          lanzamiento: 0
        };

        formActualizarLibro.resetForm();
        this.listarLibros();
      }
    });
  }

  eliminarLibro() {

    if (this.idEliminar == null) {
      alert('Ingrese el ID del libro a eliminar');
      return;
    }

    const confirmar = confirm(
      '¿Desea eliminar el libro con ID ' + this.idEliminar + '?'
    );

    if (!confirmar) {
      return;
    }

    this.libroService.eliminarLibro(this.idEliminar).subscribe({
      next: () => {
        alert('Libro eliminado correctamente');

        this.idEliminar = null;

        this.listarLibros();
      },
      error: () => {
        alert('Error al eliminar libro');
      }
    });
  }

}
