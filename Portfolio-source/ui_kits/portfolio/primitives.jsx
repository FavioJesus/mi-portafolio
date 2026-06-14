/* Portfolio primitives — mirror the design-system components, adapted
   for the live page (image-slot integration). Assigned to window. */

function Button({ children, variant = "primary", size = "md", href, iconRight, onClick, style, ...rest }) {
  const sizes = {
    sm: { padding: "0.5rem 0.85rem", font: "var(--fs-sm)" },
    md: { padding: "0.7rem 1.15rem", font: "var(--fs-sm)" },
    lg: { padding: "0.95rem 1.6rem", font: "var(--fs-body)" },
  };
  const variants = {
    primary: { background: "var(--accent)", color: "var(--text-on-accent)", border: "1px solid var(--accent)" },
    secondary: { background: "transparent", color: "var(--text-strong)", border: "1px solid var(--border-strong)" },
    ghost: { background: "transparent", color: "var(--text-strong)", border: "1px solid transparent" },
    dark: { background: "var(--ink-950)", color: "#fff", border: "1px solid var(--ink-950)" },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hov, setHov] = React.useState(false);
  const hovBg = variant === "primary" ? "var(--accent-hover)" : variant === "ghost" ? "var(--surface-raised)" : variant === "dark" ? "var(--ink-800)" : "transparent";
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
        fontFamily: "var(--font-mono)", fontWeight: "var(--fw-medium)", fontSize: s.font,
        letterSpacing: "var(--ls-wide)", lineHeight: 1, padding: s.padding,
        borderRadius: "var(--radius-sm)", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap",
        transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
        ...v,
        background: hov && variant !== "secondary" ? hovBg : v.background,
        borderColor: hov && variant === "secondary" ? "var(--ink-950)" : v.border.split(" ").pop(),
        ...style,
      }} {...rest}>
      {children}
      {iconRight ? <span style={{ display: "inline-flex" }}>{iconRight}</span> : null}
    </Tag>
  );
}

function Tag({ children, variant = "default", style }) {
  const variants = {
    default: { background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)" },
    solid: { background: "var(--surface-sunken)", color: "var(--text-body)", border: "1px solid transparent" },
    accent: { background: "var(--accent-soft)", color: "var(--accent-ink)", border: "1px solid transparent" },
  };
  const v = variants[variant] || variants.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", lineHeight: 1,
      padding: "0.34rem 0.6rem", borderRadius: "var(--radius-xs)", whiteSpace: "nowrap", ...v, ...style,
    }}>{children}</span>
  );
}

function Badge({ children, tone = "neutral", dot = false, style }) {
  const tones = {
    neutral: { bg: "var(--surface-sunken)", fg: "var(--text-muted)", dotc: "var(--ink-400)" },
    accent: { bg: "var(--accent-soft)", fg: "var(--accent-ink)", dotc: "var(--accent)" },
    success: { bg: "var(--success-soft)", fg: "var(--success)", dotc: "var(--success)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.4rem", background: t.bg, color: t.fg,
      fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--ls-wide)", lineHeight: 1, padding: "0.34rem 0.6rem",
      borderRadius: "var(--radius-full)", whiteSpace: "nowrap", ...style,
    }}>
      {dot ? <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.dotc }} /> : null}
      {children}
    </span>
  );
}

function SectionHeading({ index, eyebrow, title, lead, trailing }) {
  return (
    <header data-reveal style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {index ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", color: "var(--accent)", fontWeight: "var(--fw-medium)", letterSpacing: "var(--ls-wide)" }}>{index}</span> : null}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", textTransform: "uppercase", letterSpacing: "var(--ls-label)", color: "var(--text-muted)" }}>{eyebrow}</span>
        <span aria-hidden style={{ flex: 1, height: 1, background: "var(--border)", minWidth: "2rem" }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--space-5)" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-regular)", fontSize: "var(--fs-h2)", lineHeight: "var(--lh-snug)", letterSpacing: "var(--ls-tight)", color: "var(--text-strong)", margin: 0, maxWidth: "18ch" }}>{title}</h2>
        {trailing ? <div style={{ flexShrink: 0 }}>{trailing}</div> : null}
      </div>
      {lead ? <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-lead)", lineHeight: "var(--lh-relaxed)", color: "var(--text-muted)", maxWidth: "56ch", margin: 0 }}>{lead}</p> : null}
    </header>
  );
}

