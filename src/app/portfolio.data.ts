export type ProjectCategory = 'Todos' | 'Web' | 'Mobile' | 'Backend' | 'Data';
export type ProfileMode = 'SOFTWARE' | 'BIGDATA';
export type ProfileTag = ProfileMode | 'BOTH';
export type SectionId =
  | 'home'
  | 'certificates'
  | 'languages'
  | 'projects'
  | 'experience'
  | 'contact';

export interface TaggedContent {
  tag: ProfileTag;
}

export interface SectionConfig {
  id: SectionId;
  navLabel: string;
  kicker: string;
  visible: boolean;
}

export interface FloatingNavItem {
  code: string;
  label: string;
  target: SectionId;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface StatItem extends TaggedContent {
  value: string;
  label: string;
}

export interface ExpertiseItem extends TaggedContent {
  title: string;
  accent: string;
  description: string;
}

export interface CertificateItem extends TaggedContent {
  title: string;
  issuer: string;
  issued: string;
  image: ImageAsset;
  link?: string;
  linkLabel?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  context: string;
}

export interface ProjectItem extends TaggedContent {
  title: string;
  category: Exclude<ProjectCategory, 'Todos'>;
  year: string;
  summary: string;
  stack: string[];
  linkLabel: string;
  link: string;
  image?: ImageAsset;
}

export interface ExperienceItem extends TaggedContent {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  websiteLabel: string;
  website: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface ProfileVariant {
  mode: ProfileMode;
  switchLabel: string;
  eyebrow: string;
  role: string;
  tagline: string;
  availability: string;
  floatingNav: FloatingNavItem[];
  heroCode: string[];
  certificatesTitle: string;
  certificatesText: string;
  projectsTitle: string;
  languagesTitle: string;
  languagesText: string;
  experienceTitle: string;
  experienceText: string;
}

export const portfolioData = {
  sections: {
    home: {
      id: 'home',
      navLabel: 'Inicio',
      kicker: '00 / Inicio',
      visible: true,
    },
    certificates: {
      id: 'certificates',
      navLabel: 'Certificados',
      kicker: '01 / Certificados',
      visible: true,
    },
    languages: {
      id: 'languages',
      navLabel: 'Idiomas',
      kicker: '02 / Idiomas',
      visible: true,
    },
    projects: {
      id: 'projects',
      navLabel: 'Proyectos',
      kicker: '03 / Proyectos',
      visible: true,
    },
    experience: {
      id: 'experience',
      navLabel: 'Experiencia',
      kicker: '04 / Experiencia',
      visible: true,
    },
    contact: {
      id: 'contact',
      navLabel: 'Contacto',
      kicker: '05 / Contacto',
      visible: true,
    },
  } satisfies Record<SectionId, SectionConfig>,
  profile: {
    name: 'Tu Nombre',
    location: 'Peru',
    photo: {
      src: '/assets/profile/tu-foto.jpg',
      alt: 'Retrato profesional de Tu Nombre',
    },
    resumeLabel: 'Ver experiencia',
    resumeLink: '#experience',
    contactLabel: 'Contactame',
    contactLink: '#contact',
    email: 'tunombre@email.com',
  },
  variants: {
    SOFTWARE: {
      mode: 'SOFTWARE',
      switchLabel: 'Software Development',
      eyebrow: 'Software engineer / web development profile',
      role: 'Ingeniero Informatico y Desarrollador de Software',
      tagline:
        'Construyo productos web modernos, interfaces claras y experiencias digitales pensadas para escalar sin complejidad innecesaria.',
      availability: 'Disponible para productos web, frontend architecture y desarrollo full stack ligero.',
      floatingNav: [
        { code: 'fn', label: 'home()', target: 'home' },
        { code: 'cert', label: 'certificates', target: 'certificates' },
        { code: 'lang', label: 'languages', target: 'languages' },
        { code: 'map', label: 'projects', target: 'projects' },
        { code: 'log', label: 'experience', target: 'experience' },
        { code: 'open', label: 'contact', target: 'contact' },
      ],
      heroCode: [
        'const engineer = {',
        "specialty: 'web development',",
        "focus: 'frontend, architecture, ux',",
        "stack: ['Angular', 'TS', 'Node'],",
        "mode: 'clean, scalable, maintainable'",
        '}',
      ],
      certificatesTitle: 'Certificaciones orientadas a software.',
      certificatesText:
        'Aqui puedes mostrar cursos, especializaciones y certificados relacionados con desarrollo web, frontend, arquitectura o herramientas de software.',
      projectsTitle: 'Productos y soluciones web filtradas por perfil.',
      languagesTitle: 'Idiomas para colaborar en entornos tecnicos.',
      languagesText:
        'Un resumen claro de los idiomas que manejas para documentacion, reuniones, lectura tecnica o colaboracion internacional.',
      experienceTitle: 'Experiencia enfocada en desarrollo web.',
      experienceText:
        'Este modo prioriza roles, proyectos y stack asociados a construccion de productos, interfaces y arquitectura de software.',
    },
    BIGDATA: {
      mode: 'BIGDATA',
      switchLabel: 'Big Data',
      eyebrow: 'Data engineer / analytics and big data profile',
      role: 'Ingeniero Informatico enfocado en Big Data y Analitica',
      tagline:
        'Trabajo con pipelines, integracion de datos, procesamiento analitico y visualizacion para convertir informacion en decisiones.',
      availability: 'Disponible para pipelines, analitica, reporting y plataformas de datos.',
      floatingNav: [
        { code: 'sql', label: 'select home', target: 'home' },
        { code: 'cert', label: 'certificates', target: 'certificates' },
        { code: 'lang', label: 'languages', target: 'languages' },
        { code: 'scan', label: 'projects', target: 'projects' },
        { code: 'agg', label: 'experience', target: 'experience' },
        { code: 'open', label: 'contact', target: 'contact' },
      ],
      heroCode: [
        'SELECT profile FROM engineer',
        "WHERE focus = 'big_data';",
        '-- pipelines, analytics, dashboards',
        '-- Python, SQL, ETL, BI',
        '-- insights, quality, scalability',
      ],
      certificatesTitle: 'Certificaciones orientadas a datos y analitica.',
      certificatesText:
        'Aqui puedes mostrar cursos, diplomados o certificaciones vinculadas a analitica, BI, ETL, datos o plataformas de informacion.',
      projectsTitle: 'Casos y activos relacionados con datos.',
      languagesTitle: 'Idiomas para analisis, reportes y trabajo colaborativo.',
      languagesText:
        'Esta seccion permanece visible en cualquier perfil para mostrar capacidades de comunicacion en contextos profesionales y tecnicos.',
      experienceTitle: 'Experiencia enfocada en datos y analitica.',
      experienceText:
        'Este modo prioriza los bloques vinculados a reporting, procesamiento de datos, automatizacion y visualizacion.',
    },
  } satisfies Record<ProfileMode, ProfileVariant>,
  stats: [
    { value: '5+', label: 'anos construyendo software', tag: 'SOFTWARE' },
    { value: '8+', label: 'pipelines y tableros analiticos', tag: 'BIGDATA' },
    { value: '12', label: 'proyectos listos para produccion', tag: 'BOTH' },
    { value: '100%', label: 'frontend estatico y veloz', tag: 'SOFTWARE' },
    { value: '24/7', label: 'observacion de metricas criticas', tag: 'BIGDATA' },
  ] satisfies StatItem[],
  certificates: [
    {
      title: 'Certificacion en Desarrollo Frontend',
      issuer: 'Plataforma / Institucion',
      issued: '2026',
      image: {
        src: '/assets/certificates/frontend-certificado.jpg',
        alt: 'Certificado de desarrollo frontend',
      },
      link: 'https://drive.google.com/',
      linkLabel: 'Ver certificado',
      tag: 'SOFTWARE',
    },
    {
      title: 'Curso avanzado de Angular',
      issuer: 'Plataforma / Institucion',
      issued: '2025',
      image: {
        src: '/assets/certificates/angular-avanzado.jpg',
        alt: 'Certificado de curso avanzado de Angular',
      },
      link: 'https://drive.google.com/',
      linkLabel: 'Abrir diploma',
      tag: 'SOFTWARE',
    },
    {
      title: 'Especializacion en UX para productos digitales',
      issuer: 'Plataforma / Institucion',
      issued: '2025',
      image: {
        src: '/assets/certificates/ux-productos.jpg',
        alt: 'Certificado de UX para productos digitales',
      },
      tag: 'SOFTWARE',
    },
    {
      title: 'Certificacion en Analitica o BI',
      issuer: 'Plataforma / Institucion',
      issued: '2025',
      image: {
        src: '/assets/certificates/analytics-certificado.jpg',
        alt: 'Certificado de analitica o business intelligence',
      },
      link: 'https://drive.google.com/',
      linkLabel: 'Descargar',
      tag: 'BIGDATA',
    },
    {
      title: 'Curso de SQL para analisis de datos',
      issuer: 'Plataforma / Institucion',
      issued: '2024',
      image: {
        src: '/assets/certificates/sql-analisis.jpg',
        alt: 'Certificado de SQL para analisis de datos',
      },
      link: 'https://drive.google.com/',
      linkLabel: 'Ver constancia',
      tag: 'BIGDATA',
    },
    {
      title: 'Especializacion en Power BI',
      issuer: 'Plataforma / Institucion',
      issued: '2024',
      image: {
        src: '/assets/certificates/powerbi-especializacion.jpg',
        alt: 'Certificado de especializacion en Power BI',
      },
      tag: 'BIGDATA',
    },
    {
      title: 'Certificado transversal de tecnologia',
      issuer: 'Plataforma / Institucion',
      issued: '2024',
      image: {
        src: '/assets/certificates/general-certificado.jpg',
        alt: 'Certificado general de tecnologia',
      },
      tag: 'BOTH',
    },
    {
      title: 'Fundamentos de cloud computing',
      issuer: 'Plataforma / Institucion',
      issued: '2023',
      image: {
        src: '/assets/certificates/cloud-fundamentos.jpg',
        alt: 'Certificado de fundamentos de cloud computing',
      },
      link: 'https://drive.google.com/',
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
    {
      title: 'Buenas practicas de Git y trabajo colaborativo',
      issuer: 'Plataforma / Institucion',
      issued: '2023',
      image: {
        src: '/assets/certificates/git-colaboracion.jpg',
        alt: 'Certificado de Git y trabajo colaborativo',
      },
      tag: 'BOTH',
    },
  ] satisfies CertificateItem[],
  languages: [
    {
      name: 'Espanol',
      level: 'Nativo',
      context: 'Comunicacion profesional, documentacion y presentaciones.',
    },
    {
      name: 'Ingles',
      level: 'Intermedio',
      context: 'Lectura tecnica, documentacion, cursos y colaboracion remota.',
    },
  ] satisfies LanguageItem[],
  projects: [
    {
      title: 'Dashboard de operaciones',
      category: 'Web',
      year: '2026',
      summary:
        'Panel administrativo con metricas clave, estados operativos y visualizacion clara para equipos internos.',
      stack: ['Angular', 'Charts', 'SCSS'],
      linkLabel: 'Caso de estudio',
      link: '#contact',
      image: {
        src: '/assets/projects/dashboard-operaciones.jpg',
        alt: 'Preview del dashboard de operaciones',
      },
      tag: 'SOFTWARE',
    },
    {
      title: 'Landing para producto SaaS',
      category: 'Web',
      year: '2025',
      summary:
        'Sitio estatico optimizado para conversion, con secciones editables y una identidad visual tecnica.',
      stack: ['Angular', 'SEO', 'Animations'],
      linkLabel: 'Ver demo',
      link: '#home',
      image: {
        src: '/assets/projects/landing-saas.jpg',
        alt: 'Preview de la landing para producto SaaS',
      },
      tag: 'SOFTWARE',
    },
    {
      title: 'Aplicacion de inventario movil',
      category: 'Mobile',
      year: '2025',
      summary:
        'Flujo de trabajo para registro, consulta y trazabilidad de inventario en campo con enfoque offline first.',
      stack: ['Flutter', 'Dart', 'Sync'],
      linkLabel: 'Ver detalles',
      link: '#experience',
      image: {
        src: '/assets/projects/inventario-mobile.jpg',
        alt: 'Preview de la aplicacion movil de inventario',
      },
      tag: 'SOFTWARE',
    },
    {
      title: 'API para gestion academica',
      category: 'Backend',
      year: '2024',
      summary:
        'Servicios y reglas de negocio para manejar usuarios, cursos y reportes con endpoints claros y mantenibles.',
      stack: ['Node.js', 'REST', 'PostgreSQL'],
      linkLabel: 'Arquitectura',
      link: '#contact',
      image: {
        src: '/assets/projects/api-academica.jpg',
        alt: 'Preview de la API para gestion academica',
      },
      tag: 'SOFTWARE',
    },
    {
      title: 'Visualizacion de indicadores',
      category: 'Data',
      year: '2024',
      summary:
        'Representacion de datos operativos con un enfoque visual limpio para detectar patrones rapidamente.',
      stack: ['Python', 'Pandas', 'BI'],
      linkLabel: 'Ver enfoque',
      link: '#projects',
      image: {
        src: '/assets/projects/indicadores-data.jpg',
        alt: 'Preview de visualizacion de indicadores',
      },
      tag: 'BIGDATA',
    },
    {
      title: 'Pipeline de consolidacion comercial',
      category: 'Data',
      year: '2025',
      summary:
        'Proceso ETL para unificar fuentes de ventas, limpiar inconsistencias y publicar indicadores confiables.',
      stack: ['Python', 'SQL', 'ETL'],
      linkLabel: 'Ver pipeline',
      link: '#projects',
      image: {
        src: '/assets/projects/pipeline-comercial.jpg',
        alt: 'Preview del pipeline de consolidacion comercial',
      },
      tag: 'BIGDATA',
    },
  ] satisfies ProjectItem[],
  experience: [
    {
      id: 'frontend-main',
      role: 'Frontend Developer',
      company: 'Empresa / Cliente principal',
      period: '2024 - Actualidad',
      location: 'Lima, Peru',
      websiteLabel: 'empresa.com',
      website: 'https://empresa.com',
      summary:
        'Construccion de interfaces y modulos para productos web con foco en claridad visual, mantenimiento y rendimiento.',
      achievements: [
        'Estructure componentes reutilizables para acelerar nuevas pantallas.',
        'Mejore tiempos de carga eliminando dependencias innecesarias.',
        'Coordine entregas con enfoque en experiencia de usuario y escalabilidad.',
      ],
      stack: ['Angular', 'TypeScript', 'SCSS'],
      tag: 'SOFTWARE',
    },
    {
      id: 'software-consulting',
      role: 'Software Developer',
      company: 'Consultoria / Proyectos independientes',
      period: '2022 - 2024',
      location: 'Remoto',
      websiteLabel: 'proyectos.dev',
      website: 'https://proyectos.dev',
      summary:
        'Desarrollo de soluciones web y soporte a productos digitales para distintos tipos de negocio.',
      achievements: [
        'Implemente landings, paneles internos y formularios personalizados.',
        'Defini estructuras de datos faciles de mantener por el equipo.',
        'Priorice implementaciones simples antes que arquitecturas sobrecargadas.',
      ],
      stack: ['JavaScript', 'Node.js', 'SQL'],
      tag: 'SOFTWARE',
    },
    {
      id: 'data-team',
      role: 'Big Data Team Member',
      company: 'Unidad de datos / analitica',
      period: '2023 - Actualidad',
      location: 'Lima, Peru',
      websiteLabel: 'analytics.local',
      website: 'https://analytics.local',
      summary:
        'Participacion en procesos de integracion, tratamiento y visualizacion de datos para apoyar analisis y toma de decisiones.',
      achievements: [
        'Construi consultas y transformaciones para consolidar datos de multiples fuentes.',
        'Aporte a dashboards y reportes de seguimiento con foco en calidad de datos.',
        'Documente procesos para que el flujo analitico sea mas claro y repetible.',
      ],
      stack: ['Python', 'SQL', 'Power BI'],
      tag: 'BIGDATA',
    },
  ] satisfies ExperienceItem[],
  contact: {
    headline: 'Construyamos algo con identidad propia.',
    text:
      'Puedes usar este portafolio para mostrar tu lado de desarrollo, tu perfil de datos o ambos desde una sola base mantenible.',
    links: [
      { label: 'Email', href: 'mailto:tunombre@email.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
      { label: 'GitHub', href: 'https://github.com/' },
    ],
  },
} as const;
