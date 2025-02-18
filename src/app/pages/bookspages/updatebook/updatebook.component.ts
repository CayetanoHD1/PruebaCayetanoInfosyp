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
import { BookService } from '@shared/services/book.service';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-updatebook',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingComponent],
  templateUrl: './updatebook.component.html',
  styleUrl: './updatebook.component.css',
})
export class UpdatebookComponent implements OnInit {
  public updateForm!: FormGroup;
  id!: number;
  books: any;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      excerpt: ['', [Validators.required, Validators.minLength(5)]],
      publishDate: ['', Validators.required],
    });
  }
  async ngOnInit() {
    this.loadingService.show();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      await this.detailt(this.id);

      this.updateForm.patchValue({
        title: this.books.title,
        description: this.books.description,
        excerpt: this.books.excerpt,
        publishDate: this.books.excerpt,
      });
    }
    this.loadingService.hide();
  }
  async detailt(id: number) {
    try {
      this.books = await this.bookService.getBooksById(id);

      console.log('Autor obtenido:', this.books);
    } catch (error) {
      console.error('Error al obtener autor', error);
    }
  }
  async updateteBook(): Promise<void> {
    if (this.updateForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    try {
      const newAuthor = this.updateForm.value;
      await this.bookService.updateBooks(this.id, newAuthor);
      this.router.navigate(['/authors']);
      console.log('Autor creado con éxito');
    } catch (error) {
      console.error('Error al crear autor', error);
    }
  }
}
