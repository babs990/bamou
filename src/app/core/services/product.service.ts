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
    { id: '6', label: 'Coque',   slug: 'coque',   image: 'assets/images/coque.png' },
    { id: '7', label: 'Chargeur',   slug: 'chargeur',   image: 'assets/images/chargeur.png' },

  ];

private readonly MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'AEC2024 BQ618',
    description: 'Écouteurs de jeu sans fil TWS intra-auriculaires avec microphone mains libres intégré. Connectivité Bluetooth 5.3 pour une liaison stable jusqu\'à 10 mètres. Autonomie de 6 heures en utilisation continue, jusqu\'à 24 heures avec le boîtier de charge. Réduction de bruit passive, commandes tactiles sur chaque écouteur. Compatibles iOS, Android, PC et tablette. Idéal pour le gaming, le sport et les appels professionnels.',
    price: 8000,
    oldPrice: 10000,
    promoPercent: 12,
    image: 'assets/images/aec2024-bq618.jpg',
    images : [ 'assets/images/aec2024-bq618.jpg',
      'assets/images/aec2024-bq618-2.webp',
      'assets/images/aec2024-bq618-3.jpg',
      'assets/images/aec2024-bq618-4.jpg',
      'assets/images/aec2024-bq618-5.jpg',
    ],
    category: 'casque',
    rating: 4.5,
    reviewCount: 48,
    isNew: false,
    stock: 5, stockTotal: 12,
  },
  {
    id: 2,
    name: 'Airpods KM-500 KM Star',
    description: 'Écouteurs Bluetooth sans fil de la gamme KM Star, modèle KM-500. Design semi-intra-auriculaire léger et ergonomique pour un port prolongé sans inconfort. Bluetooth 5.1 avec appairage automatique dès l\'ouverture du boîtier. Son stéréo haute définition avec des basses riches et des aigus clairs. Autonomie de 5 heures par charge, 20 heures avec le boîtier. Microphone intégré pour des appels mains libres nets. Compatible avec tous les smartphones et tablettes.',
    price: 12000,
    oldPrice: 18000,
    image: 'assets/images/km500.jpeg',
    images : [ 'assets/images/km500.jpeg',
      'assets/images/km500-2.jpg',
      'assets/images/km500-3.webp',
      'assets/images/km500-4.webp',
      'assets/images/km500-2.jpg',
    ],
    category: 'airpods',
    rating: 4.8,
    reviewCount: 31,
    promoPercent : 15,
    isNew: false,
    stock: 4, stockTotal: 12,
  },
  {
    id: 3,
    name: 'Chargeur USB-C 65W GaN',
    description: 'Chargeur ultra-compact à technologie GaN (Nitrure de Gallium) de 65W. Équipé de 2 ports USB-C et 1 port USB-A pour charger simultanément 3 appareils. Compatible Power Delivery 3.0 et Quick Charge 4.0 pour une recharge jusqu\'à 3x plus rapide. Charge un MacBook Pro en moins de 2 heures, un smartphone en 30 minutes. Dimensions réduites de 40% par rapport aux chargeurs traditionnels. Protection intégrée contre la surchauffe, la surtension et les courts-circuits. Certifié CE et RoHS.',
    price: 4000,
    image: 'assets/images/chargeur-usbc.jpg',
    images : [ 'assets/images/chargeur-usbc.jpg',
      'assets/images/chargeur-usbc-2.jpg',
      'assets/images/chargeur-usbc-3.jpg',
      'assets/images/chargeur-usbc-4.jpg',
      'assets/images/chargeur-usbc.jpg',
    ],
    category: 'chargeur',
    rating: 4.3,
    reviewCount: 22,
    isNew: false,
    stock: 1, stockTotal: 4,
  },
  {
    id: 5,
    name: 'Oraimo MagPower 15',
    description: 'Batterie externe magnétique Oraimo MagPower 15 d\'une capacité de 15 000 mAh. Compatible MagSafe pour fixation magnétique instantanée sur iPhone 12 et versions ultérieures. Charge rapide filaire 22,5W via port USB-C Power Delivery. Charge sans fil 15W pour smartphones compatibles Qi. Port USB-A supplémentaire pour charger un second appareil simultanément. Indicateur LED 4 niveaux pour visualiser la charge restante. Boîtier en aluminium brossé premium, compact et léger. Certifié CE, FCC et RoHS.',
    price: 20000,
    image: 'assets/images/oraimo-magpower.webp',
    images : [ 'assets/images/oraimo-magpower.webp',
      'assets/images/oraimo-magpower-2.jpg',
      'assets/images/oraimo-magpower-3.jpg',
      'assets/images/oraimo-magpower-4.webp',
      'assets/images/oraimo-magpower-5.jpg',
    ],
    category: 'power',
    rating: 4.6,
    reviewCount: 37,
    isNew: false,
    stock: 4, stockTotal: 12,
  },
  {
    id: 6,
    name: 'Airpods Pro 6',
    description: 'Écouteurs premium avec réduction de bruit active (ANC) de dernière génération, éliminant jusqu\'à 98% des bruits environnants. Mode transparence pour rester attentif à votre environnement sans retirer les écouteurs. Bluetooth 5.3 avec codec AAC et SBC pour une qualité audio sans compromis. Son spatial avec suivi dynamique de la tête pour une expérience immersive. Autonomie de 8 heures par charge, jusqu\'à 32 heures avec le boîtier de recharge. Résistance à l\'eau et à la sueur IPX5. Commandes tactiles et vocales. Compatible iOS et Android.',
    price: 5000,
    oldPrice: 8000,
    promoPercent: 16,
    image: 'assets/images/airpods-pro6.png',
    images : [ 'assets/images/airpods-pro6.png',
      'assets/images/airpods-pro6-2.jpg',
      'assets/images/airpods-pro6-3.webp',
      'assets/images/airpods-pro6-4.webp',
      'assets/images/airpods-pro6-5.webp',
    ],
    category: 'airpods',
    rating: 4.7,
    reviewCount: 55,
    isNew: false,
    stock: 1, stockTotal: 5,
  },
  {
    id: 7,
    name: 'Coque iphone 13 simple',
    description: 'Pochette pour iphone 3d avec ours souriant et Protection de caméra derrière pour iphone 13 simple. Couleur:Noir,Beige,Marron clair',
    price: 4000,
    oldPrice : 6000 ,
    image: 'assets/images/coque-iphone.jpg',
    images : [ 'assets/images/coque-iphone.jpg',
      'assets/images/coque-iphone-2.jpg',
      'assets/images/coque-iphone-3.jpg',
      'assets/images/coque-iphone-4.jpg',
      'assets/images/coque-iphone-5.jpg',
    ],
    category: 'coque',
    rating: 4.8,
    reviewCount: 55,
    isNew: true,
    stock: 3, stockTotal: 3,
  },
  {
    id: 8,
    name: 'Awei P106K Power Bank',
    description: 'Batterie externe Awei P106K 10 000 mAh avec charge rapide 22.5W Fast Charging. Écran LED digital affichant le pourcentage de batterie restant en temps réel. Ports USB-A et USB-C pour une compatibilité universelle avec tous vos appareils. Protection intelligente contre les surcharges, courts-circuits et surchauffes. Design compact et élégant, facile à transporter partout. Idéale pour les voyages et une utilisation quotidienne. Assez d\'énergie pour recharger un smartphone jusqu\'à 2,5 fois. Livraison rapide partout au Sénégal.',
    price: 12000,
    oldPrice: 15000,
    image: 'assets/images/awei-p106k-1.jpg',
    images: [
      'assets/images/awei-p106k-1.jpg',
      'assets/images/awei-p106k-2.jpg',
      'assets/images/awei-p106k.webp',
      'assets/images/awei-p106k-3.webp',
    ],
    category: 'power',
    rating: 4.7,
    reviewCount: 28,
    isNew: true,
    stock: 2,
    stockTotal: 5,
  },
    {
    id: 4,
    name: 'iPhone XR 64 Go',
    description: 'Apple iPhone XR 64 Go débloqué tout opérateur. Écran Liquid Retina LCD de 6,1 pouces avec True Tone et large gamme de couleurs P3. Puce A12 Bionic avec Neural Engine pour des performances exceptionnelles. Appareil photo principal de 12 mégapixels avec mode Portrait, Smart HDR et 4K 60 fps. Face ID pour un déverrouillage sécurisé en moins d\'une seconde. Batterie de 2942 mAh avec jusqu\'à 25 heures d\'autonomie en lecture vidéo. Résistance à l\'eau et à la poussière IP67. Disponible en plusieurs coloris.',
    price: 90000,
    oldPrice: 110000,
    promoPercent: 12,
    image: 'assets/images/iphone-xr.jpeg',
    images : [ 'assets/images/products/aec2024-bq618.png',
      'assets/images/products/aec2024-bq618-2.png',
      'assets/images/products/aec2024-bq618-3.png',
      'assets/images/products/aec2024-bq618-4.png',
      'assets/images/products/aec2024-bq618-5.png',
    ],
    category: 'telephone',
    rating: 4.5,
    reviewCount: 64,
    isNew: true,
    stock: 4, stockTotal: 12,
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
