import { Component, OnInit, Input, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService, SortFilter } from '../../core/services/search.service';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Product, Category } from '../../core/models/product.model';
import { MetaPixelService } from '../../core/services/meta-pixel.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, FormsModule, ProductCardComponent, RevealDirective],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {

  // Injecté depuis la route /catalogue/:category
  @Input() category?: string;

  private searchService  = inject(SearchService);
  private productService = inject(ProductService);
  private route          = inject(ActivatedRoute);
  private router         = inject(Router);
  private metaPixel = inject(MetaPixelService);


  query          = '';
  sort: SortFilter = 'all';
  activeCategory = '';

  products:   Product[]  = [];
  categories: Category[] = [];
  loading = true;

  sortOptions = [
    { value: 'all',     label: 'Tous'   },
    { value: 'new',     label: 'Nouveautés'  },
    { value: 'popular', label: 'Populaire' },
  ];

  sortOpen     = false;
  categoryOpen = false;

  get activeSortLabel(): string {
    return this.sortOptions.find(o => o.value === this.sort)?.label ?? 'Populaire';
  }

  get activeCategoryLabel(): string {
    return this.categories.find(c => c.slug === this.activeCategory)?.label
      ?? 'Toutes les catégories';
  }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(c => this.categories = c);

    // Priorité 1 : param de route /catalogue/:category
    if (this.category) {
      this.activeCategory = this.category;
    }

    // Priorité 2 : queryParams (?sort=popular&q=casque&cat=airpods)
    this.route.queryParams.subscribe(params => {
      if (params['q'])    this.query          = params['q'];
      if (params['sort']) this.sort           = params['sort'] as SortFilter;
      if (params['cat'])  this.activeCategory = params['cat'];
      this.runSearch();
    });
  }
  
  onSearchInput(): void {
    this.runSearch();
  }
  
  runSearch(): void {
    this.loading = true;
    // ← tracker si mot-clé saisi
    if (this.query.trim()) {
      this.metaPixel.search(this.query.trim());
    }
    this.searchService.search(this.query, this.sort, this.activeCategory).subscribe(result => {
      this.products = result.products;
      this.loading  = false;
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q:    this.query || null,
        sort: this.sort !== 'all' ? this.sort : null,
        cat:  this.activeCategory || null,
      },
      replaceUrl: true,
    });
  }

  setSort(value: string): void {
    this.sort     = value as SortFilter;
    this.sortOpen = false;
    this.runSearch();
  }

  setCategory(slug: string): void {
    this.activeCategory = slug;
    this.categoryOpen   = false;
    // Met à jour aussi l'URL /catalogue sans le segment /:category
    this.router.navigate(['/catalogue'], {
      queryParams: { cat: slug || null },
      replaceUrl: true,
    });
    this.runSearch();
  }

  resetAll(): void {
    this.query          = '';
    this.activeCategory = '';
    this.sort           = 'all';
    this.runSearch();
  }

  toggleSort():     void { this.sortOpen     = !this.sortOpen;     this.categoryOpen = false; }
  toggleCategory(): void { this.categoryOpen = !this.categoryOpen; this.sortOpen     = false; }
}