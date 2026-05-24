import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Bamou — Accueil',
  },
  {
    path: 'catalogue',
    loadComponent: () =>
      import('./features/catalog/catalog.component').then(m => m.CatalogComponent),
    title: 'Bamou — Catalogue',
  },
  {
    path: 'catalogue/:category',
    loadComponent: () =>
      import('./features/catalog/catalog.component').then(m => m.CatalogComponent),
    title: 'Bamou — Catalogue',
  },
  {
    path: 'produit/:id',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
    title: 'Bamou — Produit',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
