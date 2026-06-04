import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ProductService } from '../../core/services/product.service';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, DecimalPipe, ProductCardComponent, RevealDirective],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {

  @Input({ required: true }) id!: string;

  private productService  = inject(ProductService);
  private whatsappService = inject(WhatsappService);

  product:  Product | undefined;
  similar:  Product[] = [];
  loading = true;

  // Index de l'image active dans les thumbnails
  activeImg = signal(0);
  
  // Simule 5 images par produit (même image pour l'instant, à remplacer par product.images[])
  get thumbnails(): string[] {
    if (!this.product) return [];
    return Array(5).fill(this.product.image);
  }
  
  // Index de la première thumb visible dans la fenêtre
  thumbStart = signal(0);
  readonly VISIBLE = 5; // nb de thumbs visibles à la fois
  
  get visibleThumbs(): { src: string; index: number }[] {
    return this.thumbnails
      .slice(this.thumbStart(), this.thumbStart() + this.VISIBLE)
      .map((src, i) => ({ src, index: this.thumbStart() + i }));
  }
  
  prevThumbs(): void {
    if (this.thumbStart() > 0)
      this.thumbStart.update(v => v - 1);
  }
  
  nextThumbs(): void {
    if (this.thumbStart() + this.VISIBLE < this.thumbnails.length)
      this.thumbStart.update(v => v + 1);
  }

  get stockPercent(): number {
    const remaining = this.product?.stock      ?? 0;
    const total     = this.product?.stockTotal ?? 0;
    if (total === 0) return 0;
    return Math.round((remaining / total) * 100);
  }

  get stockColor(): string {
    return '#C4420D';
  }

  readonly stars = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    const numId = Number(this.id);
    if (!Number.isInteger(numId) || numId <= 0) return;

    this.productService.getById(numId).subscribe(p => {
      this.product = p;
      this.loading = false;
      if (p) {
        this.productService.getByCategory(p.category).subscribe(all => {
          this.similar = all.filter(x => x.id !== p.id);
        });
      }
    });
  }

  setActiveImg(index: number): void {
    this.activeImg.set(index);
  }

  order(): void {
  if (this.product) {
    this.whatsappService.order(this.product);
  }
}
}