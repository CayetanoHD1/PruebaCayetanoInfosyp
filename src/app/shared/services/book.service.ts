import { Injectable } from '@angular/core';
import { HttprequestService } from './httprequest.service';
const routes = {
  book: () => 'Books',
}
@Injectable({
  providedIn: 'root'
})
export class BookService {

   constructor
    (
      private http:HttprequestService
    ) 
    { }

    async getBooks(): Promise<any> {
      return await this.http.get(`books`);
    }
    async getAuthorsPaginated(page: number = 1, pageSize: number = 20): Promise<any> {
      return await this.http.get(`books?page=${page}&pageSize=${pageSize}`);
    }
    async deleteBook(id: number): Promise<any> {
      return await this.http.delete(`${routes.book()}/${id}`);
    }
    async getBooksById(id: number): Promise<any> {
      return await this.http.get(`${routes.book()}/${id}`);
    }
    async createBooks(booksData: FormData): Promise<any> {
      return await this.http.post(routes.book(), booksData);
    }
    async updateBooks(id: number, booksData: FormData): Promise<any> {
      return await this.http.put(`${routes.book()}/${id}`, booksData);
    }
}
