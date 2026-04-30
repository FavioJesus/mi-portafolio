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
  EducationItem,
  ExperienceItem,
  FloatingNavItem,
  LanguageCertificate,
  ProfileMode,
  ProfileTag,
  ProjectCategory,
  ResearchItem,
  portfolioData,
} from './portfolio.data';

type EducationTimelineEntry = {
  title: string;
  issuer: string;
  period: string;
  type: string;
  duration?: string;
  rangeLabel: string;
  startPct: number;
  widthPct: number;
  lane: number;
  offsetRem: number;
  offsetAbsRem: number;
  side: number;
  kind: 'range' | 'milestone';
  accent: 'highlight' | 'default';
  endPct: number;
  startGlowOrder: number;
  endGlowOrder: number;
  tag: ProfileTag;
};

type EducationTimelineKind = 'range' | 'milestone';
type EducationTimelineGlowEvent = {
  itemIndex: number;
  edge: 'start' | 'end';
  date: Date;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private readonly timelineStartYear = 2018;
  private readonly timelineEndYear = 2026;
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

  protected readonly visibleEducationTimeline = computed<EducationTimelineEntry[]>(() => {
    const education: EducationTimelineEntry[] = this.data.education.map((item: EducationItem) => ({
        title: item.title,
        issuer: item.issuer,
        period: item.period,
        type: item.type,
        duration: item.duration,
        rangeLabel: item.period,
        startPct: 0,
        widthPct: 0,
        lane: 0,
        offsetRem: 0,
        offsetAbsRem: 0,
        side: 1,
        kind: (item.kind ?? 'range') as EducationTimelineKind,
        accent: (item.badges?.length ? 'highlight' : 'default') as 'highlight' | 'default',
        endPct: 0,
        startGlowOrder: 0,
        endGlowOrder: 0,
        tag: item.tag,
      }));

    const certificates: EducationTimelineEntry[] = this.data.certificates.map(
      (item: CertificateItem) => ({
      title: item.title,
      issuer: item.issuer,
      period: item.issued,
      type: item.title.startsWith('Titulo') ? 'Titulo profesional' : 'Certificado',
      duration: this.timelineDuration(item.issued),
      rangeLabel: this.timelineRange(item.issued),
      startPct: 0,
      widthPct: 0,
      lane: 0,
      offsetRem: 0,
      offsetAbsRem: 0,
      side: 1,
      kind: (item.issued.includes(' - ') ? 'range' : 'milestone') as EducationTimelineKind,
      accent: (item.badges?.length ? 'highlight' : 'default') as 'highlight' | 'default',
      endPct: 0,
      startGlowOrder: 0,
      endGlowOrder: 0,
      tag: item.tag,
    }));

    const sorted = [...education, ...certificates].sort(
      (left, right) => this.timelineOrder(left.period) - this.timelineOrder(right.period),
    );

    const positioned = sorted.map((item) => {
      const geometry = this.timelineGeometry(item.period, item.kind);

      return {
        ...item,
        startPct: geometry.startPct,
        widthPct: geometry.widthPct,
        endPct: geometry.endPct,
      };
    });

    return this.assignTimelineLanes(this.assignTimelineGlowOrders(positioned));
  });

  protected readonly educationTimelineYears = computed(() =>
    Array.from(
      { length: this.timelineEndYear - this.timelineStartYear + 1 },
      (_, index) => this.timelineStartYear + index,
    ),
  );

  protected readonly educationTimelineGlowCycle = computed(() => {
    const maxOrder = this.visibleEducationTimeline().reduce(
      (currentMax, item) => Math.max(currentMax, item.startGlowOrder, item.endGlowOrder),
      0,
    );

    return `${Math.max(maxOrder + 1, 1) * 0.75}s`;
  });

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

  private timelineOrder(period: string): number {
    const [start] = period.split(' - ').map((value) => value.trim());

    if (start.includes('/')) {
      const [day, month, year] = start.split('/').map(Number);
      return new Date(year, month - 1, day).getTime();
    }

    const year = Number.parseInt(start, 10);
    return Number.isNaN(year) ? Number.MAX_SAFE_INTEGER : new Date(year, 0, 1).getTime();
  }

  private timelineRange(period: string): string {
    const [start, end] = period.split(' - ').map((value) => value.trim());

    if (!end) {
      return start;
    }

    return `${this.compactDate(start)} -> ${this.compactDate(end)}`;
  }

  private timelineDuration(period: string): string {
    const [start, end] = period.split(' - ').map((value) => value.trim());

    if (!end || end === 'Actualidad') {
      return 'En curso';
    }

    const startDate = this.parseTimelineDate(start);
    const endDate = this.parseTimelineDate(end);

    if (!startDate || !endDate) {
      return period;
    }

    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth()) +
      1;

    if (months >= 12) {
      const years = Math.round((months / 12) * 10) / 10;
      return years % 1 === 0 ? `${years} anos` : `${years} anos`;
    }

    return `${months} meses`;
  }

  private compactDate(value: string): string {
    if (value === 'Actualidad') {
      const today = new Date();
      return `${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    }

    if (value.includes('/')) {
      const [, month, year] = value.split('/');
      return `${month}/${year}`;
    }

    return value;
  }

  private parseTimelineDate(value: string): Date | null {
    if (value.includes('/')) {
      const [day, month, year] = value.split('/').map(Number);
      return new Date(year, month - 1, day);
    }

    const year = Number.parseInt(value, 10);
    return Number.isNaN(year) ? null : new Date(year, 0, 1);
  }

  private timelineGeometry(
    period: string,
    kind: 'range' | 'milestone',
  ): { startPct: number; widthPct: number; endPct: number } {
    const [startRaw, endRaw] = period.split(' - ').map((value) => value.trim());
    const startDate = this.parseTimelineDate(startRaw);
    const endDate =
      endRaw === 'Actualidad'
        ? new Date()
        : this.parseTimelineDate(endRaw ?? startRaw);

    if (!startDate) {
      return { startPct: 0, widthPct: 8, endPct: 8 };
    }

    const totalMonths = (this.timelineEndYear - this.timelineStartYear + 1) * 12;
    const startMonths =
      (startDate.getFullYear() - this.timelineStartYear) * 12 + startDate.getMonth();
    const clampedStart = Math.max(0, Math.min(totalMonths, startMonths));
    const startPct = (clampedStart / totalMonths) * 100;

    if (kind === 'milestone' || !endDate) {
      return { startPct, widthPct: 0, endPct: startPct + 6 };
    }

    const endMonths =
      (endDate.getFullYear() - this.timelineStartYear) * 12 + endDate.getMonth() + 1;
    const clampedEnd = Math.max(clampedStart + 1, Math.min(totalMonths, endMonths));
    const widthPct = ((clampedEnd - clampedStart) / totalMonths) * 100;
    const endPct = startPct + widthPct;

    return { startPct, widthPct, endPct };
  }

  private assignTimelineLanes(items: EducationTimelineEntry[]): EducationTimelineEntry[] {
    const topLanes: number[] = [];
    const bottomLanes: number[] = [];

    return items.map((item) => {
      const targetLanes = item.kind === 'range' ? topLanes : bottomLanes;
      const visualWidth = this.timelineVisualWidth(item);
      const visualEndPct = item.startPct + visualWidth;
      const separation = item.accent === 'highlight' ? 2.6 : 1.6;
      let lane = targetLanes.findIndex((endPct) => item.startPct >= endPct + separation);

      if (lane === -1) {
        lane = targetLanes.length;
        targetLanes.push(visualEndPct);
      } else {
        targetLanes[lane] = visualEndPct;
      }

        const offsetRem = this.timelineLaneOffset(lane, item.kind);

        return {
          ...item,
          lane,
          offsetRem,
          offsetAbsRem: Math.abs(offsetRem),
          side: offsetRem < 0 ? -1 : 1,
        };
      });
    }

    private timelineVisualWidth(item: EducationTimelineEntry): number {
      const fixedCardWidthPct = item.accent === 'highlight' ? 8.4 : 6.4;

      if (item.kind === 'range' && item.accent === 'highlight') {
        return Math.max(item.widthPct, fixedCardWidthPct);
      }

      return fixedCardWidthPct;
    }

    private timelineLaneOffset(lane: number, kind: EducationTimelineKind): number {
      const direction = lane % 2 === 0 ? -1 : 1;
      const magnitude = (Math.floor((lane + 1) / 2) + 1) * (kind === 'range' ? 3.4 : 3.8);

      return direction * magnitude;
    }

  private assignTimelineGlowOrders(items: EducationTimelineEntry[]): EducationTimelineEntry[] {
    const events = items.flatMap((item, itemIndex) => {
      const dates = this.timelineEventDates(item.period, item.kind);
      const itemEvents: EducationTimelineGlowEvent[] = [
        { itemIndex, edge: 'start', date: dates.start },
      ];

      if (dates.end) {
        itemEvents.push({ itemIndex, edge: 'end' as const, date: dates.end });
      }

      return itemEvents;
    });

    events.sort((left, right) => {
      const dateDiff = left.date.getTime() - right.date.getTime();

      if (dateDiff !== 0) {
        return dateDiff;
      }

      return left.edge === right.edge ? 0 : left.edge === 'start' ? -1 : 1;
    });

    return items.map((item, itemIndex) => {
      const startEventIndex = events.findIndex(
        (event) => event.itemIndex === itemIndex && event.edge === 'start',
      );
      const endEventIndex = events.findIndex(
        (event) => event.itemIndex === itemIndex && event.edge === 'end',
      );

      return {
        ...item,
        startGlowOrder: Math.max(startEventIndex, 0),
        endGlowOrder: endEventIndex >= 0 ? endEventIndex : Math.max(startEventIndex, 0),
      };
    });
  }

  private timelineEventDates(
    period: string,
    kind: EducationTimelineKind,
  ): { start: Date; end: Date | null } {
    const [startRaw, endRaw] = period.split(' - ').map((value) => value.trim());
    const start = this.parseTimelineDate(startRaw) ?? new Date(this.timelineStartYear, 0, 1);

    if (kind === 'milestone' || !endRaw) {
      return { start, end: null };
    }

    const end = endRaw === 'Actualidad' ? new Date() : this.parseTimelineDate(endRaw);

    return { start, end };
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
