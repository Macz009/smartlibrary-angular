import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuario';

  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc4MjEwNjcwNSwiZXhwIjoxNzgyNTM4NzA1fQ.U9NtlcwdJKX5-UO84W8asYcRJ1OUj9K8W1Qab4sWBnA';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
  }

  registrarUsuario(usuario: any) {
    return this.http.post(this.apiUrl, usuario, {
      headers: this.getHeaders()
    });
  }

  listarUsuarios() {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  buscarUsuario(id: number) {
    return this.http.get(this.apiUrl + '/' + id, {
      headers: this.getHeaders()
    });
  }

  actualizarUsuario(id: number, usuario: any) {
    return this.http.put(this.apiUrl + '/' + id, usuario, {
      headers: this.getHeaders()
    });
  }

  eliminarUsuario(id: number) {
    return this.http.delete(this.apiUrl + '/' + id, {
      headers: this.getHeaders()
    });
  }

}