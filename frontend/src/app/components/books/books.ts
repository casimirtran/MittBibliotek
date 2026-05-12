import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html'
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  currentBook: any = { title: '', author: '', publishDate: '' };
  isEditing = false;

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadBooks(); }

  loadBooks() {
    this.api.getBooks().subscribe((data: any) => this.books = data);
  }

  saveBook() {
    if (this.isEditing) {
      this.api.updateBook(this.currentBook.id, this.currentBook).subscribe(() => {
        this.loadBooks();
        this.resetForm();
      });
    } else {
      this.api.addBook(this.currentBook).subscribe(() => {
        this.loadBooks();
        this.resetForm();
      });
    }
  }

  editBook(book: any) {
    this.currentBook = { ...book };
    this.isEditing = true;
  }

  deleteBook(id: number) {
    this.api.deleteBook(id).subscribe(() => this.loadBooks());
  }

  resetForm() {
    this.currentBook = { title: '', author: '', publishDate: '' };
    this.isEditing = false;
  }
}