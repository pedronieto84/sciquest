import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-username-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './username-setup.component.html',
})
export class UsernameSetupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private auth = inject(Auth);

  username = signal('');
  checking = signal(false);
  available = signal<boolean | null>(null);
  saving = signal(false);
  error = signal('');

  private checkTimeout: any;

  onInput(value: string) {
    this.username.set(value);
    this.available.set(null);
    clearTimeout(this.checkTimeout);

    const clean = value.toLowerCase().trim().replace(/[^a-z0-9_]/g, '');
    if (clean !== value) {
      this.username.set(clean);
    }

    if (clean.length < 3) {
      this.available.set(null);
      return;
    }

    this.checking.set(true);
    this.checkTimeout = setTimeout(async () => {
      const ok = await this.authService.isUsernameAvailable(clean);
      this.available.set(ok);
      this.checking.set(false);
    }, 600);
  }

  async confirm() {
    const u = this.username().toLowerCase().trim();
    if (u.length < 3 || !this.available()) return;

    this.saving.set(true);
    try {
      const fireUser = this.auth.currentUser;
      if (!fireUser) throw new Error('No user');
      await this.authService.setUsername(fireUser.uid, u);
      await this.router.navigate(['/home']);
    } catch (e: any) {
      this.error.set(e.message || 'Error al guardar');
    }
    this.saving.set(false);
  }
}
