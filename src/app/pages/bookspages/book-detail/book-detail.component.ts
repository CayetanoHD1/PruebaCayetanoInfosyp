import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Author } from '@shared/interfaces/author.interface';
import { AuthorsService } from '@shared/services/authors.service';
import { BookService } from '@shared/services/book.service';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-book-detail',
  imports: [RouterModule, CommonModule, LoadingComponent],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent implements OnInit {
  books: any;
  authors: Author[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorsService,
    public loadingService: LoadingService
  ) {}
  async ngOnInit(): Promise<void> {
    this.loadingService.show();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      await this.detailt(id);
    }
  }
  async detailt(id: number) {
    try {
      await this.getByIdAuthorBook(id);
      this.books = await this.bookService.getBooksById(id);
      console.log('Autor obtenido:', this.books);
      await this.getByIdAuthorBook(id);
    } catch (error) {
      console.error('Error al obtener autor', error);
      this.loadingService.hide();
    }
  }
  async getByIdAuthorBook(idBook: number): Promise<void> {
    try {
      const res = await this.authorService.getByIdeAuthorBook(idBook);
      this.authors = res;
      if (this.authors) {
        this.isLoading = false;
      }
      this.loadingService.hide();
      console.log('Autor obtenido con éxito by id', this.authors);
    } catch (error) {
      console.error('Error al obtener el autor', error);
      this.loadingService.hide();
    }
  }
}
