import { Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromoCodeService } from '../../core/services/promo-code.service';

@Component({
  selector: 'app-promo-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promo-code.component.html',
})
export class PromoCodeComponent {
  private promoService = inject(PromoCodeService);

  redeemed = output<number>(); // emite el XP ganado

  code = signal('');
  loading = signal(false);
  message = signal('');
  success = signal<boolean | null>(null);
  showInput = signal(false);

  async redeem() {
    if (!this.code()) return;
    this.loading.set(true);
    this.message.set('');

    const result = await this.promoService.redeemCode(this.code());
    this.message.set(result.message);
    this.success.set(result.success);
    this.loading.set(false);

    if (result.success && result.xp) {
      this.redeemed.emit(result.xp);
      this.code.set('');
      setTimeout(() => {
        this.showInput.set(false);
        this.message.set('');
        this.success.set(null);
      }, 3000);
    }
  }
}
