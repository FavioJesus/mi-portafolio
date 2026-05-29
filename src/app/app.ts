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
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import {
  EducationItem,
  ExperienceItem,
  FloatingNavItem,
  ProfileMode,
  ProfileTag,
  ProjectCategory,
  ResearchItem,
  SectionConfig,
  portfolioData,
} from './portfolio.data';

type EducationDisplayItem = {
  id: string;
  title: string;
  issuer: string;
  period: string;
  type: string;
  duration?: string;
  description?: string;
  assetBase?: string;
  alt?: string;
  linkLabel?: string;
  badges?: string[];
  tag: ProfileTag;
};

const EDUCATION_PAGE_SIZE = 5;
type LanguageMode = 'ES' | 'EN';

const EN_TRANSLATIONS: Record<string, string> = {
  Inicio: 'Home',
  Certificados: 'Certificates',
  Educacion: 'Education',
  Idiomas: 'Languages',
  Proyectos: 'Projects',
  Investigacion: 'Research',
  Experiencia: 'Experience',
  Contacto: 'Contact',
  Contactame: 'Contact me',
  'Ver experiencia': 'View experience',
  'Ingeniero InformÃ¡tico': 'Computer Engineer',
  'Ingeniero Informático': 'Computer Engineer',
  'Analista BI y Data': 'BI and Data Analyst',
  'Desarrollador especializado en aplicaciones web, APIs, bases de datos y soluciones empresariales con Angular, .NET, Spring Boot, SQL Server, PostgreSQL y Oracle.':
    'Developer focused on web applications, APIs, databases, and business solutions with Angular, .NET, Spring Boot, SQL Server, PostgreSQL, and Oracle.',
  'Profesional con experiencia en migracion de datos, SQL, PowerBI, Looker Studio, analisis de datos, reporting y automatizacion de procesos.':
    'Professional with experience in data migration, SQL, Power BI, Looker Studio, data analysis, reporting, and process automation.',
  'anos de experiencia en desarrollo y datos': 'years of experience in development and data',
  'aplicativos web implementados o mantenidos': 'web applications delivered or maintained',
  'articulos de investigacion publicados en IEEE': 'research papers published in IEEE',
  'certificaciones y cursos tecnicos': 'certifications and technical courses',
  'Educacion y certificaciones.': 'Education and certifications.',
  'Investigacion y publicaciones.': 'Research and publications.',
  'Mostrar mas': 'Show more',
  'Mostrar menos': 'Show less',
  'Ver certificado': 'View certificate',
  'Descargar certificado': 'Download certificate',
  'Enviar': 'Send',
  'Abrir': 'Open',
  'Todos': 'All',
  'Aplicaciones, APIs y soluciones web.': 'Applications, APIs, and web solutions.',
  'Casos de BI, datos e ingenieria de datos.': 'BI, data, and data engineering work.',
  'Idiomas.': 'Languages.',
  'Espanol, ingles y portugues para documentacion tecnica, reuniones y trabajo con equipos diversos.':
    'Spanish, English, and Portuguese for technical documentation, meetings, and teamwork.',
  'Espanol, ingles y portugues para lectura tecnica, documentacion, presentaciones y colaboracion.':
    'Spanish, English, and Portuguese for technical reading, documentation, presentations, and collaboration.',
  'Experiencia en software.': 'Software experience.',
  'He trabajado construyendo y manteniendo aplicaciones web, APIs, integraciones y bases de datos en entornos reales.':
    'I have built and maintained web applications, APIs, integrations, and databases in real environments.',
  'Experiencia en datos.': 'Data experience.',
  'He participado en migracion de datos, consultas SQL, dashboards, automatizacion y reporting para apoyar decisiones.':
    'I have worked on data migration, SQL queries, dashboards, automation, and reporting to support decisions.',
  'Conversemos sobre tu proximo proyecto': "Let's talk about your next project",
  'Puedo ayudarte a construir aplicaciones web, integrar APIs, ordenar datos o convertir informacion en dashboards utiles para el equipo.':
    'I can help you build web applications, integrate APIs, organize data, or turn information into useful dashboards for your team.',
  'Todos los derechos reservados.': 'All rights reserved.',
  'Titulo en Ingenieria Informatica': 'Degree in Computer Engineering',
  'Bachiller en Ingenieria Informatica': "Bachelor's Degree in Computer Engineering",
  'Ingenieria Informatica': 'Computer Engineering',
  'Maestria en Data Science': "Master's in Data Science",
  'Universidad Nacional Federico Villarreal': 'Federico Villarreal National University',
  'Formacion de posgrado': 'Graduate studies',
  'Titulo profesional': 'Professional degree',
  'Grado academico': 'Academic degree',
  'Carrera universitaria': 'University program',
  Certificacion: 'Certification',
  Maestria: "Master's degree",
  'EN CURSO': 'IN PROGRESS',
  'BACHILLER AUTOMATICO': 'AUTOMATIC BACHELOR',
  '5 anos academicos': '5 academic years',
  'En curso': 'In progress',
  LANGUAGES: 'LANGUAGES',
  Idioma: 'Language',
  Ingles: 'English',
  Portugues: 'Portuguese',
  Avanzado: 'Advanced',
  'Avanzado - B2': 'Advanced - B2',
  'Cambridge Assessment English, lectura tecnica, documentacion y colaboracion profesional.':
    'Cambridge Assessment English, technical reading, documentation, and professional collaboration.',
  'Formacion en UNMSM y uso profesional para lectura y comunicacion.':
    'Training at UNMSM and professional use for reading and communication.',
  'Portugues Avanzado': 'Advanced Portuguese',
  'Aplicativo web institucional para seguimiento de condecoraciones, con interfaz en Angular, integracion de APIs, logica backend y consultas sobre SQL Server.':
    'Institutional web application for tracking decorations, with an Angular interface, API integration, backend logic, and SQL Server queries.',
  'Aplicativo web para gestion e inventario de recursos informaticos, orientado a consulta, registro, seguimiento y mantenimiento de informacion institucional.':
    'Web application for managing and inventorying IT resources, focused on querying, registering, tracking, and maintaining institutional information.',
  'Aplicativo web para seguimiento de informes de control, con funcionalidades de consulta, trazabilidad, integracion de servicios y gestion de datos.':
    'Web application for tracking control reports, with querying, traceability, service integration, and data management features.',
  'Sistema web para Ministerio de Vivienda': 'Web system for the Ministry of Housing',
  'Aplicativo web empresarial desarrollado con Angular, Spring Boot y PostgreSQL, incluyendo frontend integral, APIs, reglas de negocio y documentacion tecnica.':
    'Business web application built with Angular, Spring Boot, and PostgreSQL, including the full frontend, APIs, business rules, and technical documentation.',
  'Dashboards y reporting para gestion institucional': 'Dashboards and reporting for institutional management',
  'Analisis, modelado y visualizacion de datos con PowerBI y Looker Studio para seguimiento de informacion, reporting y toma de decisiones.':
    'Data analysis, modeling, and visualization with Power BI and Looker Studio for information tracking, reporting, and decision-making.',
  'Migracion y automatizacion de datos en SQL Server': 'Data migration and automation in SQL Server',
  'Construccion de vistas, stored procedures y procesos de migracion de datos para consolidar informacion y automatizar operaciones.':
    'Development of views, stored procedures, and data migration processes to consolidate information and automate operations.',
  'KPIs empresariales con SQL experto': 'Business KPIs with advanced SQL',
  'Construccion de queries avanzadas para extraer KPIs desde informacion de distintas empresas, optimizando consultas y transformando datos en indicadores accionables.':
    'Development of advanced queries to extract KPIs from multiple companies, optimizing queries and turning data into actionable indicators.',
  'Ingesta y transformacion macro de datos': 'Large-scale data ingestion and transformation',
  'Procesos de ingesta y transformacion de datos a gran escala usando Spark, Python y ecosistema Hadoop para flujos distribuidos de procesamiento.':
    'Large-scale data ingestion and transformation processes using Spark, Python, and the Hadoop ecosystem for distributed processing workflows.',
  'Ver articulo': 'View paper',
  'Articulo de investigacion publicado en IEEE que propone una arquitectura de inteligencia empresarial para gestionar grandes volumenes de datos en entidades publicas y mejorar la toma de decisiones.':
    'IEEE research paper proposing a business intelligence architecture to manage large data volumes in public entities and improve decision-making.',
  'Articulo de investigacion publicado en IEEE que compara el uso de la red neuronal DEMUCS en plataformas web, escritorio y movil para separar fuentes musicales y evaluar tiempos de ejecucion.':
    'IEEE research paper comparing the DEMUCS neural network on web, desktop, and mobile platforms for music source separation and runtime evaluation.',
  'Analisis de datos': 'Data analysis',
  'Arquitectura BI': 'BI architecture',
  'Redes neuronales': 'Neural networks',
  Web: 'Web',
  Mobile: 'Mobile',
  Backend: 'Backend',
  Data: 'Data',
  'Big Data Engineer': 'Big Data Engineer',
  'Experto SQL': 'SQL Expert',
  'Desarrollador Full Stack': 'Full Stack Developer',
  'Desarrollador Full Stack & Analista BI': 'Full Stack Developer & BI Analyst',
  'Practicante Pre Profesional - Backend y Base de Datos': 'Pre-professional Intern - Backend and Database',
  'Lima, Peru': 'Lima, Peru',
  'Ingenieria Big Data enfocada en procesos de ingesta y transformacion de informacion a nivel macro dentro de ecosistemas distribuidos.':
    'Big Data engineering focused on large-scale information ingestion and transformation within distributed ecosystems.',
  'Desarrollo procesos de ingesta de datos para flujos de informacion de gran escala.':
    'I develop data ingestion processes for large-scale information flows.',
  'Implemento transformaciones con Spark y Python para preparar datos analiticos.':
    'I implement transformations with Spark and Python to prepare analytical data.',
  'Trabajo con HDFS, Azkaban y YARN para ejecucion, orquestacion y procesamiento distribuido.':
    'I work with HDFS, Azkaban, and YARN for execution, orchestration, and distributed processing.',
  'Apoyo la estabilidad y trazabilidad de procesos de datos para consumo analitico.':
    'I support the stability and traceability of data processes for analytical consumption.',
  'Rol especializado en construccion de consultas SQL avanzadas para extraer KPIs de distintas empresas y convertir informacion operacional en indicadores de negocio.':
    'Specialized role building advanced SQL queries to extract KPIs from different companies and turn operational information into business indicators.',
  'Desarrolle queries avanzadas para extraccion y analisis de KPIs empresariales.':
    'I developed advanced queries for business KPI extraction and analysis.',
  'Optimice consultas orientadas a reporting, analisis y seguimiento de negocio.':
    'I optimized queries for reporting, analysis, and business tracking.',
  'Integre informacion de multiples empresas para generar indicadores comparables.':
    'I integrated information from multiple companies to generate comparable indicators.',
  'Apoye requerimientos analiticos con criterio de calidad, consistencia y performance.':
    'I supported analytical requirements with quality, consistency, and performance criteria.',
  'Desarrollo full stack enfocado en aplicativos web institucionales como SISECON, SINVINF y SIMSIC, integrando frontend Angular, backend .NET, APIs, SQL Server, migracion de datos y dashboards con PowerBI.':
    'Full stack development for institutional web applications such as SISECON, SINVINF, and SIMSIC, integrating Angular frontend, .NET backend, APIs, SQL Server, data migration, and Power BI dashboards.',
  'Implemente exitosamente SISECON para seguimiento de condecoraciones.':
    'I successfully implemented SISECON for decoration tracking.',
  'Implemente exitosamente SINVINF para inventario de recursos informaticos.':
    'I successfully implemented SINVINF for IT resource inventory.',
  'Implemente exitosamente SIMSIC para seguimiento de informes de control.':
    'I successfully implemented SIMSIC for control report tracking.',
  'Desarrolle interfaces responsivas usando Angular, HTML, CSS y TypeScript.':
    'I developed responsive interfaces using Angular, HTML, CSS, and TypeScript.',
  'Implemente APIs y logica de negocio en .NET para consumo desde el frontend.':
    'I implemented APIs and business logic in .NET for frontend consumption.',
  'Desarrolle vistas, stored procedures y procesos de migracion de datos en SQL Server.':
    'I developed views, stored procedures, and data migration processes in SQL Server.',
  'Integre dashboards de PowerBI para visualizacion y seguimiento de informacion.':
    'I integrated Power BI dashboards for information visualization and tracking.',
  'Desarrollo full stack y analisis BI con responsabilidades en frontend, backend, base de datos, analisis de datos, administracion AWS, documentacion tecnica y soporte a requerimientos bajo SCRUM.':
    'Full stack development and BI analysis with responsibilities across frontend, backend, databases, data analysis, AWS administration, technical documentation, and SCRUM-based requirements support.',
  'Implemente exitosamente un aplicativo web para el Ministerio de Vivienda, Construccion y Saneamiento.':
    'I successfully implemented a web application for the Ministry of Housing, Construction, and Sanitation.',
  'Desarrolle el frontend integral de la aplicacion usando Angular y TypeScript.':
    'I developed the full frontend of the application using Angular and TypeScript.',
  'Implemente APIs y logica de negocio con Java Spring Boot.':
    'I implemented APIs and business logic with Java Spring Boot.',
  'Disene la base de datos del negocio usando PostgreSQL.':
    'I designed the business database using PostgreSQL.',
  'Implemente triggers y stored procedures para automatizar procesos de negocio.':
    'I implemented triggers and stored procedures to automate business processes.',
  'Desarrolle analisis de datos y visualizaciones con PowerBI y Looker Studio.':
    'I developed data analysis and visualizations with Power BI and Looker Studio.',
  'Administre infraestructura en AWS y elabore documentacion tecnica del sistema.':
    'I administered AWS infrastructure and prepared system technical documentation.',
  'Proyecto consultoria': 'Consulting project',
  'Practicas pre profesionales enfocadas en desarrollo backend con Java Spring Boot, diseno y administracion de PostgreSQL, automatizacion con triggers y soporte a infraestructura AWS.':
    'Pre-professional internship focused on backend development with Java Spring Boot, PostgreSQL design and administration, trigger automation, and AWS infrastructure support.',
  'Implemente triggers para automatizar procesos y reducir tiempos en calculos relacionados con tratamiento de aguas residuales.':
    'I implemented triggers to automate processes and reduce calculation times related to wastewater treatment.',
  'Desarrolle APIs y logica de negocio con Java Spring Boot.':
    'I developed APIs and business logic with Java Spring Boot.',
  'Disene estructuras de base de datos en PostgreSQL.':
    'I designed database structures in PostgreSQL.',
  'Administre roles, permisos e indices de base de datos.':
    'I administered database roles, permissions, and indexes.',
  'Brinde soporte a la administracion del servidor AWS.':
    'I supported AWS server administration.',
  'Ministerio de Vivienda, Construccion y Saneamiento':
    'Ministry of Housing, Construction, and Sanitation',
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private revealObserver?: IntersectionObserver;

  protected readonly data = portfolioData;
  protected readonly currentRoute = signal('');
  protected readonly currentProfile = signal<ProfileMode>('SOFTWARE');
  protected readonly currentLanguage = signal<LanguageMode>('ES');
  protected readonly selectedCategory = signal<ProjectCategory>('Todos');
  protected readonly showFloatingNav = signal(false);
  protected readonly activeEducationId = signal<string | null>(null);
  protected readonly activeExperienceId = signal<string | null>(null);
  protected readonly educationVisibleCount = signal(EDUCATION_PAGE_SIZE);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly activeCertificatePage = signal(0);
  protected readonly cursorX = signal(0);
  protected readonly cursorY = signal(0);
  protected readonly showCursor = signal(false);
  protected readonly cursorPressed = signal(false);
  protected readonly showRoutedPage = computed(() => this.currentRoute().startsWith('/pedidos'));

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

  protected readonly visibleEducation = computed<EducationDisplayItem[]>(() => {
    const education = this.data.education.map((item: EducationItem) => ({
        id: this.educationId(item.title, item.period),
        title: item.title,
        issuer: item.issuer,
        period: item.period,
        type: item.type,
        duration: item.duration,
        badges: item.badges,
        tag: item.tag,
      }));

    const certificates = this.data.certificates.map((item) => ({
      id: this.educationId(item.title, item.issued),
      title: item.title,
      issuer: item.issuer,
      period: item.issued,
      type: item.title.startsWith('Titulo') ? 'Titulo profesional' : 'Certificacion',
      duration: this.timelineDuration(item.issued),
      assetBase: item.assetBase,
      alt: item.alt,
      linkLabel: item.linkLabel,
      badges: item.badges,
      tag: item.tag,
    }));

    const languages = this.data.languages.map((item) => ({
      id: this.educationId(`language-${item.name}`, item.level),
      title: item.name,
      issuer: 'Idioma',
      period: item.level,
      type: 'LANGUAGES',
      description: item.context,
      assetBase: item.certificates?.[0]?.assetBase,
      alt: item.certificates?.[0]?.alt,
      linkLabel: item.certificates?.[0]?.linkLabel,
      badges: item.name === 'Espanol' ? ['NATIVE'] : undefined,
      tag: 'BOTH' as ProfileTag,
    }));

    return [...education, ...certificates, ...languages]
      .filter((item) => this.matchesProfile(item.tag))
      .sort((left, right) => this.timelineOrder(right.period) - this.timelineOrder(left.period));
  });

  protected readonly displayedEducation = computed<EducationDisplayItem[]>(() => {
    const items = this.visibleEducation();
    const current = items.filter((item) => this.isCurrentEducation(item));
    const remarkable = items.filter(
      (item) => !this.isCurrentEducation(item) && this.isRemarkableEducation(item),
    );
    const regular = items.filter(
      (item) => !this.isCurrentEducation(item) && !this.isRemarkableEducation(item),
    );
    const regularCount = Math.max(
      0,
      this.educationVisibleCount() - current.length - remarkable.length,
    );

    return [...current, ...remarkable, ...regular.slice(0, regularCount)];
  });

  protected readonly hasMoreEducation = computed(
    () => this.displayedEducation().length < this.visibleEducation().length,
  );

  protected readonly canCollapseEducation = computed(
    () => this.educationVisibleCount() > EDUCATION_PAGE_SIZE,
  );

  protected readonly languageCertificates = computed(() =>
    this.data.languages.flatMap((language) =>
      (language.certificates ?? []).map((certificate) => ({
        ...certificate,
        language: language.name,
      })),
    ),
  );

  protected readonly certificatePages = computed(() =>
    Array.from({ length: Math.ceil(this.visibleCertificates().length / 2) }, (_, index) => index),
  );

  protected readonly visibleProjects = computed(() =>
    this.data.projects.filter((item) => this.matchesProfile(item.tag)),
  );

  protected readonly visibleResearch = computed<ResearchItem[]>(() =>
    this.data.research.filter((item) => this.matchesProfile(item.tag)),
  );

  constructor() {
    this.currentRoute.set(this.router.url.split('?')[0] || '/');

    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.urlAfterRedirects.split('?')[0] || '/');
      }
    });

    this.destroyRef.onDestroy(() => routerSubscription.unsubscribe());
  }

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
    this.activeEducationId.set(null);
    this.activeExperienceId.set(null);
    this.educationVisibleCount.set(EDUCATION_PAGE_SIZE);
    this.mobileMenuOpen.set(false);
    this.refreshRevealNodes();
  }

  protected setLanguage(mode: LanguageMode): void {
    this.currentLanguage.set(mode);
    this.mobileMenuOpen.set(false);
    this.refreshRevealNodes();
  }

  protected selectCategory(category: ProjectCategory): void {
    this.selectedCategory.set(category);
    this.refreshRevealNodes();
  }

  protected toggleExperience(id: string): void {
    this.activeExperienceId.update((currentId) => (currentId === id ? null : id));
  }

  protected toggleEducation(id: string): void {
    this.activeEducationId.update((currentId) => (currentId === id ? null : id));
  }

  protected isEducationOpen(id: string, index: number): boolean {
    const activeId = this.activeEducationId();

    if (activeId === null) {
      return index === 0;
    }

    return activeId === id;
  }

  protected visibleEducationBadges(item: EducationDisplayItem): string[] {
    return (item.badges ?? []).filter((badge) => badge !== 'REMARKABLE');
  }

  protected text(value: string | undefined): string {
    if (!value || this.currentLanguage() === 'ES') {
      return value ?? '';
    }

    return EN_TRANSLATIONS[value] ?? value;
  }

  protected sectionText(section: SectionConfig, key: 'navLabel' | 'kicker'): string {
    if (key === 'navLabel') {
      return this.text(section.navLabel);
    }

    if (this.currentLanguage() === 'ES') {
      return section.kicker;
    }

    const [index, label] = section.kicker.split('/').map((value) => value.trim());
    return `${index} / ${this.text(label)}`;
  }

  protected floatingLabel(item: FloatingNavItem): string {
    return this.text(item.label);
  }

  protected periodText(value: string): string {
    if (this.currentLanguage() === 'ES') {
      return value;
    }

    return value.replaceAll('Actualidad', 'Present');
  }

  protected durationText(value: string | undefined): string {
    if (!value || this.currentLanguage() === 'ES') {
      return value ?? '';
    }

    return value
      .replaceAll('En curso', 'In progress')
      .replaceAll('anos academicos', 'academic years')
      .replaceAll('anos', 'years')
      .replaceAll('meses', 'months');
  }

  protected categoryText(category: ProjectCategory): string {
    return this.text(category);
  }

  protected actionText(link: { href: string }): string {
    const label = link.href.startsWith('mailto:') ? 'Enviar' : 'Abrir';
    return this.text(label);
  }

  protected footerText(): string {
    return this.currentLanguage() === 'ES'
      ? 'Todos los derechos reservados.'
      : 'All rights reserved.';
  }

  protected showMoreEducation(): void {
    this.educationVisibleCount.update((count) =>
      Math.min(count + EDUCATION_PAGE_SIZE, this.visibleEducation().length),
    );
    this.refreshRevealNodes();
  }

  protected collapseEducation(): void {
    this.educationVisibleCount.set(EDUCATION_PAGE_SIZE);
    this.activeEducationId.set(null);
    this.refreshRevealNodes();
  }

  protected isExperienceOpen(id: string, index: number): boolean {
    const activeId = this.activeExperienceId();

    if (activeId === null) {
      return index === 0;
    }

    return activeId === id;
  }

  protected certificateImageSrc(item: { assetBase: string }): string {
    return `${item.assetBase}.png`;
  }

  protected certificatePdfHref(item: { assetBase: string }): string {
    return `${item.assetBase}.pdf`;
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  protected nextCertificate(): void {
    const totalPages = this.certificatePages().length;

    if (!totalPages) {
      return;
    }

    this.activeCertificatePage.update((page) => (page + 1) % totalPages);
  }

  protected previousCertificate(): void {
    const totalPages = this.certificatePages().length;

    if (!totalPages) {
      return;
    }

    this.activeCertificatePage.update((page) => (page - 1 + totalPages) % totalPages);
  }

  protected goToCertificatePage(index: number): void {
    this.activeCertificatePage.set(index);
  }

  protected onCertificatePointerDown(_event?: PointerEvent): void {
    this.cursorPressed.set(true);
  }

  protected onCertificatePointerMove(_event?: PointerEvent): void {
    return;
  }

  protected onCertificatePointerUp(): void {
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

    this.destroyRef.onDestroy(() => {
      this.revealObserver?.disconnect();
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

  private isRemarkableEducation(item: EducationDisplayItem): boolean {
    return item.badges?.includes('REMARKABLE') ?? false;
  }

  private isCurrentEducation(item: EducationDisplayItem): boolean {
    return item.period.includes('Actualidad') || item.period.includes('Present');
  }

  private educationId(title: string, period: string): string {
    return `${title}-${period}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private timelineOrder(period: string): number {
    const [start, end] = period.split(' - ').map((value) => value.trim());

    if (end === 'Actualidad' || end === 'Present') {
      return Number.MAX_SAFE_INTEGER;
    }

    if (start.includes('/')) {
      const [day, month, year] = start.split('/').map(Number);
      return new Date(year, month - 1, day).getTime();
    }

    const year = Number.parseInt(start, 10);
    return Number.isNaN(year) ? 0 : new Date(year, 0, 1).getTime();
  }

  private timelineDuration(period: string): string {
    const [start, end] = period.split(' - ').map((value) => value.trim());

    if (!end || end === 'Actualidad' || end === 'Present') {
      return this.currentLanguage() === 'ES' ? 'En curso' : 'In progress';
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
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;

      if (remainingMonths === 0) {
        return `${years} anos`;
      }

      return `${years} anos ${remainingMonths} meses`;
    }

    return `${months} meses`;
  }

  private parseTimelineDate(value: string): Date | null {
    if (value.includes('/')) {
      const [day, month, year] = value.split('/').map(Number);
      return new Date(year, month - 1, day);
    }

    const year = Number.parseInt(value, 10);
    return Number.isNaN(year) ? null : new Date(year, 0, 1);
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
