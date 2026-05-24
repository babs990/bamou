# Bamou — Angular 20 + Tailwind CSS

## Prérequis
- Node.js `^20.19.0` ou `^22.12.0`
- Angular CLI `^20.0.0`

## Démarrage
```bash
npm install
npm start
# → http://localhost:4200
```

## Arborescence
```
src/
├── app/
│   ├── core/
│   │   ├── models/product.model.ts         ← interfaces Product, Category
│   │   └── services/
│   │       ├── product.service.ts           ← données produits
│   │       └── whatsapp.service.ts          ← commande WhatsApp
│   ├── features/
│   │   ├── home/                            ← page accueil
│   │   ├── catalog/                         ← liste produits
│   │   └── product-detail/                  ← fiche produit
│   └── shared/components/
│       ├── navbar/
│       ├── footer/
│       ├── product-card/
│       ├── category-card/
│       └── promo-banner/
├── environments/environment.ts              ← numéro WhatsApp
└── styles.scss                              ← Tailwind + tokens
```

## Routes
| URL                    | Page            |
|------------------------|-----------------|
| `/`                    | Accueil         |
| `/catalogue`           | Tous produits   |
| `/catalogue/:category` | Par catégorie   |
| `/produit/:id`         | Fiche produit   |

## Avant de déployer sur Vercel
1. Renseigner `whatsappNumber` dans `src/environments/environment.ts`
2. `npm run build:prod`
3. `npx vercel --prod`
