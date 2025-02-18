import { Injectable } from '@angular/core';
import { HttprequestService } from './httprequest.service';
const routes = {
  authors: () => 'authors',
  authorsbook : () => 'authors/authors/books'
}
@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor
  (
    private http:HttprequestService
  ) 
  { }
  
  // Obtener todos los autores
 /* async getAuthors(): Promise<any> {
    return await this.http.get(routes.authors());
  }*/

  async getAuthors(page: number = 1, pageSize: number = 20): Promise<any> {
    return await this.http.get(`authors?page=${page}&pageSize=${pageSize}`);
  }

  // Obtener un autor por ID
  async getAuthorById(id: number): Promise<any> {
    return await this.http.get(`${routes.authors()}/${id}`);
  }

  // Crear un nuevo autor
  async createAuthor(authorData: any): Promise<any> {
    return await this.http.post(routes.authors(), authorData);
  }

  // Actualizar un autor por ID
  async updateAuthor(id: number, authorData: FormData): Promise<any> {
    return await this.http.put(`${routes.authors()}/${id}`, authorData);
  }

  // Eliminar un autor por ID
  async deleteAuthor(id: number): Promise<any> {
    return await this.http.delete(`${routes.authors()}/${id}`);
  }
  async getByIdeAuthorBook(idBook: number): Promise<any> {
    return await this.http.get(`${routes.authorsbook()}/${idBook}`);
  }
  

  
}
