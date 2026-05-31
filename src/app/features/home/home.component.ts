import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { PromoBannerComponent } from '../../shared/components/promo-banner/promo-banner.component';
import { ProductService } from '../../core/services/product.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Category, Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ProductCardComponent,
    CategoryCardComponent,
    PromoBannerComponent,
    RevealDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  private productService = inject(ProductService);

  categories:       Category[] = [];
  popularProducts:  Product[]  = [];
  newArrivals:      Product[]  = [];

  categoriesLoading   = true;
  popularLoading      = true;
  newArrivalsLoading  = true;

  ngOnInit(): void {
    this.loadCategories();
    this.loadPopular();
    this.loadNewArrivals();
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next:  data => { this.categories = data; this.categoriesLoading = false; },
      error: ()   => { this.categoriesLoading = false; },
    });
  }

  private loadPopular(): void {
    this.productService.getPopular().subscribe({
      next:  data => { this.popularProducts = data; this.popularLoading = false; },
      error: ()   => { this.popularLoading = false; },
    });
  }

  private loadNewArrivals(): void {
    this.productService.getNewArrivals().subscribe({
      next:  data => { this.newArrivals = data; this.newArrivalsLoading = false; },
      error: ()   => { this.newArrivalsLoading = false; },
    });
  }
}