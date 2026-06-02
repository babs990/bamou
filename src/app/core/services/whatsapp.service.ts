import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WhatsappService {

  // ← Remplace par ton vrai numéro (format international sans +)
  private readonly number = '221XXXXXXXXX';

  order(product: Product): void {
    const name  = this.sanitize(product.name);
    const price = product.price.toLocaleString('fr-FR');
    const msg   = `Bonjour Bamou 👋\n\nJe souhaite commander :\n📦 *${name}*\n💰 ${price} FCFA\n\nMerci de confirmer la disponibilité.`;
    const url   = `https://wa.me/${this.number}?text=${encodeURIComponent(msg)}`;

    if (url.startsWith('https://wa.me/')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  private sanitize(value: string): string {
    return value.replace(/[<>"'`]/g, '').trim().slice(0, 200);
  }
}