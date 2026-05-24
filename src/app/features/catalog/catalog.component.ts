import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  @Input() category?: string; // injecté via withComponentInputBinding()

  // TODO: injecter ProductService et WhatsappService
  // TODO: charger products et categories, filtrer par category si présent
}
