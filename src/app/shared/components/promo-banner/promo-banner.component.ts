import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.scss',
})
export class PromoBannerComponent {
  @Input() label    = 'PROMO TABASKI';
  @Input() percent  = 20;
  @Input() subtitle = 'SUR TOUS NOS PRODUITS';
  @Input() image    = 'assets/images/banners/promo-tabaski.png';
}