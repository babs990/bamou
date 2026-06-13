import { Injectable } from '@angular/core';

declare const fbq: (...args: any[]) => void;

@Injectable({ providedIn: 'root' })
export class MetaPixelService {

  // Vérifie que fbq est chargé avant d'appeler
  private track(event: string, params?: object): void {
    if (typeof fbq !== 'undefined') {
      fbq('track', event, params);
    }
  }

  // Vue d'une page (appelé automatiquement au PageView)
  pageView(): void {
    this.track('PageView');
  }

  // Vue d'une fiche produit
  viewContent(product: { id: number; name: string; price: number; category: string }): void {
    this.track('ViewContent', {
      content_ids:  [product.id.toString()],
      content_name: product.name,
      content_type: 'product',
      value:        product.price,
      currency:     'XOF',
    });
  }

  // Clic sur "Commander maintenant"
  initiateCheckout(product: { id: number; name: string; price: number }): void {
    this.track('InitiateCheckout', {
      content_ids:  [product.id.toString()],
      content_name: product.name,
      value:        product.price,
      currency:     'XOF',
      num_items:    1,
    });
  }

  // Recherche
  search(query: string): void {
    this.track('Search', { search_string: query });
  }
}