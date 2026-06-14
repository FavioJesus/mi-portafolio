/* Portfolio sections — composed from window primitives. Assigned to window. */

const SectionWrap = ({ id, children, alt = false, style }) => (
  <section id={id} style={{ background: alt ? "var(--surface-raised)" : "var(--surface)", borderTop: "1px solid var(--border)", ...style }}>
    <div className="ds-container" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
      {children}
    </div>
  </section>
);

/* ---------------- THEME TOGGLE (sun / moon) ---------------- */
function ThemeToggle({ theme, setTheme, lang }) {
  const dark = theme === "dark";
  const label = dark ? (lang === "es" ? "Modo claro" : "Light mode") : (lang === "es" ? "Modo oscuro" : "Dark mode");
  const [hov, setHov] = React.useState(false);
  return (
    <button onClick={() => setTheme(dark ? "light" : "dark")} aria-label={label} title={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, flexShrink: 0, border: "1px solid " + (hov ? "var(--border-strong)" : "var(--border)"), borderRadius: "var(--radius-sm)", background: "transparent", color: hov ? "var(--text-strong)" : "var(--text-muted)", cursor: "pointer", transition: "color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)" }}>
      {dark ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <line x1="12" y1="2.5" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="21.5" />
          <line x1="2.5" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="21.5" y2="12" />
          <line x1="5.2" y1="5.2" x2="6.9" y2="6.9" /><line x1="17.1" y1="17.1" x2="18.8" y2="18.8" />
          <line x1="18.8" y1="5.2" x2="17.1" y2="6.9" /><line x1="6.9" y1="17.1" x2="5.2" y2="18.8" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ t, lang, setLang, data, theme, setTheme }) {
  const links = [
    ["education", t.nav.education], ["languages", t.nav.languages],
    ["work", t.nav.work], ["research", t.nav.research],
    ["experience", t.nav.experience], ["contact", t.nav.contact],
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "color-mix(in srgb, var(--surface) 86%, transparent)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
      <div className="ds-container" style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-5)" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <span style={{ width: 30, height: 30, borderRadius: "var(--radius-sm)", background: "var(--ink-950)", color: "#fff", display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", overflow: "hidden" }}>{data.meta.logo ? <img src={data.meta.logo} alt={data.meta.name} style={{ width: 20, height: 20, objectFit: "contain" }} /> : data.meta.initials}</span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--text-strong)", letterSpacing: "var(--ls-tight)", whiteSpace: "nowrap" }}>{data.meta.name}</span>
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: "1.4rem" }} className="nav-links">
          {links.map(([id, label]) => (
            <a key={id} href={"#" + id} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-strong)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>{label}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <ThemeToggle theme={theme} setTheme={setTheme} lang={lang} />
          <div style={{ display: "flex", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
            {["es", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{ border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", textTransform: "uppercase", padding: "0.4rem 0.6rem", background: lang === l ? "var(--ink-950)" : "transparent", color: lang === l ? "#fff" : "var(--text-muted)" }}>{l}</button>
            ))}
          </div>
          <div className="nav-cv"><Button href={t.cvHref} variant="dark" size="sm" iconRight={<span>↓</span>}>{t.cvLabel}</Button></div>
        </div>
      </div>
    </header>
  );
}

/* ---------------- DEV CODE WINDOW (visual) ---------------- */
function DevWindow() {
  return (
    <div className="dev-window" aria-hidden="true">
      <div className="dev-bar">
        <span className="dev-dot" /><span className="dev-dot" /><span className="dev-dot" />
        <span className="dev-tab">etl_pipeline.py</span>
        <span className="dev-langtag">PYSPARK</span>
      </div>
      <pre className="dev-code"><span className="c"># ETL · Big Data pipeline</span>{"\n"}<span className="k">from</span> pyspark.sql <span className="k">import</span> functions <span className="k">as</span> F{"\n\n"}df = (spark.read{"\n"}      .<span className="fn">parquet</span>(<span className="s">"s3://datalake/eventos/*"</span>)){"\n\n"}top = (df.<span className="fn">groupBy</span>(<span className="s">"entidad"</span>){"\n"}       .<span className="fn">agg</span>(F.<span className="fn">count</span>(<span className="s">"*"</span>).<span className="fn">alias</span>(<span className="s">"n"</span>)){"\n"}       .<span className="fn">orderBy</span>(F.<span className="fn">desc</span>(<span className="s">"n"</span>))){"\n\n"}top.write.<span className="fn">saveAsTable</span>(<span className="s">"bi.ranking"</span>)<span className="dev-caret">▋</span></pre>
      <div className="dev-panel">
        <div className="dev-bars">
          <span style={{ height: "42%" }} /><span style={{ height: "72%" }} /><span style={{ height: "55%" }} /><span style={{ height: "90%" }} /><span style={{ height: "64%" }} /><span style={{ height: "100%" }} /><span style={{ height: "48%" }} />
        </div>
        <span className="dev-status"><i className="dev-pulse" /> 10.4M filas · 6 nodos · 2.3s</span>
      </div>
    </div>
  );
}

/* ---------------- COVER BANNER ---------------- */
function Cover({ data }) {
  return (
    <section className="cover-sec" aria-label="Portada">
      <image-slot id="cover-photo" src={data.meta.cover || undefined} shape="rect" fit="cover"
        placeholder="Arrastra tu imagen de portada"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}></image-slot>
      <span className="cover-tag">// software · big data</span>
    </section>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ t, data, heroLayout, showPhoto }) {
  const h = t.hero;
  const Title = (
    <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-regular)", fontSize: "clamp(2.5rem, 1.5rem + 3.4vw, 4.25rem)", lineHeight: "1.08", letterSpacing: "var(--ls-tight)", color: "var(--text-strong)", margin: 0 }}>
      {h.lead} <span style={{ fontStyle: "italic" }}>{h.titleA}</span><br />{h.titleB} <span style={{ color: "var(--accent)" }}>{h.titleC}</span>
    </h1>
  );
  const Eyebrow = (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--success)" }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--text-muted)" }}>{h.eyebrow}</span>
    </div>
  );
  const Desc = <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-lead)", lineHeight: "var(--lh-relaxed)", color: "var(--text-muted)", maxWidth: "46ch", margin: 0 }}>{h.desc}</p>;
  const CTAs = (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
      <Button href="#work" variant="primary" size="lg">{h.ctaPrimary}</Button>
      <Button href="#contact" variant="secondary" size="lg">{h.ctaSecondary}</Button>
    </div>
  );
  const Loc = <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", color: "var(--text-faint)" }}>{h.location}</span>;
  const Photo = (
    <image-slot id="hero-photo" src={data.meta.photo || undefined} shape="rounded" radius="18" fit="cover" placeholder="Tu foto profesional"
      style={{ display: "block", width: "100%", height: "clamp(380px, 42vw, 560px)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)" }}></image-slot>
  );
  const Stats = h.stats ? (
    <div className="stats">
      {h.stats.map((s, i) => (
        <div key={i} className="stat">
          <span className="stat-n">{s.n}</span>
          <span className="stat-l">{s.label}</span>
        </div>
      ))}
    </div>
  ) : null;

  if (heroLayout === "minimal" || !showPhoto) {
    return (
      <section id="top" style={{ background: "var(--surface)" }}>
        <div className="ds-container" style={{ paddingTop: "calc(var(--section-y) * 0.95)", paddingBottom: "var(--section-y)", display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: 980 }}>
          {Eyebrow}{Title}<div style={{ maxWidth: "52ch" }}>{Desc}</div>{CTAs}{Stats}{Loc}
        </div>
      </section>
    );
  }
  if (heroLayout === "stacked") {
    return (
      <section id="top" style={{ background: "var(--surface)" }}>
        <div className="ds-container" style={{ paddingTop: "calc(var(--section-y) * 0.95)", paddingBottom: "var(--section-y)", display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "var(--space-6)" }}>
            {Eyebrow}<div style={{ maxWidth: 18 + "ch" }}>{Title}</div><div style={{ maxWidth: "52ch" }}>{Desc}</div>{CTAs}{Stats}
          </div>
          <div style={{ width: "100%", maxWidth: 460, marginInline: "auto" }}>{Photo}</div>
        </div>
      </section>
    );
  }
  // split (default): description + profile photo side by side
  return (
    <section id="top" style={{ background: "var(--surface)" }}>
      <div className="ds-container hero-split" style={{ paddingTop: "calc(var(--section-y) * 0.85)", paddingBottom: "var(--section-y)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", justifyContent: "center" }}>
          {Eyebrow}{Title}{Desc}{CTAs}{Stats}{Loc}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>{Photo}</div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About({ t }) {
  const a = t.about;
  return (
    <SectionWrap id="about">
      <SectionHeading eyebrow={a.eyebrow} index="01" title={a.title} />
      <div className="about-grid2" style={{ marginTop: "var(--space-7)" }}>
        <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {a.paragraphs.map((p, i) => <p key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-lead)", lineHeight: "var(--lh-relaxed)", color: i === 0 ? "var(--text-body)" : "var(--text-muted)", margin: 0 }}>{p}</p>)}
          </div>
          <div className="facts-grid">
            {a.facts.map((f, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.35rem", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--text-faint)" }}>{f.k}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-strong)" }}>{f.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal style={{ display: "flex", alignItems: "flex-start" }}><DevWindow /></div>
      </div>
    </SectionWrap>
  );
}

/* ---------------- EDUCATION ---------------- */
function Education({ t }) {
  const e = t.education;
  return (
    <SectionWrap id="education" alt>
      <div className="split-head">
        <SectionHeading eyebrow={e.eyebrow} index="02" title={e.title} lead={e.lead} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: "var(--space-8)", maxWidth: 720 }}>
        {e.items.map((it, i) => <TimelineItem key={i} {...it} last={i === e.items.length - 1} />)}
      </div>
    </SectionWrap>
  );
}

