import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  user = { username: '', passwordHash: '' };
  message = '';

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) { this.router.navigate(['/books']); }
  }

  onLogin() {
    this.auth.login(this.user).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/books']);
      },
      error: () => this.message = 'Fel lösenord eller användare.'
    });
  }

  onRegister() {
    this.auth.register(this.user).subscribe({
      next: () => this.message = 'Konto skapat! Du kan nu logga in.',
      error: () => this.message = 'Användarnamnet är upptaget.'
    });
  }
}