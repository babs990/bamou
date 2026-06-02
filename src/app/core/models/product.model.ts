export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  promoPercent?: number;
  stock?: number;        
}

export interface Category {
  id: string;
  label: string;
  slug: string;
  image: string;  // chemin asset ou URL API
}