/* ---------------- LANGUAGES ---------------- */
function Languages({ t }) {
  const l = t.languages;
  return (
    <SectionWrap id="languages">
      <SectionHeading eyebrow={l.eyebrow} index="03" title={l.title} lead={l.lead} />
      <div className="cards-grid" style={{ marginTop: "var(--space-8)" }}>
        {l.items.map((it, i) => <div className="reveal-cell" data-reveal key={i}><LanguageCard slotId={"lang-" + i} {...it} download={l.download} /></div>)}
      </div>
    </SectionWrap>
  );
}

/* ---------------- WORK ---------------- */
function Work({ t }) {
  const w = t.work;
  return (
    <SectionWrap id="work" alt>
      <SectionHeading eyebrow={w.eyebrow} index="04" title={w.title} lead={w.lead} />
      <div className="cards-grid" style={{ marginTop: "var(--space-8)" }}>
        {w.items.map((it, i) => <div className="reveal-cell" data-reveal key={i}><ProjectCard slotId={"work-" + i} {...it} /></div>)}
      </div>
    </SectionWrap>
  );
}

/* ---------------- RESEARCH ---------------- */
function Research({ t }) {
  const r = t.research;
  return (
    <SectionWrap id="research">
      <SectionHeading eyebrow={r.eyebrow} index="05" title={r.title} lead={r.lead} />
      <div className="cards-grid" style={{ marginTop: "var(--space-8)" }}>
        {r.items.map((it, i) => <div className="reveal-cell" data-reveal key={i}><ProjectCard slotId={"res-" + i} {...it} /></div>)}
      </div>
    </SectionWrap>
  );
}

