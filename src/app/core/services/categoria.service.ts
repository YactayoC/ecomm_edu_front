import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../features/admin/categorias/categorias';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  createCategoria(categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  updateCategoria(
    id: number,
    categoria: Partial<Categoria>
  ): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
