import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isScrolled    = signal(false);
  mobileOpen    = signal(false);
  catalogOpen   = signal(false);
  darkMode      = signal(false);

  readonly catalogItems = [
    { label: 'Casque',      slug: 'casque',      icon: '🎧' },
    { label: 'Airpods',     slug: 'airpods',     icon: '🎵' },
    { label: 'Power',       slug: 'power',       icon: '🔋' },
    { label: 'Téléphone',   slug: 'telephone',   icon: '📱' },
    { label: 'Ordinateur',  slug: 'ordinateur',  icon: '💻' },
    { label: 'Chargeur',    slug: 'chargeur',    icon: '⚡' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 10);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.catalog-dropdown')) {
      this.catalogOpen.set(false);
    }
  }

  toggleMobile():  void { this.mobileOpen.update(v => !v); }
  toggleCatalog(): void { this.catalogOpen.update(v => !v); }
  closeMobile():   void { this.mobileOpen.set(false); }
  closeCatalog():  void { this.catalogOpen.set(false); }

  toggleDark(): void {
    this.darkMode.update(v => !v);
    document.documentElement.classList.toggle('dark', this.darkMode());
  }
}