/* ---------------- EXPERIENCE ---------------- */
function Experience({ t }) {
  const x = t.experience;
  return (
    <SectionWrap id="experience" alt>
      <SectionHeading eyebrow={x.eyebrow} index="06" title={x.title} lead={x.lead} />
      <div style={{ display: "flex", flexDirection: "column", marginTop: "var(--space-8)", maxWidth: 720 }}>
        {x.items.map((it, i) => <TimelineItem key={i} {...it} last={i === x.items.length - 1} />)}
      </div>
    </SectionWrap>
  );
}

/* ---------------- CONTACT + FOOTER ---------------- */
function Contact({ t, data }) {
  const c = t.contact;
  return (
    <section id="contact" style={{ background: "var(--invert-bg)", color: "var(--invert-text)" }}>
      <div className="ds-container" style={{ paddingTop: "calc(var(--section-y) * 1.1)", paddingBottom: "var(--space-8)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", maxWidth: 720 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--invert-muted)" }}>{c.eyebrow}</span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-regular)", fontSize: "var(--fs-h1)", lineHeight: "var(--lh-snug)", letterSpacing: "var(--ls-tight)", color: "var(--invert-text)", margin: 0 }}>{c.title}</h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-lead)", lineHeight: "var(--lh-relaxed)", color: "var(--invert-muted)", margin: 0 }}>{c.lead}</p>
        </div>
        <div style={{ marginTop: "var(--space-8)", maxWidth: 820 }}>
          {c.rows.map((r, i) => <ContactRow key={i} {...r} />)}
          <div style={{ borderTop: "1px solid var(--invert-line)" }} />
        </div>
      </div>
      <div className="ds-container" style={{ paddingBottom: "var(--space-7)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "var(--space-4)", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--invert-text)" }}>{data.meta.name}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", color: "var(--invert-muted)" }}>{c.footer}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", color: "var(--invert-muted)" }}>© {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}

/* ---------------- TECH CAROUSEL ---------------- */
function TechCarousel({ lang }) {
  const techs = window.PORTFOLIO_TECHS || [];
  const txt = (window.PORTFOLIO_TECH_TEXT || {})[lang] || {};
  const row = techs.concat(techs);
  return (
    <section id="tech" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
      <div className="ds-container" style={{ paddingTop: "var(--section-y)", paddingBottom: "calc(var(--section-y) * 0.55)" }}>
        <SectionHeading eyebrow={txt.eyebrow} title={txt.title} lead={txt.lead} />
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {row.map((tech, i) => (
            <div className="tech-chip" key={i}>
              <img src={tech.icon} alt={tech.name} loading="lazy" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ThemeToggle, Nav, Cover, Hero, DevWindow, About, TechCarousel, Education, Languages, Work, Research, Experience, Contact });
