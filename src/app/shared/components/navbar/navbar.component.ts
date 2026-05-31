import { Component, HostListener, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { SearchService } from '../../../core/services/search.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, DecimalPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  private searchService = inject(SearchService);
  private router        = inject(Router);

  isScrolled  = signal(false);
  mobileOpen  = signal(false);
  catalogOpen = signal(false);
  darkMode    = signal(false);

  searchQuery    = '';
  suggestions:   Product[] = [];
  suggestVisible = false;

  readonly catalogItems = [
    { label: 'Casque',     slug: 'casque',     icon: '🎧' },
    { label: 'Airpods',    slug: 'airpods',    icon: '🎵' },
    { label: 'Power',      slug: 'power',      icon: '🔋' },
    { label: 'Téléphone',  slug: 'telephone',  icon: '📱' },
    { label: 'Ordinateur', slug: 'ordinateur', icon: '💻' },
    { label: 'Chargeur',   slug: 'chargeur',   icon: '⚡' },
  ];

  @HostListener('window:scroll')
  onScroll(): void { this.isScrolled.set(window.scrollY > 10); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const t = e.target as HTMLElement;
    if (!t.closest('.catalog-dropdown')) this.catalogOpen.set(false);
    if (!t.closest('.search-zone'))      this.closeSuggestions();
  }

  // ── Recherche ──────────────────────────────────────────
  onSearchInput(): void {
    const q = this.searchQuery.trim();
    if (q.length < 2) {
      this.suggestions    = [];
      this.suggestVisible = false;
      return;
    }
    this.searchService.getSuggestions(q).subscribe(results => {
      this.suggestions    = results;
      this.suggestVisible = results.length > 0;
    });
  }

  submitSearch(): void {
    if (!this.searchQuery.trim()) return;
    const q = this.searchQuery.trim();
    this.closeSuggestions();
    this.searchQuery = '';
    this.router.navigate(['/catalogue'], { queryParams: { q } });
  }

  goToProduct(product: Product): void {
    this.closeSuggestions();
    this.searchQuery = '';
    this.router.navigate(['/produit', product.id]);
  }

  closeSuggestions(): void {
    this.suggestVisible = false;
    this.suggestions    = [];
  }

  // ── Nav ────────────────────────────────────────────────
  toggleMobile():  void { this.mobileOpen.update(v => !v); }
  toggleCatalog(): void { this.catalogOpen.update(v => !v); }
  closeMobile():   void { this.mobileOpen.set(false); }
  closeCatalog():  void { this.catalogOpen.set(false); }

  toggleDark(): void {
    this.darkMode.update(v => !v);
    document.documentElement.classList.toggle('dark', this.darkMode());
  }
}
