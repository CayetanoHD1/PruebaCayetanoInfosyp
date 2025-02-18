import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { IAuthor } from '@shared/interfaces/author.interface';
import { IBooks } from '@shared/interfaces/books.interface';

import { AuthorsService } from '@shared/services/authors.service';
import { BookService } from '@shared/services/book.service';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-author-detail',
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.css',
})
export class AuthorDetailComponent {
  authors!: IAuthor;
  books!: IBooks;

  constructor(
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private booksService: BookService,
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
      this.authors = await this.authorsService.getAuthorById(id);
      this.detailtBook();
      console.log('Autor obtenido:', this.authors);
    } catch (error) {
      console.error('Error al obtener autor', error);
      this.loadingService.hide();
    }
  }
  async detailtBook() {
    try {
      this.books = await this.booksService.getBooksById(this.authors.idBook);
      console.log('book obtenido:', this.authors);
      this.loadingService.hide();
    } catch (error) {
      console.error('Error al obtener autor', error);
      this.loadingService.hide();
    }
  }
}
