import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('@pages/bookspages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'books-detail',
    loadComponent: () =>
      import('@pages/bookspages/book-detail/book-detail.component').then(
        (m) => m.BookDetailComponent
      ),
  },
  {
    path: 'authors',
    loadComponent: () =>
      import('@pages/authorpages/author/author.component').then((m) => m.AuthorComponent),
  },
  {
    path: 'authors-detail/:id',
    loadComponent: () =>
      import('@pages/authorpages/author-detail/author-detail.component').then(
        (m) => m.AuthorDetailComponent
      ),
  },
  {
    path: 'create-author',
    loadComponent: () =>
      import('@pages/authorpages/createauthor/createauthor.component').then(
        (m) => m.CreateauthorComponent
      ),
  },
  {
    path: 'update-author/:id',
    loadComponent: () =>
      import('@pages/authorpages/updateauthor/updateauthor.component').then(
        (m) => m.UpdateauthorComponent
      ),
  },
  {
    path: 'update-book/:id',
    loadComponent: () =>
      import('@pages/bookspages/updatebook/updatebook.component').then(
        (m) => m.UpdatebookComponent
      ),
  },
  {
    path: 'detail-book/:id',
    loadComponent: () =>
      import('@pages/bookspages/book-detail/book-detail.component').then(
        (m) => m.BookDetailComponent
      ),
  },

  {
    path: 'create-books',
    loadComponent: () =>
      import('@pages/bookspages/createbook/createbook.component').then(
        (m) => m.CreatebookComponent
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
