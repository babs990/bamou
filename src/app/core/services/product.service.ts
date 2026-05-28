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
    {
      id: 1,
      name: 'AEC2024 BQ618',
      description: 'Écouteurs de jeu sans fil TWS intra-auriculaires mains libres. Bluetooth 5.3, autonomie 6h + boîtier 24h, réduction de bruit passive, commandes tactiles, compatibles iOS et Android.',
      price: 10000,
      oldPrice: 13000,
      promoPercent: 23,
      image: 'assets/images/aec2024-bq618.jpg',
      category: 'airpods',
      rating: 4.5,
      reviewCount: 48,
      isNew: false,
    },
    {
      id: 2,
      name: 'Airpods KM-500 KM Star',
      description: 'Écouteurs Bluetooth sans fil KM Star KM-500. Autonomie 5h + boîtier 20h, Bluetooth 5.1, son stéréo HD, design semi-intra léger, microphone intégré pour appels mains libres.',
      price: 12000,
      image: 'assets/images/km500.jpeg',
      category: 'airpods',
      rating: 4.7,
      reviewCount: 31,
      isNew: false,
    },
    {
      id: 3,
      name: 'Chargeur USB-C 65W GaN',
      description: 'Chargeur rapide GaN 65W avec 2 ports USB-C et 1 port USB-A. Compatible Power Delivery 3.0 et Quick Charge 4.0. Charge simultanée de 3 appareils. Compact et léger, idéal voyage.',
      price: 8500,
      image: 'assets/images/chargeur-usbc.png',
      category: 'chargeur',
      rating: 4.3,
      reviewCount: 22,
      isNew: false,
    },
    {
      id: 4,
      name: 'iPhone XR 64 Go',
      description: 'Apple iPhone XR 64 Go débloqué. Écran Liquid Retina 6,1 pouces, puce A12 Bionic, appareil photo 12 MP, Face ID, batterie 2942 mAh. Disponible en plusieurs coloris.',
      price: 185000,
      oldPrice: 210000,
      promoPercent: 12,
      image: 'assets/images/iphone-xr.jpeg',
      category: 'telephone',
      rating: 4.6,
      reviewCount: 64,
      isNew: false,
    },
    {
      id: 5,
      name: 'Oraimo MagPower 15 Power Bank',
      description: 'Batterie externe magnétique Oraimo MagPower 15 — 15000 mAh. Compatible MagSafe iPhone, charge rapide 22,5W, port USB-C PD + USB-A, charge sans fil 15W, indicateur LED 4 niveaux.',
      price: 22000,
      image: 'assets/images/oraimo-magpower.webp',
      category: 'power',
      rating: 4.7,
      reviewCount: 37,
      isNew: true,
    },
    {
      id: 6,
      name: 'Airpods Pro 6',
      description: 'Écouteurs premium avec réduction de bruit active (ANC) et mode transparence. Bluetooth 5.3, autonomie 8h + boîtier 32h, résistance IPX5, son spatial, commandes tactiles et vocales.',
      price: 15000,
      oldPrice: 18000,
      promoPercent: 17,
      image: 'assets/images/airpods-pro6.png',
      category: 'airpods',
      rating: 4.4,
      reviewCount: 55,
      isNew: true,
    },
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
    // Trie par note desc, retourne les 5 premiers
    return of(
      [...this.MOCK_PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 5)
    ).pipe(delay(300));
  }

  getNewArrivals(): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS.filter(p => p.isNew)).pipe(delay(300));
  }
}
