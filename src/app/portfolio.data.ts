export type ProjectCategory = 'Todos' | 'Web' | 'Mobile' | 'Backend' | 'Data';
export type ProfileMode = 'SOFTWARE' | 'BIGDATA';
export type ProfileTag = ProfileMode | 'BOTH';
export type SectionId =
  | 'home'
  | 'certificates'
  | 'education'
  | 'languages'
  | 'projects'
  | 'research'
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
  assetBase: string;
  alt: string;
  badges?: string[];
  linkLabel?: string;
}

export interface EducationItem extends TaggedContent {
  title: string;
  issuer: string;
  period: string;
  type: string;
  duration?: string;
  badges?: string[];
  kind?: 'range' | 'milestone';
}

export interface LanguageCertificate {
  title: string;
  issuer: string;
  issued: string;
  assetBase: string;
  alt: string;
  linkLabel?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  context: string;
  certificates?: LanguageCertificate[];
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

export interface ResearchItem extends TaggedContent {
  title: string;
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
  logo?: ImageAsset;
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
      visible: false,
    },
    education: {
      id: 'education',
      navLabel: 'Educacion',
      kicker: '01 / Educacion',
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
    research: {
      id: 'research',
      navLabel: 'Investigacion',
      kicker: '04 / Investigacion',
      visible: true,
    },
    experience: {
      id: 'experience',
      navLabel: 'Experiencia',
      kicker: '05 / Experiencia',
      visible: true,
    },
    contact: {
      id: 'contact',
      navLabel: 'Contacto',
      kicker: '06 / Contacto',
      visible: true,
    },
  } satisfies Record<SectionId, SectionConfig>,
  profile: {
    name: 'Favio Jesus Guevara Puente',
    location: 'Lima, Peru',
    photo: {
      src: '/assets/profile/favio-guevara.jpg',
      alt: 'Foto profesional de Favio Jesus Guevara Puente',
    },
    resumeLabel: 'Ver experiencia',
    resumeLink: '#experience',
    contactLabel: 'Contactame',
    contactLink: '#contact',
    email: 'faviogpfk@gmail.com',
  },
  variants: {
    SOFTWARE: {
      mode: 'SOFTWARE',
      switchLabel: 'Software Development',
      eyebrow: 'Full stack developer / software engineering profile',
      role: 'Desarrollador Full Stack',
      tagline:
        'Desarrollador especializado en aplicaciones web, APIs, bases de datos y soluciones empresariales con Angular, .NET, Spring Boot, SQL Server, PostgreSQL y Oracle.',
      availability:
        'Disponible para desarrollo web, backend, integracion de APIs y mantenimiento evolutivo de sistemas.',
      floatingNav: [
        { code: 'fn', label: 'home()', target: 'home' },
        { code: 'edu', label: 'education', target: 'education' },
        { code: 'lang', label: 'languages', target: 'languages' },
        { code: 'map', label: 'projects', target: 'projects' },
        { code: 'pub', label: 'research', target: 'research' },
        { code: 'log', label: 'experience', target: 'experience' },
        { code: 'open', label: 'contact', target: 'contact' },
      ],
      heroCode: [
        'const favio = {',
        "role: 'Full Stack Developer',",
        "frontend: ['Angular', 'TypeScript'],",
        "backend: ['.NET', 'Spring Boot'],",
        "db: ['SQL Server', 'PostgreSQL', 'Oracle']",
        '}',
      ],
      certificatesTitle: 'Certificaciones orientadas a software.',
      certificatesText:
        'Formacion en desarrollo full stack, arquitectura basada en microservicios, Angular, .NET, PHP y practicas de construccion de sistemas empresariales.',
      projectsTitle: 'Aplicaciones, APIs y soluciones web.',
      languagesTitle: 'Idiomas.',
      languagesText:
        'Espanol, ingles y portugues para documentacion tecnica, reuniones y trabajo con equipos diversos.',
      experienceTitle: 'Experiencia en software.',
      experienceText:
        'He trabajado construyendo y manteniendo aplicaciones web, APIs, integraciones y bases de datos en entornos reales.',
    },
    BIGDATA: {
      mode: 'BIGDATA',
      switchLabel: 'Big Data',
      eyebrow: 'BI analyst / data and analytics profile',
      role: 'Analista BI y Data',
      tagline:
        'Profesional con experiencia en migracion de datos, SQL, PowerBI, Looker Studio, analisis de datos, reporting y automatizacion de procesos.',
      availability:
        'Disponible para BI, dashboards, ETL, reporting, analisis de datos y optimizacion de consultas.',
      floatingNav: [
        { code: 'sql', label: 'select home', target: 'home' },
        { code: 'edu', label: 'education', target: 'education' },
        { code: 'lang', label: 'languages', target: 'languages' },
        { code: 'scan', label: 'projects', target: 'projects' },
        { code: 'pub', label: 'research', target: 'research' },
        { code: 'agg', label: 'experience', target: 'experience' },
        { code: 'open', label: 'contact', target: 'contact' },
      ],
      heroCode: [
        'SELECT profile FROM favio',
        "WHERE focus IN ('BI', 'Data');",
        '-- SQL Server, PostgreSQL, Oracle',
        '-- PowerBI, Looker Studio, reporting',
        '-- ETL, analytics, automation',
      ],
      certificatesTitle: 'Certificaciones orientadas a datos y BI.',
      certificatesText:
        'Formacion en SQL Server, Oracle PL/SQL, PowerBI, Business Analytics, Python aplicado a Data Science y administracion de bases de datos.',
      projectsTitle: 'Casos de BI, datos e ingenieria de datos.',
      languagesTitle: 'Idiomas.',
      languagesText:
        'Espanol, ingles y portugues para lectura tecnica, documentacion, presentaciones y colaboracion.',
      experienceTitle: 'Experiencia en datos.',
      experienceText:
        'He participado en migracion de datos, consultas SQL, dashboards, automatizacion y reporting para apoyar decisiones.',
    },
  } satisfies Record<ProfileMode, ProfileVariant>,
  stats: [
    { value: '6+', label: 'anos de experiencia en desarrollo y datos', tag: 'BOTH' },
    { value: '6+', label: 'aplicativos web implementados o mantenidos', tag: 'SOFTWARE' },
    { value: '2', label: 'articulos de investigacion publicados en IEEE', tag: 'BIGDATA' },
    { value: '10+', label: 'certificaciones y cursos tecnicos', tag: 'BOTH' },
  ] satisfies StatItem[],
  certificates: [
    {
      title: 'Titulo en Ingenieria Informatica',
      issuer: 'Universidad Nacional Federico Villarreal',
      issued: '30/01/2023 - 30/07/2025',
      assetBase: '/assets/certificates/TITULO_GUEVARA_PUENTE_FAVIO_JESUS',
      alt: 'Titulo en Ingenieria Informatica',
      badges: ['REMARKABLE'],
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
    {
      title: 'Diplomado de Postgrado en DATA SCIENCE',
      issuer: 'Universidad Nacional de Ingeniería',
      issued: '15/08/2024 - 20/08/2025',
      assetBase: '/assets/certificates/diplomado-uni-ds',
      alt: 'Diplomado de Postgrado en DATA SCIENCE',
      badges: ['REMARKABLE'],
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
     {
      title: 'NET 9 Microservicios',
      issuer: 'Udemy',
      issued: '01/02/2026 - 28/04/2026',
      assetBase: '/assets/certificates/NET9_MICROSERVICIOS',
      alt: 'Certificado Net 9 - Microservicios',
      linkLabel: 'Ver certificado',
      tag: 'SOFTWARE',
    },
    {
      title: 'Angular 21',
      issuer: 'Udemy',
      issued: '15/02/2026 - 29/04/2026',
      assetBase: '/assets/certificates/angular-21-fjgp',
      alt: 'Certificado Angular 21',
      linkLabel: 'Ver certificado',
      tag: 'SOFTWARE',
    },
    {
      title: 'Administrador de Base de Datos SQL Server',
      issuer: 'Universidad Nacional de Ingenieria',
      issued: '01/05/2021 - 01/12/2021',
      assetBase: '/assets/certificates/Certificado-SQL_ADMINISTRATOR',
      alt: 'Certificado de administrador de base de datos SQL Server',
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
    {
      title: 'Programador Excel VBA',
      issuer: 'Universidad Nacional de Ingenieria',
      issued: '01/05/2018 - 01/09/2018',
      assetBase: '/assets/certificates/CEPS_UNI-PROGRAMADOR_EXCEL_VBA-GUEVARA_PUENTE',
      alt: 'Certificado de programador Excel VBA',
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
    {
      title: 'Oracle 12C: PL/SQL Developer',
      issuer: 'Instituto de Educacion Superior Cibertec',
      issued: '15/05/2021 - 21/09/2021',
      assetBase: '/assets/certificates/CERTIFICADO_202102-ORACLE_12C_PL_SQL',
      alt: 'Certificado Oracle 12C PL SQL Developer',
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
    {
      title: 'Data Science',
      issuer: 'CoderHouse',
      issued: '01/04/2022 - 20/08/2022',
      assetBase: '/assets/certificates/CERTIFICADO_DATA_SCIENCE_CODERHOUSE_GUEVARA_PUENTE',
      alt: 'Certificado Data Science',
      linkLabel: 'Ver certificado',
      tag: 'BIGDATA',
    },
    {
      title: 'Data Studio',
      issuer: 'CoderHouse',
      issued: '15/01/2022 - 13/06/2022',
      assetBase: '/assets/certificates/Certificado-DataStudio_Guevara_Puente',
      alt: 'Certificado Data Science',
      linkLabel: 'Ver certificado',
      tag: 'BIGDATA',
    },
    {
      title: 'Especializacion en SQL Server',
      issuer: 'WE Educacion Ejecutiva',
      issued: '01/06/2021 - 20/11/2021',
      assetBase: '/assets/certificates/Certificado_GUEVARA_PUENTE_FAVIO_JESUS_ESPECIALIZACION_EN_SQL_SERVER',
      alt: 'Certificado de especializacion en SQL Server',
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
    {
      title: 'Especializacion en Microsoft Power BI',
      issuer: 'WE Educacion Ejecutiva',
      issued: '01/12/2021 - 18/03/2022',
      assetBase: '/assets/certificates/Certificado_GUEVARA_PUENTE_FAVIO_JESUS_ESPECIALIZACION_EN_POWER_BI',
      alt: 'Certificado de especializacion en Microsoft Power BI',
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
    {
      title: 'PEE Business Analytics',
      issuer: 'WE Educacion Ejecutiva',
      issued: '21/03/2022 - 01/05/2022',
      assetBase: '/assets/certificates/Certificado_GUEVARA_PUENTE_FAVIO_JESUS_BUSINESS_ANALYTICS',
      alt: 'Certificado PEE Business Analytics',
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
    {
      title: 'Python Aplicado a Data Science',
      issuer: 'Pontificia Universidad Catolica del Peru',
      issued: '15/02/2022 - 01/07/2022',
      assetBase: '/assets/certificates/Certificado_Capacitacion_Python_aplicado_a_Data_Science',
      alt: 'Certificado Python aplicado a Data Science',
      linkLabel: 'Ver certificado',
      tag: 'BIGDATA',
    },
    {
      title: 'Business Intelligence with PowerBI',
      issuer: 'SDC Learning',
      issued: '01/11/2022 - 20/01/2023',
      assetBase: '/assets/certificates/PB43_GUEVARA_PUENTE',
      alt: 'Certificado Business Intelligence with PowerBI',
      linkLabel: 'Ver certificado',
      tag: 'BOTH',
    },
    {
      title: 'PYTHON DATA ANALYTICS',
      issuer: 'WE Educacion Ejecutiva',
      issued: '03/03/2022 - 05/06/2022',
      assetBase: '/assets/certificates/PYTHON_DATA_ANALYTICS',
      alt: 'Certificado Python Data Analytics',
      linkLabel: 'Ver certificado',
      tag: 'BIGDATA',
    },
    
    {
      title: 'Arquitectura Basada en Microservicios',
      issuer: 'Software Engineering LATAM',
      issued: '29/10/2022 - 10/12/2022',
      assetBase: '/assets/certificates/MICROSERVICIOS_FJGP',
      alt: 'Certificado de arquitectura basada en microservicios',
      linkLabel: 'Ver certificado',
      tag: 'SOFTWARE',
    },
    {
      title: 'PHP Nivel II - DAO - POO',
      issuer: 'Universidad Nacional de Ingenieria',
      issued: '10/02/2020 - 26/02/2020',
      assetBase: '/assets/certificates/GUEVARA_PUENTE_FAVIO_JESUS_PHP_II',
      alt: 'Certificado PHP Nivel II DAO POO',
      linkLabel: 'Ver certificado',
      tag: 'SOFTWARE',
    },
    {
      title: '.NET 6 & Angular 14',
      issuer: 'Udemy',
      issued: '21/08/2024 - 21/09/2024',
      assetBase: '/assets/certificates/N6_ANGULAR_14_FJGP',
      alt: 'Certificado .NET 6',
      linkLabel: 'Ver certificado',
      tag: 'SOFTWARE',
    },
    {
      title: 'Angular 14 Experto',
      issuer: 'Udemy',
      issued: '01/07/2024 - 06/09/2024',
      assetBase: '/assets/certificates/CETRIFICADO_ANGULAR_14',
      alt: 'Certificado Angular Experto',
      linkLabel: 'Ver certificado',
      tag: 'SOFTWARE',
    },
  ] satisfies CertificateItem[],
  education: [
    {
      title: 'Bachiller en Ingenieria Informatica',
      issuer: 'Universidad Nacional Federico Villarreal',
      period: '15/04/2018 - 30/03/2023',
      type: 'Grado academico',
      duration: '5 anos academicos',
      badges: ['REMARKABLE', 'BACHILLER AUTOMATICO'],
      kind: 'range',
      tag: 'BOTH',
    },
    {
      title: 'Ingenieria Informatica',
      issuer: 'Universidad Nacional Federico Villarreal',
      period: '15/04/2018 - 30/03/2023',
      type: 'Carrera universitaria',
      duration: '5 anos academicos',
      badges: ['REMARKABLE'],
      kind: 'range',
      tag: 'BOTH',
    },
    {
      title: 'Maestria en Data Science',
      issuer: 'Formacion de posgrado',
      period: '05/08/2024 - Actualidad',
      type: 'Maestria',
      duration: 'En curso',
      badges: ['EN CURSO','REMARKABLE'],
      kind: 'range',
      tag: 'BOTH',
    },
  ] satisfies EducationItem[],
  languages: [
   
    {
      name: 'Ingles',
      level: 'Avanzado - B2',
      context:
        'Cambridge Assessment English, lectura tecnica, documentacion y colaboracion profesional.',
      certificates: [
        {
          title: 'Cambridge English Level 1 Certificate in ESOL International',
          issuer: 'Cambridge University',
          issued: '01/01/2019 - 01/06/2019',
          assetBase: '/assets/languages/CAMBRIDGE_CERTIFICATE_GUEVARA_PUENTE',
          alt: 'Certificado Cambridge English Level 1 Certificate in ESOL International',
          linkLabel: 'Descargar certificado',
        },
      ],
    },
    {
      name: 'Portugues',
      level: 'Avanzado',
      context: 'Formacion en UNMSM y uso profesional para lectura y comunicacion.',
      certificates: [
        {
          title: 'Portugues Avanzado',
          issuer: 'Universidad Nacional Mayor de San Marcos',
          issued: '18/10/2023 - 19/01/2024',
          assetBase: '/assets/languages/CERTIFICADO-UNMSM-IDIOMA-PORTUGUES',
          alt: 'Certificado de portugues avanzado',
          linkLabel: 'Descargar certificado',
        },
      ],
    },
  ] satisfies LanguageItem[],
  projects: [
    {
      title: 'SISECON - Seguimiento de Condecoraciones',
      category: 'Web',
      year: '2023 - Actualidad',
      summary:
        'Aplicativo web institucional para seguimiento de condecoraciones, con interfaz en Angular, integracion de APIs, logica backend y consultas sobre SQL Server.',
      stack: ['Angular', 'TypeScript', '.NET', 'C#', 'SQL Server'],
      linkLabel: 'Ver experiencia',
      link: '#experience',
      image: {
        src: '/assets/projects/SISECON.png',
        alt: 'Preview de SISECON seguimiento de condecoraciones',
      },
      tag: 'SOFTWARE',
    },
    {
      title: 'SINVINF - Inventario de Recursos Informaticos',
      category: 'Web',
      year: '2023 - Actualidad',
      summary:
        'Aplicativo web para gestion e inventario de recursos informaticos, orientado a consulta, registro, seguimiento y mantenimiento de informacion institucional.',
      stack: ['Angular', 'TypeScript', '.NET', 'C#', 'SQL Server'],
      linkLabel: 'Ver experiencia',
      link: '#experience',
      image: {
        src: '/assets/projects/SINVINF.png',
        alt: 'Preview de SINVINF inventario de recursos informaticos',
      },
      tag: 'SOFTWARE',
    },
    {
      title: 'SIMSIC - Seguimiento de Informes de Control',
      category: 'Web',
      year: '2023 - Actualidad',
      summary:
        'Aplicativo web para seguimiento de informes de control, con funcionalidades de consulta, trazabilidad, integracion de servicios y gestion de datos.',
      stack: ['Angular', 'TypeScript', '.NET', 'C#', 'SQL Server', 'PowerBI'],
      linkLabel: 'Ver experiencia',
      link: '#experience',
      image: {
        src: '/assets/projects/SIMSIC.png',
        alt: 'Preview de SIMSIC seguimiento de informes de control',
      },
      tag: 'SOFTWARE',
    },
    {
      title: 'Sistema web para Ministerio de Vivienda',
      category: 'Web',
      year: '2019 - 2023',
      summary:
        'Aplicativo web empresarial desarrollado con Angular, Spring Boot y PostgreSQL, incluyendo frontend integral, APIs, reglas de negocio y documentacion tecnica.',
      stack: ['Angular', 'Spring Boot', 'Java', 'PostgreSQL', 'AWS', 'SCRUM'],
      linkLabel: 'Ver experiencia',
      link: '#experience',
      image: {
        src: '/assets/projects/Logo-1-MVCS.png',
        alt: 'Preview del sistema web para Ministerio de Vivienda',
      },
      tag: 'SOFTWARE',
    },
    {
      title: 'Dashboards y reporting para gestion institucional',
      category: 'Data',
      year: '2019 - Actualidad',
      summary:
        'Analisis, modelado y visualizacion de datos con PowerBI y Looker Studio para seguimiento de informacion, reporting y toma de decisiones.',
      stack: ['PowerBI', 'Looker Studio', 'SQL Server', 'PostgreSQL', 'Excel'],
      linkLabel: 'Ver experiencia',
      link: '#experience',
      image: {
        src: '/assets/projects/PCM-PCM.png',
        alt: 'Preview de dashboards y reporting para gestion institucional',
      },
      tag: 'BIGDATA',
    },
    {
      title: 'Migracion y automatizacion de datos en SQL Server',
      category: 'Data',
      year: '2023 - Actualidad',
      summary:
        'Construccion de vistas, stored procedures y procesos de migracion de datos para consolidar informacion y automatizar operaciones.',
      stack: ['SQL Server', 'Stored Procedures', 'Vistas SQL', 'PowerBI', 'Excel'],
      linkLabel: 'Ver experiencia',
      link: '#experience',
      image: {
        src: '/assets/projects/PCM-PCM.png',
        alt: 'Preview de migracion y automatizacion de datos en SQL Server',
      },
      tag: 'BIGDATA',
    },
    {
      title: 'KPIs empresariales con SQL experto',
      category: 'Data',
      year: '2024 - 2025',
      summary:
        'Construccion de queries avanzadas para extraer KPIs desde informacion de distintas empresas, optimizando consultas y transformando datos en indicadores accionables.',
      stack: ['SQL', 'KPIs', 'Data Analysis', 'Reporting', 'Business Intelligence'],
      linkLabel: 'Ver experiencia',
      link: '#experience',
      image: {
        src: '/assets/logos/SCANNTECH.png',
        alt: 'Preview de KPIs empresariales con SQL experto',
      },
      tag: 'BIGDATA',
    },
    {
      title: 'Ingesta y transformacion macro de datos',
      category: 'Data',
      year: '2025 - Actualidad',
      summary:
        'Procesos de ingesta y transformacion de datos a gran escala usando Spark, Python y ecosistema Hadoop para flujos distribuidos de procesamiento.',
      stack: ['Spark', 'Python', 'HDFS', 'Azkaban', 'YARN', 'Big Data'],
      linkLabel: 'Ver experiencia',
      link: '#experience',
      image: {
        src: '/assets/logos/SCANNTECH.png',
        alt: 'Preview de ingesta y transformacion macro de datos',
      },
      tag: 'BIGDATA',
    },
  ] satisfies ProjectItem[],
  research: [
    {
      title: 'Business Intelligence Architecture to Improve Decision Making',
      year: '2022',
      summary:
        'Articulo de investigacion publicado en IEEE que propone una arquitectura de inteligencia empresarial para gestionar grandes volumenes de datos en entidades publicas y mejorar la toma de decisiones.',
      stack: ['Business Intelligence', 'Scrum', 'Analisis de datos', 'Arquitectura BI'],
      linkLabel: 'Ver articulo',
      link: 'https://ieeexplore.ieee.org/document/10008297/authors#authors',
      image: {
        src: '/assets/projects/business_intelligence.png',
        alt: 'Preview del articulo sobre arquitectura de business intelligence',
      },
      tag: 'BOTH',
    },
    {
      title: 'Comparison of DEMUCS Neural Network on Different Platforms',
      year: '2022',
      summary:
        'Articulo de investigacion publicado en IEEE que compara el uso de la red neuronal DEMUCS en plataformas web, escritorio y movil para separar fuentes musicales y evaluar tiempos de ejecucion.',
      stack: ['Machine Learning', 'DEMUCS', 'Redes neuronales', 'Web', 'Mobile'],
      linkLabel: 'Ver articulo',
      link: 'https://ieeexplore.ieee.org/document/10008289',
      image: {
        src: '/assets/projects/comparission_demucs.png',
        alt: 'Preview del articulo sobre red neuronal DEMUCS',
      },
      tag: 'BOTH',
    },
  ] satisfies ResearchItem[],
  experience: [
    {
      id: 'scanntech-bigdata-engineer-2025',
      role: 'Big Data Engineer',
      company: 'Scanntech',
      logo: {
        src: '/assets/logos/SCANNTECH.png',
        alt: 'Logo de Scanntech',
      },
      period: '04/2025 - Actualidad',
      location: 'Lima, Peru',
      websiteLabel: 'scanntech.com',
      website: 'https://www.scanntech.com/',
      summary:
        'Ingenieria Big Data enfocada en procesos de ingesta y transformacion de informacion a nivel macro dentro de ecosistemas distribuidos.',
      achievements: [
        'Desarrollo procesos de ingesta de datos para flujos de informacion de gran escala.',
        'Implemento transformaciones con Spark y Python para preparar datos analiticos.',
        'Trabajo con HDFS, Azkaban y YARN para ejecucion, orquestacion y procesamiento distribuido.',
        'Apoyo la estabilidad y trazabilidad de procesos de datos para consumo analitico.',
      ],
      stack: ['Spark', 'Python', 'HDFS', 'Azkaban', 'YARN', 'Big Data'],
      tag: 'BIGDATA',
    },
    {
      id: 'scanntech-sql-expert-2024',
      role: 'Experto SQL',
      company: 'Scanntech',
      logo: {
        src: '/assets/logos/SCANNTECH.png',
        alt: 'Logo de Scanntech',
      },
      period: '04/2024 - 04/2025',
      location: 'Lima, Peru',
      websiteLabel: 'scanntech.com',
      website: 'https://www.scanntech.com/',
      summary:
        'Rol especializado en construccion de consultas SQL avanzadas para extraer KPIs de distintas empresas y convertir informacion operacional en indicadores de negocio.',
      achievements: [
        'Desarrolle queries avanzadas para extraccion y analisis de KPIs empresariales.',
        'Optimice consultas orientadas a reporting, analisis y seguimiento de negocio.',
        'Integre informacion de multiples empresas para generar indicadores comparables.',
        'Apoye requerimientos analiticos con criterio de calidad, consistencia y performance.',
      ],
      stack: ['SQL', 'KPIs', 'Business Intelligence', 'Reporting', 'Data Analysis'],
      tag: 'BIGDATA',
    },
    {
      id: 'pcm-fullstack-2023',
      role: 'Desarrollador Full Stack',
      company: 'PCM - Presidencia del Consejo de Ministros',
      logo: {
        src: '/assets/logos/PCM.jpg',
        alt: 'Logo de la Presidencia del Consejo de Ministros',
      },
      period: '11/2023 - Actualidad',
      location: 'Lima, Peru',
      websiteLabel: 'gob.pe/pcm',
      website: 'https://www.gob.pe/pcm',
      summary:
        'Desarrollo full stack enfocado en aplicativos web institucionales como SISECON, SINVINF y SIMSIC, integrando frontend Angular, backend .NET, APIs, SQL Server, migracion de datos y dashboards con PowerBI.',
      achievements: [
        'Implemente exitosamente SISECON para seguimiento de condecoraciones.',
        'Implemente exitosamente SINVINF para inventario de recursos informaticos.',
        'Implemente exitosamente SIMSIC para seguimiento de informes de control.',
        'Desarrolle interfaces responsivas usando Angular, HTML, CSS y TypeScript.',
        'Implemente APIs y logica de negocio en .NET para consumo desde el frontend.',
        'Desarrolle vistas, stored procedures y procesos de migracion de datos en SQL Server.',
        'Integre dashboards de PowerBI para visualizacion y seguimiento de informacion.',
      ],
      stack: ['SQL Server', 'PowerBI', 'Angular', 'TypeScript', 'C#', '.NET', 'Git'],
      tag: 'SOFTWARE',
    },
    {
      id: 'amd-fullstack-bi-2019',
      role: 'Desarrollador Full Stack & Analista BI',
      company: 'AMD Consultores SAC',
      logo: {
        src: '/assets/logos/AMD.png',
        alt: 'Logo de AMD Consultores SAC',
      },
      period: '04/2019 - 09/2023',
      location: 'Lima, Peru',
      websiteLabel: 'Proyecto consultoria',
      website: '#contact',
      summary:
        'Desarrollo full stack y analisis BI con responsabilidades en frontend, backend, base de datos, analisis de datos, administracion AWS, documentacion tecnica y soporte a requerimientos bajo SCRUM.',
      achievements: [
        'Implemente exitosamente un aplicativo web para el Ministerio de Vivienda, Construccion y Saneamiento.',
        'Desarrolle el frontend integral de la aplicacion usando Angular y TypeScript.',
        'Implemente APIs y logica de negocio con Java Spring Boot.',
        'Disene la base de datos del negocio usando PostgreSQL.',
        'Implemente triggers y stored procedures para automatizar procesos de negocio.',
        'Desarrolle analisis de datos y visualizaciones con PowerBI y Looker Studio.',
        'Administre infraestructura en AWS y elabore documentacion tecnica del sistema.',
      ],
      stack: [
        'AWS',
        'Angular',
        'TypeScript',
        'PostgreSQL',
        'Spring Boot',
        'Java',
        'PowerBI',
        'Looker Studio',
      ],
      tag: 'SOFTWARE',
    },
    {
      id: 'mvcs-backend-db-2021',
      role: 'Practicante Pre Profesional - Backend y Base de Datos',
      company: 'Ministerio de Vivienda, Construccion y Saneamiento',
      logo: {
        src: '/assets/logos/MVCS.jpg',
        alt: 'Logo del Ministerio de Vivienda, Construccion y Saneamiento',
      },
      period: '08/2021 - 02/2022',
      location: 'Lima, Peru',
      websiteLabel: 'gob.pe/vivienda',
      website: 'https://www.gob.pe/vivienda',
      summary:
        'Practicas pre profesionales enfocadas en desarrollo backend con Java Spring Boot, diseno y administracion de PostgreSQL, automatizacion con triggers y soporte a infraestructura AWS.',
      achievements: [
        'Implemente triggers para automatizar procesos y reducir tiempos en calculos relacionados con tratamiento de aguas residuales.',
        'Desarrolle APIs y logica de negocio con Java Spring Boot.',
        'Disene estructuras de base de datos en PostgreSQL.',
        'Administre roles, permisos e indices de base de datos.',
        'Brinde soporte a la administracion del servidor AWS.',
      ],
      stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Postman', 'Git', 'AWS', 'Triggers'],
      tag: 'SOFTWARE',
    },
  ] satisfies ExperienceItem[],
  contact: {
    headline: 'Conversemos sobre tu proximo proyecto',
    text:
      'Puedo ayudarte a construir aplicaciones web, integrar APIs, ordenar datos o convertir informacion en dashboards utiles para el equipo.',
    links: [
      { label: 'Email', href: 'mailto:faviogpfk@gmail.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/faviojguevara/' }
    
    ],
  },
} as const;
