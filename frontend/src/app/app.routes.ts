import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { BooksComponent } from './components/books/books';
import { QuotesComponent } from './components/quotes/quotes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BooksComponent },
  { path: 'quotes', component: QuotesComponent }
];