import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { AuthorsService } from '@shared/services/authors.service';
import { BookService } from '@shared/services/book.service';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  book: any[] = [];
  totalRecords: number = 0;
  page: number = 1;
  pageSize: number = 20;
  totalPages: number = 0;
  pages: number[] = [];
  isLoading: boolean = true;

  constructor(
    private bookService: BookService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  async getBooks(): Promise<void> {
    try {
      this.loadingService.show();
      const response = await this.bookService.getAuthorsPaginated(
        this.page,
        this.pageSize
      );
      this.book = response.data;
      if (this.book) {
        this.loadingService.hide();
        this.isLoading = false;
      }
      this.totalRecords = response.totalRecords;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      console.log(this.book, 'books');
    } catch (error) {
      console.error('Error al obtener autores', error);
      this.loadingService.hide();
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.getBooks();
    }
  }

  getVisiblePages(): number[] {
    const startPage = Math.max(1, this.page - 5);
    const endPage = Math.min(this.totalPages, startPage + 9);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
  async deleteBook(id: number): Promise<void> {
    this.loadingService.show();
    try {
      await this.bookService.deleteBook(id);
      this.book = this.book.filter((a) => a.id !== id);
      this.loadingService.hide();
      console.log('Autor eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el autor', error);
      this.loadingService.hide();
    }
  }
  goToCreateBook() {
    this.router.navigate(['/create-books']);
  }
}
