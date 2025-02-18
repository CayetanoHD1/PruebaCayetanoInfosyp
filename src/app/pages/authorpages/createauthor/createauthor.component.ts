import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthorsService } from '@shared/services/authors.service';
import { BookService } from '@shared/services/book.service';
declare var bootstrap: any;

@Component({
  selector: 'app-createauthor',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './createauthor.component.html',
  styleUrl: './createauthor.component.css',
})
export class CreateauthorComponent implements OnInit {
  public createForm!: FormGroup;
  books: any[] = [];

  constructor(
    private authorsService: AuthorsService,
    private form: FormBuilder,
    private router: Router,
    private bookService: BookService
  ) {
    this.createForm = this.form.group({
      idBook: ['', [Validators.required, Validators.minLength(1)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      fastName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit(): void {
    this.getBooks();
  }

  async createAuthors(): Promise<void> {
    if (this.createForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    try {
      const newAuthor = this.createForm.value;
      await this.authorsService.createAuthor(newAuthor);
      this.router.navigate(['/authors']);
      console.log('Autor creado con éxito');
    } catch (error) {
      console.error('Error al crear autor', error);
    }
  }
  async getBooks(): Promise<void> {
    try {
      const response = await this.bookService.getBooks();
      this.books = response.data;
      console.log('book', this.books);
    } catch (error) {
      console.error('Error al obtener autores', error);
    }
  }
}
