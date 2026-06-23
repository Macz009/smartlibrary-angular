import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private apiUrl = 'http://localhost:8080/libro';

  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc4MjEwNjcwNSwiZXhwIjoxNzgyNTM4NzA1fQ.U9NtlcwdJKX5-UO84W8asYcRJ1OUj9K8W1Qab4sWBnA';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
  }

  registrarLibro(libro: any) {
    return this.http.post(this.apiUrl, libro, {
      headers: this.getHeaders()
    });
  }

  listarLibros() {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  buscarLibro(id: number) {
    return this.http.get(this.apiUrl + '/' + id, {
      headers: this.getHeaders()
    });
  }

  actualizarLibro(id: number, libro: any) {
    return this.http.put(this.apiUrl + '/' + id, libro, {
      headers: this.getHeaders()
    });
  }

  eliminarLibro(id: number) {
    return this.http.delete(this.apiUrl + '/' + id, {
      headers: this.getHeaders()
    });
  }

}