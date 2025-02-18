import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Author } from '@shared/interfaces/author.interface';
import { AuthorsService } from '@shared/services/authors.service';
import { BookService } from '@shared/services/book.service';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-updateauthor',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './updateauthor.component.html',
  styleUrl: './updateauthor.component.css',
})
export class UpdateauthorComponent implements OnInit {
  authors!: Author;
  public updateForm!: FormGroup;
  books: any[] = [];
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorsService: AuthorsService,
    private form: FormBuilder,
    private booksService: BookService,
    public loadingService: LoadingService
  ) {
    this.updateForm = this.form.group({
      idBook: ['', [Validators.required, Validators.minLength(1)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      fastName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  async ngOnInit() {
    this.loadingService.show();
    await this.getBooks();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      await this.detailt(this.id);
      this.updateForm.patchValue({
        firstName: this.authors.firstName,
        fastName: this.authors.fastName,
        idBook: this.authors.idBook,
      });
    }
    this.loadingService.hide();
  }
  async detailt(id: number) {
    try {
      this.authors = await this.authorsService.getAuthorById(id);

      console.log('Autor obtenido:', this.authors);
    } catch (error) {
      console.error('Error al obtener autor', error);
    }
  }

  async updateAuthors(): Promise<void> {
    if (this.updateForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    try {
      const newAuthor = this.updateForm.value;
      await this.authorsService.updateAuthor(this.id, newAuthor);
      this.router.navigate(['/authors']);
      console.log('Autor creado con éxito');
    } catch (error) {
      console.error('Error al crear autor', error);
    }
  }
  async getBooks(): Promise<void> {
    try {
      const response = await this.booksService.getBooks();
      this.books = response.data;
      console.log('book', this.books);
    } catch (error) {
      console.error('Error al obtener autores', error);
    }
  }
}
