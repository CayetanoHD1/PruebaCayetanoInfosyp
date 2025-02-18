import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Author } from '@shared/interfaces/author.interface';
import { AuthorsService } from '@shared/services/authors.service';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
  imports: [CommonModule, RouterModule, LoadingComponent],
})
export class AuthorComponent {
  authors: Author[] = [];
  totalRecords: number = 0;
  page: number = 1;
  pageSize: number = 20;
  totalPages: number = 0;
  pages: number[] = [];
  isLoading: boolean = true;

  constructor(
    private authorsService: AuthorsService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.getAuthors();
  }

  async getAuthors(): Promise<void> {
    try {
      const response = await this.authorsService.getAuthors(
        this.page,
        this.pageSize
      );
      this.authors = response.data;
      if (this.authors) {
        this.isLoading = false;
        this.loadingService.hide();
      }
      this.totalRecords = response.totalRecords;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    } catch (error) {
      console.error('Error al obtener autores', error);
      this.loadingService.hide();
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.getAuthors();
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
  async deleteAuthor(id: number): Promise<void> {
    try {
      await this.authorsService.deleteAuthor(id);
      this.authors = this.authors.filter((a) => a.id !== id);
      console.log('Autor eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el autor', error);
    }
  }
}
