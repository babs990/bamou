import { Injectable, inject } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

export type SortFilter = 'popular' | 'new' | 'all';

export interface SearchResult {
  products: Product[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class SearchService {

  private productService = inject(ProductService);

  // Recherche par mot-clé (name + description)
  search(query: string, sort: SortFilter = 'all', category = ''): Observable<SearchResult> {
    return this.productService.getAll().pipe(
      map(products => {
        let results = [...products];

        // Filtre mot-clé
        if (query.trim()) {
          const q = query.toLowerCase().trim();
          results = results.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
          );
        }

        // Filtre catégorie
        if (category) {
          results = results.filter(p => p.category === category);
        }

        // Tri
        if (sort === 'popular') {
          results.sort((a, b) => b.rating - a.rating);
        } else if (sort === 'new') {
          results = results.filter(p => p.isNew);
        }

        return { products: results, total: results.length };
      })
    );
  }

  // Suggestions rapides pour l'autocomplete (max 6)
  getSuggestions(query: string): Observable<Product[]> {
    if (!query.trim() || query.length < 2) return of([]);

    return this.productService.getAll().pipe(
      map(products => {
        const q = query.toLowerCase();
        return products
          .filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          )
          .slice(0, 6);
      })
    );
  }
}