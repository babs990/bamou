import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { PromoBannerComponent } from '../../shared/components/promo-banner/promo-banner.component';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, CategoryCardComponent, PromoBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  private productService = inject(ProductService);

  categories: Category[] = [];
  categoriesLoading = true;

  // TODO: ajouter products, popularProducts, newArrivals

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.categoriesLoading = false;
      },
      error: () => {
        this.categoriesLoading = false;
      }
    });
  }
}
