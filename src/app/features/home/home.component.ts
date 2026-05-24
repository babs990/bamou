import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { PromoBannerComponent } from '../../shared/components/promo-banner/promo-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, CategoryCardComponent, PromoBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // TODO: injecter ProductService et WhatsappService
  // TODO: charger popularProducts, newArrivals, categories
}
