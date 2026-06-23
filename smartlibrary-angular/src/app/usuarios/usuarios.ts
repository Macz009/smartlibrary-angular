import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { UsuarioService } from '../services/usuario';

@Component({
  selector: 'app-usuarios',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {

  usuario = {
    idPersona: null,
    user: '',
    password: '',
    tipoUsuario: ''
  };

  usuarios: any[] = [];

  idBuscar: number | null = null;
  usuarioEncontrado: any = null;

  idActualizar: number | null = null;

  usuarioActualizar = {
    idPersona: null,
    user: '',
    password: '',
    tipoUsuario: ''
  };

  idEliminar: number | null = null;

  constructor(private usuarioService: UsuarioService) { }

  guardarUsuario(formUsuario: any) {
    this.usuarioService.registrarUsuario(this.usuario).subscribe({
      next: (respuesta: any) => {
        console.log('Usuario registrado:', respuesta);
        alert('Usuario registrado correctamente');

        this.usuario = {
          idPersona: null,
          user: '',
          password: '',
          tipoUsuario: ''
        };

        formUsuario.resetForm();
        this.listarUsuarios();
      },
      error: (error: any) => {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario');
      }
    });
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (respuesta: any) => {
        this.usuarios = respuesta;
        console.log('Lista de usuarios:', respuesta);
      },
      error: (error: any) => {
        console.error('Error al listar usuarios:', error);
        alert('Error al listar usuarios');
      }
    });
  }

  buscarUsuario() {
    if (this.idBuscar == null) {
      alert('Ingrese un ID para buscar');
      return;
    }

    this.usuarioService.buscarUsuario(this.idBuscar).subscribe({
      next: (respuesta: any) => {
        this.usuarioEncontrado = respuesta;
        console.log('Usuario encontrado:', respuesta);
      },
      error: (error: any) => {
        console.error('Error al buscar usuario:', error);
        alert('Usuario no encontrado');
        this.usuarioEncontrado = null;
      }
    });
  }

  actualizarUsuario(formActualizar: any) {
    if (this.idActualizar == null) {
      alert('Ingrese el ID del usuario a actualizar');
      return;
    }

    this.usuarioService.actualizarUsuario(this.idActualizar, this.usuarioActualizar).subscribe({
      next: (respuesta: any) => {
        console.log('Usuario actualizado:', respuesta);
        alert('Usuario actualizado correctamente');

        this.idActualizar = null;

        this.usuarioActualizar = {
          idPersona: null,
          user: '',
          password: '',
          tipoUsuario: ''
        };

        formActualizar.resetForm();
        this.listarUsuarios();
      },
      error: (error: any) => {
        console.error('Error al actualizar usuario:', error);
        alert('Error al actualizar usuario');
      }
    });
  }

  eliminarUsuario() {
    if (this.idEliminar == null) {
      alert('Ingrese el ID del usuario a eliminar');
      return;
    }

    const confirmar = confirm('¿Está seguro de eliminar el usuario con ID ' + this.idEliminar + '?');

    if (!confirmar) {
      return;
    }

    this.usuarioService.eliminarUsuario(this.idEliminar).subscribe({
      next: () => {
        alert('Usuario eliminado correctamente');
        console.log('Usuario eliminado');

        this.idEliminar = null;
        this.listarUsuarios();
      },
      error: (error: any) => {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario');
      }
    });
  }

}