function ProjectCard({ slotId, img, category, year, title, description, tags = [], href = "#", cta = "Ver proyecto" }) {
  const [hover, setHover] = React.useState(false);
  const ext = /^https?:/.test(href);
  return (
    <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener" : undefined} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", flexDirection: "column", background: "var(--surface-card)",
        border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border)"),
        borderRadius: "var(--radius-lg)", overflow: "hidden", textDecoration: "none", color: "inherit",
        boxShadow: hover ? "var(--shadow-md)" : "none", transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
      }}>
      <div style={{ position: "relative", borderBottom: "1px solid var(--border)" }}>
        <image-slot id={slotId} src={img || undefined} shape="rect" fit="cover" placeholder="Vista previa del proyecto"
          style={{ display: "block", width: "100%", aspectRatio: "16 / 10" }}></image-slot>
        {category ? <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "var(--paper)", color: "var(--text-body)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", padding: "0.3rem 0.55rem", borderRadius: "var(--radius-xs)", boxShadow: "var(--shadow-xs)", pointerEvents: "none" }}>{category}</span> : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", padding: "var(--space-5)", flex: 1 }}>
        {year ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", letterSpacing: "var(--ls-wide)" }}>{year}</span> : null}
        <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-medium)", fontSize: "var(--fs-h3)", lineHeight: "var(--lh-snug)", letterSpacing: "var(--ls-tight)", color: "var(--text-strong)", margin: 0 }}>{title}</h3>
        {description ? <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", lineHeight: "var(--lh-relaxed)", color: "var(--text-muted)", margin: 0 }}>{description}</p> : null}
        {tags.length ? <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "var(--space-2)" }}>{tags.map((t, i) => <Tag key={i}>{t}</Tag>)}</div> : null}
        <span style={{ marginTop: "auto", paddingTop: "var(--space-3)", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", color: "var(--accent)" }}>
          {cta}<span style={{ transform: hover ? "translateX(4px)" : "translateX(0)", transition: "transform var(--dur-base) var(--ease-out)" }}>{ext ? "\u2197" : "\u2192"}</span>
        </span>
      </div>
    </a>
  );
}

function TimelineItem({ period, title, place, description, meta = [], current = false, last = false }) {
  return (
    <div data-reveal style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-5)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ width: 13, height: 13, borderRadius: "50%", flexShrink: 0, background: current ? "var(--accent)" : "var(--paper)", border: current ? "1px solid var(--accent)" : "1.5px solid var(--border-strong)", boxShadow: current ? "0 0 0 4px var(--accent-soft)" : "none", marginTop: "0.35rem" }} />
        {!last ? <span style={{ flex: 1, width: 1.5, background: "var(--border)", marginTop: 6, minHeight: "1.5rem" }} /> : null}
      </div>
      <div style={{ paddingBottom: last ? 0 : "var(--space-7)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", color: "var(--accent)" }}>{period}</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-medium)", fontSize: "var(--fs-h3)", lineHeight: "var(--lh-snug)", letterSpacing: "var(--ls-tight)", color: "var(--text-strong)", margin: 0 }}>{title}</h3>
        {place ? <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", fontWeight: "var(--fw-medium)" }}>{place}</span> : null}
        {description ? <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", lineHeight: "var(--lh-relaxed)", color: "var(--text-muted)", margin: "0.15rem 0 0" }}>{description}</p> : null}
        {meta.length ? <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.35rem" }}>{meta.map((m, i) => <Tag key={i}>{m}</Tag>)}</div> : null}
      </div>
    </div>
  );
}

function LanguageCard({ slotId, img, language, level, code, prof = 0, href, download = "Certificado (PDF)" }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", flexDirection: "column", background: "var(--surface-card)", border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border)"), borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: hover ? "var(--shadow-sm)" : "none", transition: "box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)" }}>
      <image-slot id={slotId} src={img || undefined} shape="rect" fit="cover" placeholder="Imagen / certificado"
        style={{ display: "block", width: "100%", aspectRatio: "16 / 9", borderBottom: "1px solid var(--border)" }}></image-slot>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", padding: "var(--space-5)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-medium)", fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-tight)", color: "var(--text-strong)", margin: 0 }}>{language}</h3>
          {code ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", color: "var(--accent)", background: "var(--accent-soft)", padding: "0.2rem 0.5rem", borderRadius: "var(--radius-xs)" }}>{code}</span> : null}
        </div>
        {level ? <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>{level}</span> : null}
        <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.1rem" }}>
          {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ height: 5, flex: 1, borderRadius: "var(--radius-full)", background: i < prof ? "var(--accent)" : "var(--surface-sunken)" }} />)}
        </div>
        {href ? <a href={href} target="_blank" rel="noopener" style={{ marginTop: "var(--space-2)", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", color: "var(--text-strong)" }}><span style={{ color: "var(--accent)" }}>↓</span>{download}</a> : <span style={{ marginTop: "var(--space-2)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-wide)", color: "var(--text-faint)" }}>—</span>}
      </div>
    </div>
  );
}

function ContactRow({ label, value, href, external = false }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-5)", padding: "var(--space-5) 0", borderTop: "1px solid var(--invert-line)", textDecoration: "none", color: "inherit" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", minWidth: 0 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", letterSpacing: "var(--ls-label)", textTransform: "uppercase", color: "var(--invert-muted)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-serif)", fontWeight: "var(--fw-regular)", fontSize: "var(--fs-h3)", letterSpacing: "var(--ls-tight)", color: hover ? "var(--invert-accent)" : "var(--invert-text)", transition: "color var(--dur-base) var(--ease-out)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
      </div>
      <span aria-hidden style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", flexShrink: 0, color: hover ? "var(--invert-accent)" : "var(--invert-muted)", transform: hover ? (external ? "translate(3px,-3px)" : "translateX(5px)") : "translate(0,0)", transition: "transform var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)" }}>{external ? "↗" : "→"}</span>
    </a>
  );
}

Object.assign(window, { Button, Tag, Badge, SectionHeading, ProjectCard, TimelineItem, LanguageCard, ContactRow });
