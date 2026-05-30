import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {

  // Délai optionnel pour décaler les animations en cascade
  @Input() revealDelay = 0;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const el = this.el.nativeElement;

    // État initial — invisible et décalé vers le bas
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${this.revealDelay}ms,
                           transform 0.55s ease ${this.revealDelay}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          this.observer.unobserve(el); // joue une seule fois
        }
      },
      { threshold: 0.12 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}