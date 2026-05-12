import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quotes.html'
})
export class QuotesComponent implements OnInit {
  quotes: any[] = [];
  currentQuote: any = { text: '', author: '' };
  isEditing = false;

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadQuotes(); }

  loadQuotes() {
    this.api.getQuotes().subscribe((data: any) => this.quotes = data);
  }

  saveQuote() {
    if (this.isEditing) {
      this.api.updateQuote(this.currentQuote.id, this.currentQuote).subscribe(() => {
        this.loadQuotes();
        this.resetForm();
      });
    } else {
      this.api.addQuote(this.currentQuote).subscribe(() => {
        this.loadQuotes();
        this.resetForm();
      });
    }
  }

  editQuote(quote: any) {
    this.currentQuote = { ...quote };
    this.isEditing = true;
  }

  deleteQuote(id: number) {
    this.api.deleteQuote(id).subscribe(() => this.loadQuotes());
  }

  resetForm() {
    this.currentQuote = { text: '', author: '' };
    this.isEditing = false;
  }
}