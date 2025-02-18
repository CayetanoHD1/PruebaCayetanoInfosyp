import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { BookService } from '@shared/services/book.service';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-createbook',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './createbook.component.html',
  styleUrl: './createbook.component.css',
})
export class CreatebookComponent {
  public createForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    public loadingService: LoadingService
  ) {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      excerpt: ['', [Validators.required, Validators.minLength(5)]],
      publishDate: ['', Validators.required],
    });
  }

  async createBook(): Promise<void> {
    this.loadingService.show();
    if (this.createForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    try {
      const newBook = this.createForm.value;
      await this.bookService.createBooks(newBook);
      this.loadingService.hide();
      this.router.navigate(['/books']);
      console.log('Libro creado con éxito');
    } catch (error) {
      console.error('Error al crear el libro', error);
    }
  }
}
