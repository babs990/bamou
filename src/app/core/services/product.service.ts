import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Category, Product } from '../models/product.model';

// ─────────────────────────────────────────────────────────────
// MOCK DATA — remplacer les `of(...)` par des appels HTTP
// quand l'API sera disponible :
//   return this.http.get<Category[]>('/api/categories');
// ─────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class ProductService {

  private readonly MOCK_CATEGORIES: Category[] = [
    { id: '1', label: 'Casque',     slug: 'casque',     image: 'assets/images/casque.png' },
    { id: '2', label: 'Airpods',    slug: 'airpods',    image: 'assets/images/airpods.png' },
    { id: '3', label: 'Power',      slug: 'power',      image: 'assets/images/power.png' },
    { id: '4', label: 'Téléphone',  slug: 'telephone',  image: 'assets/images/telephone.png' },
    { id: '5', label: 'Ordinateur', slug: 'ordinateur', image: 'assets/images/ordinateur.png' },
    { id: '6', label: 'Chargeur',   slug: 'chargeur',   image: 'assets/images/chargeur.png' },
  ];

  private readonly MOCK_PRODUCTS: Product[] = [
    // TODO: remplir avec les vrais produits
  ];

  // ── Catégories ──────────────────────────────────────────
  getCategories(): Observable<Category[]> {
    // Simule une latence réseau de 300ms
    return of(this.MOCK_CATEGORIES).pipe(delay(300));
  }

  // ── Produits ────────────────────────────────────────────
  getAll(): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS).pipe(delay(300));
  }

  getById(id: number): Observable<Product | undefined> {
    return of(this.MOCK_PRODUCTS.find(p => p.id === id)).pipe(delay(300));
  }

  getByCategory(slug: string): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS.filter(p => p.category === slug)).pipe(delay(300));
  }

  getPopular(): Observable<Product[]> {
    return of(
      [...this.MOCK_PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 6)
    ).pipe(delay(300));
  }

  getNewArrivals(): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS.filter(p => p.isNew)).pipe(delay(300));
  }
}
