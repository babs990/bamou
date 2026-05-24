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
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  slug: string;
}
