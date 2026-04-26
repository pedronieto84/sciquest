import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { PromoCodeComponent } from '../../shared/promo-code/promo-code.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, PromoCodeComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private authService = inject(AuthService);

  mode = signal<'login' | 'register'>('login');
  loading = signal(false);
  error = signal('');

  email = '';
  password = '';
  displayName = '';

  async loginWithGoogle() {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.authService.loginWithGoogle();
      // Google Ads conversion tracking — registro/login con Google
      if (typeof (window as any).gtag_report_conversion === 'function') {
        (window as any).gtag_report_conversion();
      }
    } catch (e: any) {
      this.error.set(e.message || 'Error al iniciar sesión');
    } finally {
      this.loading.set(false);
    }
  }

  async submit() {
    if (this.loading()) return;
    this.loading.set(true);
    this.error.set('');
    try {
      if (this.mode() === 'login') {
        await this.authService.loginWithEmail(this.email, this.password);
      } else {
        if (!this.displayName.trim()) { this.error.set('Escribe tu nombre'); return; }
        await this.authService.registerWithEmail(this.email, this.password, this.displayName);
        // Google Ads conversion tracking — registro completado
        if (typeof (window as any).gtag_report_conversion === 'function') {
          (window as any).gtag_report_conversion();
        }
      }
    } catch (e: any) {
      this.error.set(e.message || 'Error');
    } finally {
      this.loading.set(false);
    }
  }

  toggle() {
    this.mode.set(this.mode() === 'login' ? 'register' : 'login');
    this.error.set('');
  }
}
