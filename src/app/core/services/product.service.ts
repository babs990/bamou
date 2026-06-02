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
    description: 'Écouteurs de jeu sans fil TWS intra-auriculaires avec microphone mains libres intégré. Connectivité Bluetooth 5.3 pour une liaison stable jusqu\'à 10 mètres. Autonomie de 6 heures en utilisation continue, jusqu\'à 24 heures avec le boîtier de charge. Réduction de bruit passive, commandes tactiles sur chaque écouteur. Compatibles iOS, Android, PC et tablette. Idéal pour le gaming, le sport et les appels professionnels.',
    price: 10000,
    oldPrice: 13000,
    promoPercent: 23,
    image: 'assets/images/aec2024-bq618.jpg',
    category: 'airpods',
    rating: 4.5,
    reviewCount: 48,
    isNew: false,
    stock: 12,
  },
  {
    id: 2,
    name: 'Airpods KM-500 KM Star',
    description: 'Écouteurs Bluetooth sans fil de la gamme KM Star, modèle KM-500. Design semi-intra-auriculaire léger et ergonomique pour un port prolongé sans inconfort. Bluetooth 5.1 avec appairage automatique dès l\'ouverture du boîtier. Son stéréo haute définition avec des basses riches et des aigus clairs. Autonomie de 5 heures par charge, 20 heures avec le boîtier. Microphone intégré pour des appels mains libres nets. Compatible avec tous les smartphones et tablettes.',
    price: 12000,
    image: 'assets/images/km500.jpeg',
    category: 'airpods',
    rating: 4.5,
    reviewCount: 31,
    isNew: false,
    stock: 5,
  },
  {
    id: 3,
    name: 'Chargeur USB-C 65W GaN',
    description: 'Chargeur ultra-compact à technologie GaN (Nitrure de Gallium) de 65W. Équipé de 2 ports USB-C et 1 port USB-A pour charger simultanément 3 appareils. Compatible Power Delivery 3.0 et Quick Charge 4.0 pour une recharge jusqu\'à 3x plus rapide. Charge un MacBook Pro en moins de 2 heures, un smartphone en 30 minutes. Dimensions réduites de 40% par rapport aux chargeurs traditionnels. Protection intégrée contre la surchauffe, la surtension et les courts-circuits. Certifié CE et RoHS.',
    price: 8500,
    image: 'assets/images/chargeur-usbc.png',
    category: 'chargeur',
    rating: 4.3,
    reviewCount: 22,
    isNew: false,
    stock: 20,
  },
  {
    id: 4,
    name: 'iPhone XR 64 Go',
    description: 'Apple iPhone XR 64 Go débloqué tout opérateur. Écran Liquid Retina LCD de 6,1 pouces avec True Tone et large gamme de couleurs P3. Puce A12 Bionic avec Neural Engine pour des performances exceptionnelles. Appareil photo principal de 12 mégapixels avec mode Portrait, Smart HDR et 4K 60 fps. Face ID pour un déverrouillage sécurisé en moins d\'une seconde. Batterie de 2942 mAh avec jusqu\'à 25 heures d\'autonomie en lecture vidéo. Résistance à l\'eau et à la poussière IP67. Disponible en plusieurs coloris.',
    price: 185000,
    oldPrice: 210000,
    promoPercent: 12,
    image: 'assets/images/iphone-xr.jpeg',
    category: 'telephone',
    rating: 4.6,
    reviewCount: 64,
    isNew: false,
    stock: 3,
  },
  {
    id: 5,
    name: 'Oraimo MagPower 15',
    description: 'Batterie externe magnétique Oraimo MagPower 15 d\'une capacité de 15 000 mAh. Compatible MagSafe pour fixation magnétique instantanée sur iPhone 12 et versions ultérieures. Charge rapide filaire 22,5W via port USB-C Power Delivery. Charge sans fil 15W pour smartphones compatibles Qi. Port USB-A supplémentaire pour charger un second appareil simultanément. Indicateur LED 4 niveaux pour visualiser la charge restante. Boîtier en aluminium brossé premium, compact et léger. Certifié CE, FCC et RoHS.',
    price: 22000,
    image: 'assets/images/oraimo-magpower.webp',
    category: 'power',
    rating: 4.7,
    reviewCount: 37,
    isNew: true,
    stock: 8,
  },
  {
    id: 6,
    name: 'Airpods Pro 6',
    description: 'Écouteurs premium avec réduction de bruit active (ANC) de dernière génération, éliminant jusqu\'à 98% des bruits environnants. Mode transparence pour rester attentif à votre environnement sans retirer les écouteurs. Bluetooth 5.3 avec codec AAC et SBC pour une qualité audio sans compromis. Son spatial avec suivi dynamique de la tête pour une expérience immersive. Autonomie de 8 heures par charge, jusqu\'à 32 heures avec le boîtier de recharge. Résistance à l\'eau et à la sueur IPX5. Commandes tactiles et vocales. Compatible iOS et Android.',
    price: 15000,
    oldPrice: 18000,
    promoPercent: 17,
    image: 'assets/images/airpods-pro6.png',
    category: 'airpods',
    rating: 4.8,
    reviewCount: 55,
    isNew: true,
    stock: 15,
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
