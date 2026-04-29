import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Renderer2,
  computed,
  inject,
  signal,
} from '@angular/core';

import {
  CertificateItem,
  ExperienceItem,
  FloatingNavItem,
  LanguageCertificate,
  ProfileMode,
  ProfileTag,
  ProjectCategory,
  ResearchItem,
  portfolioData,
} from './portfolio.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private revealObserver?: IntersectionObserver;
  private certificatesIntervalId: ReturnType<typeof setInterval> | null = null;
  private pointerStartX = 0;
  private pointerDeltaX = 0;
  private isDraggingCertificates = false;
  private readonly certificatesPerView = 2;

  protected readonly data = portfolioData;
  protected readonly currentProfile = signal<ProfileMode>('SOFTWARE');
  protected readonly selectedCategory = signal<ProjectCategory>('Todos');
  protected readonly showFloatingNav = signal(false);
  protected readonly activeExperienceId = signal<string | null>(null);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly activeCertificatePage = signal(0);
  protected readonly cursorX = signal(0);
  protected readonly cursorY = signal(0);
  protected readonly showCursor = signal(false);
  protected readonly cursorPressed = signal(false);

  protected readonly currentVariant = computed(
    () => this.data.variants[this.currentProfile()],
  );

  protected readonly navigationSections = computed(() =>
    Object.values(this.data.sections).filter((section) => section.visible),
  );

  protected readonly visibleFloatingNav = computed<FloatingNavItem[]>(() =>
    this.currentVariant().floatingNav.filter((item) => this.data.sections[item.target].visible),
  );

  protected readonly visibleStats = computed(() =>
    this.data.stats.filter((item) => this.matchesProfile(item.tag)),
  );

  protected readonly visibleCertificates = computed(() =>
    this.data.certificates.filter((item) => this.matchesProfile(item.tag)),
  );

  protected readonly languageCertificates = computed(() =>
    this.data.languages.flatMap((language) =>
      (language.certificates ?? []).map((certificate) => ({
        ...certificate,
        language: language.name,
      })),
    ),
  );

  protected readonly certificatePages = computed(() => {
    const total = this.visibleCertificates().length;
    return Array.from(
      { length: Math.ceil(total / this.certificatesPerView) },
      (_, index) => index,
    );
  });

  protected readonly visibleProjects = computed(() =>
    this.data.projects.filter((item) => this.matchesProfile(item.tag)),
  );

  protected readonly visibleResearch = computed<ResearchItem[]>(() =>
    this.data.research.filter((item) => this.matchesProfile(item.tag)),
  );

  protected readonly visibleExperience = computed(() =>
    this.data.experience.filter((item) => this.matchesProfile(item.tag)),
  );

  protected readonly projectCategories = computed<ProjectCategory[]>(() => [
    'Todos',
    ...new Set(this.visibleProjects().map((project) => project.category)),
  ]);

  protected readonly filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const projects = this.visibleProjects();

    if (category === 'Todos') {
      return projects;
    }

    return projects.filter((project) => project.category === category);
  });

  protected readonly activeExperienceEntry = computed<ExperienceItem | undefined>(() => {
    const experience = this.visibleExperience();
    const activeId = this.activeExperienceId();

    if (activeId) {
      return experience.find((item) => item.id === activeId);
    }

    return experience[0];
  });

  protected readonly certificateTranslate = computed(
    () => `translateX(-${this.activeCertificatePage() * 100}%)`,
  );

  protected setProfile(mode: ProfileMode): void {
    this.currentProfile.set(mode);
    this.selectedCategory.set('Todos');
    this.activeExperienceId.set(null);
    this.mobileMenuOpen.set(false);
    this.activeCertificatePage.set(0);
    this.restartCertificatesAutoplay();
    this.refreshRevealNodes();
  }

  protected selectCategory(category: ProjectCategory): void {
    this.selectedCategory.set(category);
    this.refreshRevealNodes();
  }

  protected toggleExperience(id: string): void {
    this.activeExperienceId.update((currentId) => (currentId === id ? null : id));
  }

  protected isExperienceOpen(id: string, index: number): boolean {
    const activeId = this.activeExperienceId();

    if (activeId === null) {
      return index === 0;
    }

    return activeId === id;
  }

  protected certificateImageSrc(item: CertificateItem | LanguageCertificate): string {
    return `${item.assetBase}.png`;
  }

  protected certificatePdfHref(item: CertificateItem | LanguageCertificate): string {
    return `${item.assetBase}.pdf`;
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected nextCertificate(): void {
    const certificates = this.visibleCertificates();

    if (!certificates.length) {
      return;
    }

    const totalPages = this.certificatePages().length;
    this.activeCertificatePage.update((page) => (page + 1) % totalPages);
    this.restartCertificatesAutoplay();
  }

  protected previousCertificate(): void {
    const certificates = this.visibleCertificates();

    if (!certificates.length) {
      return;
    }

    const totalPages = this.certificatePages().length;
    this.activeCertificatePage.update((page) => (page - 1 + totalPages) % totalPages);
    this.restartCertificatesAutoplay();
  }

  protected goToCertificatePage(index: number): void {
    this.activeCertificatePage.set(index);
    this.restartCertificatesAutoplay();
  }

  protected onCertificatePointerDown(event: PointerEvent): void {
    this.isDraggingCertificates = true;
    this.pointerStartX = event.clientX;
    this.pointerDeltaX = 0;
    this.cursorPressed.set(true);
  }

  protected onCertificatePointerMove(event: PointerEvent): void {
    if (!this.isDraggingCertificates) {
      return;
    }

    this.pointerDeltaX = event.clientX - this.pointerStartX;
  }

  protected onCertificatePointerUp(): void {
    if (!this.isDraggingCertificates) {
      this.cursorPressed.set(false);
      return;
    }

    if (this.pointerDeltaX <= -60) {
      this.nextCertificate();
    } else if (this.pointerDeltaX >= 60) {
      this.previousCertificate();
    }

    this.isDraggingCertificates = false;
    this.pointerDeltaX = 0;
    this.cursorPressed.set(false);
  }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this.revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.renderer.addClass(entry.target, 'is-visible');
              this.revealObserver?.unobserve(entry.target);
            }
          }
        },
        {
          threshold: 0.18,
          rootMargin: '0px 0px -10% 0px',
        },
      );
    }

    this.refreshRevealNodes();
    this.startCertificatesAutoplay();

    this.destroyRef.onDestroy(() => {
      this.revealObserver?.disconnect();
      this.stopCertificatesAutoplay();
    });
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.showFloatingNav.set(window.scrollY > 220);
  }

  @HostListener('window:resize')
  protected onWindowResize(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.innerWidth > 720) {
      this.mobileMenuOpen.set(false);
    }

    if (window.innerWidth <= 720) {
      this.showCursor.set(false);
    }
  }

  @HostListener('document:pointermove', ['$event'])
  protected onPointerMove(event: PointerEvent): void {
    if (typeof window === 'undefined' || window.innerWidth <= 720) {
      this.showCursor.set(false);
      return;
    }

    this.cursorX.set(event.clientX);
    this.cursorY.set(event.clientY);
    this.showCursor.set(true);
  }

  @HostListener('document:pointerleave')
  protected onPointerLeave(): void {
    this.showCursor.set(false);
    this.cursorPressed.set(false);
  }

  @HostListener('document:pointerdown')
  protected onPointerDown(): void {
    this.cursorPressed.set(true);
  }

  @HostListener('document:pointerup')
  protected onPointerUp(): void {
    this.cursorPressed.set(false);
  }

  private matchesProfile(tag: ProfileTag): boolean {
    return tag === 'BOTH' || tag === this.currentProfile();
  }

  private startCertificatesAutoplay(): void {
    this.stopCertificatesAutoplay();

    if (typeof window === 'undefined' || this.visibleCertificates().length <= 1) {
      return;
    }

    this.certificatesIntervalId = setInterval(() => {
      this.activeCertificatePage.update((page) => {
        const total = this.certificatePages().length;
        return total ? (page + 1) % total : 0;
      });
    }, 3000);
  }

  private stopCertificatesAutoplay(): void {
    if (this.certificatesIntervalId !== null) {
      clearInterval(this.certificatesIntervalId);
      this.certificatesIntervalId = null;
    }
  }

  private restartCertificatesAutoplay(): void {
    this.startCertificatesAutoplay();
  }

  private refreshRevealNodes(): void {
    const run = () => {
      const revealNodes = Array.from(
        this.host.nativeElement.querySelectorAll('[data-reveal]'),
      ) as HTMLElement[];

      revealNodes.forEach((node: HTMLElement) => {
        if (!this.revealObserver) {
          this.renderer.addClass(node, 'is-visible');
          return;
        }

        if (node.classList.contains('is-visible')) {
          return;
        }

        const rect = node.getBoundingClientRect();
        const viewportHeight =
          typeof window !== 'undefined' ? window.innerHeight : Number.POSITIVE_INFINITY;

        if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
          this.renderer.addClass(node, 'is-visible');
          return;
        }

        this.revealObserver.observe(node);
      });
    };

    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(run);
      return;
    }

    queueMicrotask(run);
  }
}
