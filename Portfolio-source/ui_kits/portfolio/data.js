/* ============================================================
   PORTFOLIO CONTENT — Favio Jesús Guevara Puente (real data)
   Bilingual (ES / EN). Exposed as window.PORTFOLIO_DATA.
   Images & certificate links point at favioguevara.com assets.
   ============================================================ */
const A = "https://favioguevara.com/assets";

window.PORTFOLIO_DATA = {
  meta: {
    name: "Favio Guevara",
    fullName: "Favio Jesús Guevara Puente",
    initials: "FG",
    photo: "",
    cover: "assets/cover-databanner.png",
    logo: A + "/logos/logofavioblanco.png",
  },

  es: {
    nav: { about: "Inicio", education: "Educación", languages: "Idiomas", work: "Proyectos", research: "Investigación", experience: "Experiencia", contact: "Contacto" },
    cvLabel: "Contáctame",
    cvHref: "#contact",
    coverTag: "// software · big data",
    coverHint: "Arrastra tu imagen de portada",
    hero: {
      eyebrow: "Ingeniero Informático · Desarrollador Full Stack",
      lead: "Construyo",
      titleA: "aplicaciones web,",
      titleB: "APIs y soluciones",
      titleC: "empresariales.",
      desc: "Desarrollador especializado en aplicaciones web, APIs, bases de datos y soluciones empresariales con Angular, .NET, Spring Boot, SQL Server, PostgreSQL y Oracle.",
      location: "Lima, Perú · Disponible para proyectos",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Contacto",
      stats: [
        { n: "6+", label: "años en desarrollo y datos" },
        { n: "6+", label: "aplicativos web implementados" },
        { n: "10+", label: "certificaciones y cursos técnicos" },
      ],
    },
    about: {
      eyebrow: "Perfil",
      title: "Sobre mí",
      paragraphs: [
        "Soy Ingeniero Informático y desarrollador full stack. Construyo y mantengo aplicaciones web institucionales, APIs e integraciones, trabajando el frontend con Angular y el backend con .NET y Spring Boot.",
        "En paralelo me especializo en datos: modelado de bases de datos, procesos de migración, consultas y visualización con PowerBI. Curso una maestría en Data Science para llevar grandes volúmenes de datos a decisiones útiles.",
      ],
      facts: [
        { k: "Rol", v: "Full Stack · BI" },
        { k: "Frontend", v: "Angular · TypeScript" },
        { k: "Backend", v: ".NET · Spring Boot" },
        { k: "Datos", v: "SQL Server · PostgreSQL · PowerBI" },
      ],
    },
    education: {
      eyebrow: "Educación",
      title: "Educación y certificaciones.",
      lead: "Una línea de tiempo de mi formación y certificaciones técnicas.",
      items: [
        { period: "2024 — Actualidad", current: true, title: "Maestría en Data Science", place: "Formación de posgrado", desc: "Especialización en ciencia de datos, modelos y arquitecturas para grandes volúmenes de información.", meta: ["En curso"] },
        { period: "2023 — 2025", title: "Título en Ingeniería Informática", place: "Universidad Nacional Federico Villarreal", desc: "Título profesional de Ingeniería Informática.", meta: ["Titulado"] },
        { period: "2018 — 2023", title: "Bachiller en Ingeniería Informática", place: "Universidad Nacional Federico Villarreal", desc: "Carrera universitaria de Ingeniería Informática.", meta: ["Bachiller"] },
        { period: "2026", title: "Angular 21", place: "Udemy", desc: "Certificación en desarrollo frontend con Angular.", meta: ["Certificación"] },
      ],
    },
    languages: {
      eyebrow: "Idiomas",
      title: "Idiomas.",
      lead: "Español, inglés y portugués para documentación técnica, reuniones y trabajo con equipos diversos.",
      items: [
        { language: "Español", level: "Lengua nativa", code: "Nativo", prof: 5, img: "", href: "" },
        { language: "Inglés", level: "Cambridge English · ESOL International", code: "B2", prof: 4, img: A + "/languages/CAMBRIDGE_CERTIFICATE_GUEVARA_PUENTE.png", href: A + "/languages/CAMBRIDGE_CERTIFICATE_GUEVARA_PUENTE.pdf" },
        { language: "Portugués", level: "Portugués Avanzado · UNMSM", code: "Avanzado", prof: 4, img: A + "/languages/CERTIFICADO-UNMSM-IDIOMA-PORTUGUES.png", href: A + "/languages/CERTIFICADO-UNMSM-IDIOMA-PORTUGUES.pdf" },
      ],
      download: "Descargar certificado",
    },
    work: {
      eyebrow: "Proyectos",
      title: "Aplicaciones, APIs y soluciones web.",
      lead: "Aplicativos web institucionales y empresariales que he desarrollado y mantenido.",
      items: [
        { category: "Web", year: "2023 — Actualidad", title: "SISECON — Seguimiento de Condecoraciones", desc: "Aplicativo web institucional para seguimiento de condecoraciones, con interfaz en Angular, integración de APIs, lógica backend y consultas sobre SQL Server.", tags: ["Angular", "TypeScript", ".NET", "C#", "SQL Server"], img: A + "/projects/SISECON.png", href: "#experience" },
        { category: "Web", year: "2023 — Actualidad", title: "SINVINF — Inventario de Recursos Informáticos", desc: "Aplicativo web para gestión e inventario de recursos informáticos: consulta, registro, seguimiento y mantenimiento de información institucional.", tags: ["Angular", "TypeScript", ".NET", "C#", "SQL Server"], img: A + "/projects/SINVINF.png", href: "#experience" },
        { category: "Web", year: "2023 — Actualidad", title: "SIMSIC — Seguimiento de Informes de Control", desc: "Aplicativo web para seguimiento de informes de control, con consulta, trazabilidad, integración de servicios y gestión de datos.", tags: ["Angular", "TypeScript", ".NET", "C#", "SQL Server", "PowerBI"], img: A + "/projects/SIMSIC.png", href: "#experience" },
        { category: "Web", year: "2019 — 2023", title: "Sistema web para Ministerio de Vivienda", desc: "Aplicativo web empresarial con Angular, Spring Boot y PostgreSQL: frontend integral, APIs, reglas de negocio y documentación técnica.", tags: ["Angular", "Spring Boot", "Java", "PostgreSQL", "AWS", "SCRUM"], img: A + "/projects/Logo-1-MVCS.png", href: "#experience" },
      ],
    },
    research: {
      eyebrow: "Investigación",
      title: "Investigación y publicaciones.",
      lead: "Artículos de investigación publicados en IEEE.",
      items: [
        { category: "IEEE", year: "2022", title: "Business Intelligence Architecture to Improve Decision Making", desc: "Artículo que propone una arquitectura de inteligencia empresarial para gestionar grandes volúmenes de datos en entidades públicas y mejorar la toma de decisiones.", tags: ["Business Intelligence", "Scrum", "Análisis de datos", "Arquitectura BI"], img: A + "/projects/business_intelligence.png", href: "https://ieeexplore.ieee.org/document/10008297/authors#authors", cta: "Ver artículo" },
        { category: "IEEE", year: "2022", title: "Comparison of DEMUCS Neural Network on Different Platforms", desc: "Artículo que compara el uso de la red neuronal DEMUCS en plataformas web, escritorio y móvil para separar fuentes musicales y evaluar tiempos de ejecución.", tags: ["Machine Learning", "DEMUCS", "Redes neuronales", "Web", "Mobile"], img: A + "/projects/comparission_demucs.png", href: "https://ieeexplore.ieee.org/document/10008289", cta: "Ver artículo" },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Experiencia en software.",
      lead: "He construido y mantenido aplicaciones web, APIs, integraciones y bases de datos en entornos reales.",
      items: [
        { period: "11/2023 — Actualidad", current: true, title: "Desarrollador Full Stack", place: "PCM — Presidencia del Consejo de Ministros", desc: "Desarrollo full stack de aplicativos web institucionales (SISECON, SINVINF, SIMSIC): frontend Angular, backend .NET, APIs, SQL Server, migración de datos y dashboards con PowerBI.", meta: ["Angular", ".NET", "SQL Server", "PowerBI", "Git"] },
        { period: "04/2019 — 09/2023", title: "Desarrollador Full Stack & Analista BI", place: "AMD Consultores SAC", desc: "Desarrollo de soluciones web empresariales y análisis de inteligencia de negocios.", meta: ["Angular", "Spring Boot", "PostgreSQL", "BI"] },
        { period: "08/2021 — 02/2022", title: "Practicante Pre Profesional — Backend y Base de Datos", place: "Ministerio de Vivienda, Construcción y Saneamiento", desc: "Apoyo en desarrollo backend y gestión de bases de datos.", meta: ["Backend", "Bases de datos"] },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Conversemos sobre tu próximo proyecto",
      lead: "Puedo ayudarte a construir aplicaciones web, integrar APIs, ordenar datos o convertir información en dashboards útiles para el equipo.",
      rows: [
        { label: "Email", value: "faviogpfk@gmail.com", href: "mailto:faviogpfk@gmail.com", external: false },
        { label: "LinkedIn", value: "/in/faviojguevara", href: "https://www.linkedin.com/in/faviojguevara/", external: true },
        { label: "Ubicación", value: "Lima, Perú", href: "#", external: false },
      ],
      footer: "Todos los derechos reservados.",
    },
  },

  en: {
    nav: { about: "Home", education: "Education", languages: "Languages", work: "Projects", research: "Research", experience: "Experience", contact: "Contact" },
    cvLabel: "Contact me",
    cvHref: "#contact",
    coverTag: "// software · big data",
    coverHint: "Drop your cover image",
    hero: {
      eyebrow: "Computer Engineer · Full Stack Developer",
      lead: "I build",
      titleA: "web applications,",
      titleB: "APIs and enterprise",
      titleC: "solutions.",
      desc: "Developer specialized in web applications, APIs, databases and enterprise solutions with Angular, .NET, Spring Boot, SQL Server, PostgreSQL and Oracle.",
      location: "Lima, Peru · Available for projects",
      ctaPrimary: "View projects",
      ctaSecondary: "Get in touch",
      stats: [
        { n: "6+", label: "years in development & data" },
        { n: "6+", label: "web applications shipped" },
        { n: "10+", label: "certifications & technical courses" },
      ],
    },
    about: {
      eyebrow: "Profile",
      title: "About me",
      paragraphs: [
        "I'm a Computer Engineer and full stack developer. I build and maintain institutional web applications, APIs and integrations — frontend with Angular, backend with .NET and Spring Boot.",
        "In parallel I specialize in data: database modeling, migration processes, queries and visualization with PowerBI. I'm pursuing a master's in Data Science to turn large volumes of data into useful decisions.",
      ],
      facts: [
        { k: "Role", v: "Full Stack · BI" },
        { k: "Frontend", v: "Angular · TypeScript" },
        { k: "Backend", v: ".NET · Spring Boot" },
        { k: "Data", v: "SQL Server · PostgreSQL · PowerBI" },
      ],
    },
    education: {
      eyebrow: "Education",
      title: "Education & certifications.",
      lead: "A timeline of my studies and technical certifications.",
      items: [
        { period: "2024 — Present", current: true, title: "Master's in Data Science", place: "Postgraduate studies", desc: "Specialization in data science, models and architectures for large volumes of information.", meta: ["In progress"] },
        { period: "2023 — 2025", title: "Degree in Computer Engineering", place: "Universidad Nacional Federico Villarreal", desc: "Professional degree in Computer Engineering.", meta: ["Graduated"] },
        { period: "2018 — 2023", title: "Bachelor in Computer Engineering", place: "Universidad Nacional Federico Villarreal", desc: "University program in Computer Engineering.", meta: ["Bachelor"] },
        { period: "2026", title: "Angular 21", place: "Udemy", desc: "Frontend development certification with Angular.", meta: ["Certification"] },
      ],
    },
    languages: {
      eyebrow: "Languages",
      title: "Languages.",
      lead: "Spanish, English and Portuguese for technical documentation, meetings and work with diverse teams.",
      items: [
        { language: "Spanish", level: "Native language", code: "Native", prof: 5, img: "", href: "" },
        { language: "English", level: "Cambridge English · ESOL International", code: "B2", prof: 4, img: A + "/languages/CAMBRIDGE_CERTIFICATE_GUEVARA_PUENTE.png", href: A + "/languages/CAMBRIDGE_CERTIFICATE_GUEVARA_PUENTE.pdf" },
        { language: "Portuguese", level: "Advanced Portuguese · UNMSM", code: "Advanced", prof: 4, img: A + "/languages/CERTIFICADO-UNMSM-IDIOMA-PORTUGUES.png", href: A + "/languages/CERTIFICADO-UNMSM-IDIOMA-PORTUGUES.pdf" },
      ],
      download: "Download certificate",
    },
    work: {
      eyebrow: "Projects",
      title: "Applications, APIs and web solutions.",
      lead: "Institutional and enterprise web applications I've built and maintained.",
      items: [
        { category: "Web", year: "2023 — Present", title: "SISECON — Decorations Tracking", desc: "Institutional web app to track decorations, with an Angular interface, API integration, backend logic and SQL Server queries.", tags: ["Angular", "TypeScript", ".NET", "C#", "SQL Server"], img: A + "/projects/SISECON.png", href: "#experience" },
        { category: "Web", year: "2023 — Present", title: "SINVINF — IT Resource Inventory", desc: "Web app to manage and inventory IT resources: query, registration, tracking and maintenance of institutional information.", tags: ["Angular", "TypeScript", ".NET", "C#", "SQL Server"], img: A + "/projects/SINVINF.png", href: "#experience" },
        { category: "Web", year: "2023 — Present", title: "SIMSIC — Control Reports Tracking", desc: "Web app to track control reports, with query, traceability, service integration and data management.", tags: ["Angular", "TypeScript", ".NET", "C#", "SQL Server", "PowerBI"], img: A + "/projects/SIMSIC.png", href: "#experience" },
        { category: "Web", year: "2019 — 2023", title: "Web system for the Ministry of Housing", desc: "Enterprise web app with Angular, Spring Boot and PostgreSQL: full frontend, APIs, business rules and technical documentation.", tags: ["Angular", "Spring Boot", "Java", "PostgreSQL", "AWS", "SCRUM"], img: A + "/projects/Logo-1-MVCS.png", href: "#experience" },
      ],
    },
    research: {
      eyebrow: "Research",
      title: "Research and publications.",
      lead: "Research articles published in IEEE.",
      items: [
        { category: "IEEE", year: "2022", title: "Business Intelligence Architecture to Improve Decision Making", desc: "An article proposing a business intelligence architecture to manage large volumes of data in public entities and improve decision-making.", tags: ["Business Intelligence", "Scrum", "Data analysis", "BI architecture"], img: A + "/projects/business_intelligence.png", href: "https://ieeexplore.ieee.org/document/10008297/authors#authors", cta: "View article" },
        { category: "IEEE", year: "2022", title: "Comparison of DEMUCS Neural Network on Different Platforms", desc: "An article comparing the DEMUCS neural network across web, desktop and mobile platforms to separate musical sources and evaluate execution times.", tags: ["Machine Learning", "DEMUCS", "Neural networks", "Web", "Mobile"], img: A + "/projects/comparission_demucs.png", href: "https://ieeexplore.ieee.org/document/10008289", cta: "View article" },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Software experience.",
      lead: "I've built and maintained web applications, APIs, integrations and databases in real environments.",
      items: [
        { period: "11/2023 — Present", current: true, title: "Full Stack Developer", place: "PCM — Presidency of the Council of Ministers", desc: "Full stack development of institutional web apps (SISECON, SINVINF, SIMSIC): Angular frontend, .NET backend, APIs, SQL Server, data migration and PowerBI dashboards.", meta: ["Angular", ".NET", "SQL Server", "PowerBI", "Git"] },
        { period: "04/2019 — 09/2023", title: "Full Stack Developer & BI Analyst", place: "AMD Consultores SAC", desc: "Development of enterprise web solutions and business intelligence analysis.", meta: ["Angular", "Spring Boot", "PostgreSQL", "BI"] },
        { period: "08/2021 — 02/2022", title: "Pre-Professional Intern — Backend & Database", place: "Ministry of Housing, Construction and Sanitation", desc: "Support in backend development and database management.", meta: ["Backend", "Databases"] },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your next project",
      lead: "I can help you build web applications, integrate APIs, organize data or turn information into useful dashboards for your team.",
      rows: [
        { label: "Email", value: "faviogpfk@gmail.com", href: "mailto:faviogpfk@gmail.com", external: false },
        { label: "LinkedIn", value: "/in/faviojguevara", href: "https://www.linkedin.com/in/faviojguevara/", external: true },
        { label: "Location", value: "Lima, Peru", href: "#", external: false },
      ],
      footer: "All rights reserved.",
    },
  },
};

/* ---- Technologies carousel (language-neutral icons from Devicon CDN) ---- */
const ICON = (p) => "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/" + p;
window.PORTFOLIO_TECHS = [
  { name: "TypeScript", icon: ICON("typescript/typescript-original.svg") },
  { name: "JavaScript", icon: ICON("javascript/javascript-original.svg") },
  { name: "C#", icon: ICON("csharp/csharp-original.svg") },
  { name: ".NET", icon: ICON("dot-net/dot-net-original.svg") },
  { name: "Python", icon: ICON("python/python-original.svg") },
  { name: "Angular", icon: ICON("angular/angular-original.svg") },
  { name: "Java", icon: ICON("java/java-original.svg") },
  { name: "Spring Boot", icon: ICON("spring/spring-original.svg") },
  { name: "Apache Spark", icon: ICON("apachespark/apachespark-original.svg") },
  { name: "Hadoop", icon: ICON("hadoop/hadoop-original.svg") },
  { name: "PostgreSQL", icon: ICON("postgresql/postgresql-original.svg") },
  { name: "SQL Server", icon: ICON("microsoftsqlserver/microsoftsqlserver-plain.svg") },
  { name: "Oracle", icon: ICON("oracle/oracle-original.svg") },
  { name: "AWS", icon: ICON("amazonwebservices/amazonwebservices-original-wordmark.svg") },
  { name: "Git", icon: ICON("git/git-original.svg") },
  { name: "Docker", icon: ICON("docker/docker-original.svg") },
];
window.PORTFOLIO_TECH_TEXT = {
  es: { eyebrow: "Stack", title: "Tecnologías que manejo", lead: "Del frontend al procesamiento de datos a gran escala." },
  en: { eyebrow: "Stack", title: "Technologies I work with", lead: "From the frontend to large-scale data processing." },
};
