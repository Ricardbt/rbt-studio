import { useState, useEffect, useRef, useCallback } from "react";

const COLORS = {
  bg: "#09090a",
  surface: "#111113",
  border: "#222228",
  cream: "#ede8dd",
  gold: "#c9a96e",
  goldLight: "#e0c48a",
  rust: "#b85c34",
  sage: "#6e9e78",
  text: "#ccc8bc",
  muted: "#5e5c58",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Unbounded:wght@400;700;900&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  body { background: #09090a; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 2px; }
  ::-webkit-scrollbar-track { background: #09090a; }
  ::-webkit-scrollbar-thumb { background: #c9a96e; }

  @keyframes slideUp {
    from { opacity:0; transform: translateY(30px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes pulse {
    0%,100% { opacity:0.3; transform: scaleY(1); }
    50%      { opacity:1;   transform: scaleY(1.3); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes blink {
    0%,100% { opacity:1; } 50% { opacity:0; }
  }
`;

/* ─── CANVAS: Generative particle field ─── */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W, H;
    const particles = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
        hue: Math.random() > 0.7 ? "#c9a96e" : "#5e5c58",
      });
    }

    let t = 0;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = "rgba(34,34,40,0.5)";
      ctx.lineWidth = 0.5;
      const step = 60;
      for (let x = 0; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Particles + connections
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.hue;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "#c9a96e";
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      // Central geometric: rotating rings
      const cx = W * 0.5, cy = H * 0.5;
      [80, 140, 200].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,169,110,${0.06 - i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 20]);
        ctx.lineDashOffset = t * (i % 2 === 0 ? 80 : -60);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.85 }}
    />
  );
}

/* ─── MARQUEE ─── */
function Marquee() {
  const items = [
    "React / Next.js", "AI Agents", "LLM Integration", "MCP Architecture",
    "Three.js / WebGL", "Processing Animations", "Arduino", "n8n Automation",
    "Supabase", "AWS Infrastructure", "Node.js", "Python AI Pipelines",
    "React / Next.js", "AI Agents", "LLM Integration", "MCP Architecture",
    "Three.js / WebGL", "Processing Animations", "Arduino", "n8n Automation",
    "Supabase", "AWS Infrastructure", "Node.js", "Python AI Pipelines",
  ];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: "0.9rem 0", background: COLORS.surface }}>
      <div style={{ display: "flex", width: "max-content", animation: "marquee 30s linear infinite" }}>
        {items.map((item, i) => (
          <span key={i} style={{ whiteSpace: "nowrap", padding: "0 2.5rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.18em", color: i % 3 === 0 ? COLORS.gold : COLORS.muted, textTransform: "uppercase" }}>
            {i % 3 === 0 ? "✦ " : "· "}{item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── SERVICES ─── */
const SERVICES = [
  {
    num: "01",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M13 18l4 4 8-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M4 34h32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: "Web Development & SaaS",
    desc: "Aplicaciones web de producción con React, Next.js y arquitecturas headless. Desde MVPs ágiles hasta plataformas escalables con auth, base de datos y APIs propias.",
    tags: ["React", "Next.js", "Supabase", "TypeScript", "Node.js"],
    href: "mailto:ricardboixeda@gmail.com?subject=Web Development",
  },
  {
    num: "02",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M20 4v4M20 32v4M4 20h4M32 20h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M9.4 9.4l2.8 2.8M27.8 27.8l2.8 2.8M9.4 30.6l2.8-2.8M27.8 12.2l2.8-2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: "AI Agents & Automatización",
    desc: "Diseño e implementación de agentes autónomos, pipelines LLM y flujos de automatización con n8n / Make. Integraciones con OpenAI, Anthropic y APIs de terceros.",
    tags: ["LLMs", "MCP", "n8n", "Python", "Anthropic API"],
    href: "mailto:ricardboixeda@gmail.com?subject=AI Automation",
  },
  {
    num: "03",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M8 32L20 8l12 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 24h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: "3D & Animación Creativa",
    desc: "Experiencias web inmersivas con Three.js, WebGL y React Three Fiber. Animaciones generativas con Processing y GSAP para proyectos que quieren romper con lo genérico.",
    tags: ["Three.js", "WebGL", "Processing", "GSAP", "R3F"],
    href: "mailto:ricardboixeda@gmail.com?subject=3D Creative",
  },
  {
    num: "04",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="14" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="24" y="10" width="10" height="18" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M16 20h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/>
      </svg>
    ),
    name: "Prototipado & Arduino",
    desc: "Desarrollo de prototipos físico-digitales: sensores, actuadores, comunicación serial con interfaces web. Del concepto al prototipo funcional para productos innovadores.",
    tags: ["Arduino", "Sensors", "Serial", "Processing", "IoT"],
    href: "mailto:ricardboixeda@gmail.com?subject=Arduino Prototype",
  },
  {
    num: "05",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M6 10h28M6 20h20M6 30h24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: "Consultoría Técnica",
    desc: "Auditorías de arquitectura, revisión de código y roadmap técnico para startups y equipos. Especializado en stack React, infraestructura AWS y estrategias de integración IA.",
    tags: ["Architecture", "AWS", "Code Review", "AI Strategy"],
    href: "mailto:ricardboixeda@gmail.com?subject=Technical Consulting",
  },
  {
    num: "06",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 6C13.4 6 8 11.4 8 18c0 4.2 2.1 7.9 5.3 10.2L12 34h16l-1.3-5.8C29.9 25.9 32 22.2 32 18c0-6.6-5.4-12-12-12z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M15 34h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: "Instalaciones Interactivas",
    desc: "Arte computacional e instalaciones físico-digitales para espacios culturales, eventos y marcas. Combinando código generativo, hardware y diseño de experiencia.",
    tags: ["Generative Art", "Interactive", "Hardware", "Creative Code"],
    href: "mailto:ricardboixeda@gmail.com?subject=Interactive Installation",
  },
];

function ServiceCard({ s, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={s.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        padding: "2.8rem 2.2rem",
        borderRight: (idx + 1) % 3 !== 0 ? `1px solid ${COLORS.border}` : "none",
        borderBottom: idx < 3 ? `1px solid ${COLORS.border}` : "none",
        background: hovered ? COLORS.surface : "transparent",
        transition: "background 0.4s",
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: COLORS.muted, letterSpacing: "0.2em", display: "block", marginBottom: "1.8rem" }}>{s.num}</span>
      <div style={{ color: COLORS.gold, marginBottom: "1.3rem", transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "transform 0.3s" }}>{s.icon}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 700, color: COLORS.cream, marginBottom: "0.9rem", lineHeight: 1.2 }}>{s.name}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", lineHeight: 1.85, color: COLORS.muted, marginBottom: "1.5rem" }}>{s.desc}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.8rem" }}>
        {s.tags.map(t => (
          <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.sage, border: `1px solid rgba(110,158,120,0.3)`, padding: "0.18rem 0.55rem" }}>{t}</span>
        ))}
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.gold, display: "flex", alignItems: "center", gap: hovered ? "0.9rem" : "0.5rem", transition: "gap 0.3s" }}>
        Consultar <span>→</span>
      </span>
    </a>
  );
}

/* ─── PROJECTS ─── */
const PROJECTS = [
  { num: "01", name: "StoryPrint AI", desc: "SaaS de cuentos ilustrados personalizados. Multi-step wizard con generación LLM, ilustraciones IA y export PDF.", tech: "Next.js · Supabase · LLMs" },
  { num: "02", name: "Brandboard AI", desc: "Plataforma de identidad de marca para agencias. Pipeline multi-agente con OpenAI + Anthropic y entregables exportables.", tech: "React · Supabase · AI Orchestration" },
  { num: "03", name: "NutrAI", desc: "Formulador de suplementos personalizado con historial persistente y parsing robusto de outputs JSON del modelo.", tech: "React · Anthropic API · TypeScript" },
  { num: "04", name: "GeoRoutes WP Theme", desc: "Tema WordPress con CPTs de rutas, Leaflet maps, soporte GPX y REST API personalizada para comunidades outdoor.", tech: "WordPress · Leaflet · PHP" },
  { num: "05", name: "Portfolio 3D", desc: "Tema WordPress con integración Three.js para portfolios de artistas. Shader personalizado, WebGL canvas reactivo.", tech: "Three.js · WebGL · WordPress" },
  { num: "06", name: "Processing Sketchbook", desc: "Colección de animaciones generativas: sistemas de partículas, L-systems, física simulada y arte algorítmico interactivo.", tech: "Processing · Java · Generative Art" },
];

function ProjectRow({ p, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1fr 1fr auto",
        alignItems: "center",
        gap: "2rem",
        padding: "2.2rem 0",
        borderBottom: `1px solid ${COLORS.border}`,
        background: hovered ? "rgba(201,169,110,0.03)" : "transparent",
        transition: "background 0.3s",
        cursor: "default",
      }}
    >
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: COLORS.muted, letterSpacing: "0.1em" }}>{p.num}</span>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", fontWeight: 700, color: hovered ? COLORS.goldLight : COLORS.cream, transition: "color 0.3s", fontStyle: hovered ? "italic" : "normal" }}>{p.name}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", lineHeight: 1.75, color: COLORS.muted }}>{p.desc}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em", color: COLORS.muted, textAlign: "right", whiteSpace: "nowrap" }}>{p.tech}</div>
    </div>
  );
}

/* ─── GENERATIVE ART CANVAS (mini) ─── */
function ArtCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const W = canvas.width = 500, H = canvas.height = 320;

    const draw = () => {
      t += 0.008;
      ctx.fillStyle = "rgba(8,8,9,0.15)";
      ctx.fillRect(0, 0, W, H);

      // Lissajous-like
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.02) {
          const r = 80 + i * 40 + Math.sin(t * (0.7 + i * 0.3) + a * 3) * 18;
          const x = W / 2 + Math.cos(a + t * (0.4 + i * 0.15)) * r;
          const y = H / 2 + Math.sin(a * 2 + t * (0.3 - i * 0.1)) * r * 0.6;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${38 + i * 15}, 55%, ${48 + i * 8}%, ${0.3 - i * 0.05})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Dots on curve
      const numDots = 12;
      for (let d = 0; d < numDots; d++) {
        const a = (d / numDots) * Math.PI * 2 + t;
        const r = 100 + Math.sin(t * 1.5 + d) * 25;
        const x = W / 2 + Math.cos(a) * r;
        const y = H / 2 + Math.sin(a * 1.5) * r * 0.55;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.gold;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ width: "100%", display: "block", maxWidth: 500 }} />;
}

/* ─── CONTACT ─── */
function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "ricardboixeda@gmail.com";
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" style={{ padding: "9rem 3rem", background: COLORS.bg, borderTop: `1px solid ${COLORS.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "1rem" }}>Contacto</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 4vw, 4.5rem)", fontWeight: 900, color: COLORS.cream, lineHeight: 0.95, marginBottom: "2.5rem" }}>
            Trabajemos<br /><em style={{ fontStyle: "italic", color: COLORS.gold }}>juntos.</em>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", lineHeight: 1.9, color: COLORS.muted, maxWidth: 420, marginBottom: "3rem" }}>
            Si tienes un proyecto de <strong style={{ color: COLORS.text, fontWeight: 400 }}>desarrollo web, automatización IA, instalación interactiva</strong> o algo que todavía no tiene nombre — escríbeme. Me gustan los proyectos que combinan tecnología y criterio artístico.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href={`mailto:${email}`}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem", color: COLORS.gold, textDecoration: "none", letterSpacing: "0.05em", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.gold}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
            >
              {email}
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.muted }}>Email →</span>
            </a>
            <a
              href="https://github.com/Ricardbt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: COLORS.muted, textDecoration: "none", letterSpacing: "0.05em", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "color 0.3s, border-color 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.color = COLORS.text; e.currentTarget.style.borderColor = COLORS.border; }}
              onMouseLeave={e => { e.currentTarget.style.color = COLORS.muted; }}
            >
              github.com/Ricardbt
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>GitHub →</span>
            </a>
            <a
              href="https://linkedin.com/in/ricardboixeda"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: COLORS.muted, textDecoration: "none", letterSpacing: "0.05em", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.text}
              onMouseLeave={e => e.currentTarget.style.color = COLORS.muted}
            >
              linkedin.com/in/ricardboixeda
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>LinkedIn →</span>
            </a>
          </div>
        </div>
        <div>
          <div style={{ border: `1px solid ${COLORS.border}`, padding: "3rem", background: COLORS.surface }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted, marginBottom: "2rem" }}>Copia el email</div>
            <button
              onClick={handleCopy}
              style={{ width: "100%", background: copied ? "rgba(110,158,120,0.15)" : "transparent", border: `1px solid ${copied ? COLORS.sage : COLORS.border}`, padding: "1.5rem 2rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem", color: copied ? COLORS.sage : COLORS.gold, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "space-between", letterSpacing: "0.05em" }}
            >
              {email}
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {copied ? "✓ Copiado" : "Copiar"}
              </span>
            </button>
            <div style={{ marginTop: "2rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", lineHeight: 1.8, color: COLORS.muted }}>
              <div style={{ marginBottom: "0.5rem" }}>📍 Barcelona, España</div>
              <div style={{ marginBottom: "0.5rem" }}>🌐 Disponible para proyectos remotos</div>
              <div>⏱ Respuesta habitual en {"<"} 24h</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos]   = useState({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const rafRef  = useRef();

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const animate = () => {
      ringRef.current.x += (mousePos.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (mousePos.y - ringRef.current.y) * 0.12;
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mousePos]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{style}</style>

      {/* CURSOR */}
      <div style={{ position: "fixed", left: mousePos.x, top: mousePos.y, width: 8, height: 8, background: COLORS.gold, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", mixBlendMode: "difference", transition: "width 0.2s, height 0.2s" }} />
      <div style={{ position: "fixed", left: ringPos.x, top: ringPos.y, width: 34, height: 34, border: `1px solid ${COLORS.gold}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)", opacity: 0.5 }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.6rem 3rem", background: scrolled ? "rgba(9,9,10,0.95)" : "transparent", transition: "background 0.4s", backdropFilter: scrolled ? "blur(8px)" : "none", borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none" }}>
        <a href="#" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.18em", color: COLORS.gold, textDecoration: "none", textTransform: "uppercase", animation: "fadeIn 1s 0.4s both" }}>
          RBT · Studio
        </a>
        <div style={{ display: "flex", gap: "2.5rem", animation: "fadeIn 1s 0.6s both" }}>
          {[["#services","Servicios"],["#work","Proyectos"],["#artistic","Arte & Código"],["#contact","Contacto"]].map(([href, label]) => (
            <a key={href} href={href} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", letterSpacing: "0.14em", color: COLORS.muted, textDecoration: "none", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = COLORS.cream}
              onMouseLeave={e => e.target.style.color = COLORS.muted}
            >{label}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflow: "hidden" }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "7rem 3rem 5rem", position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.67rem", letterSpacing: "0.25em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "1.5rem", animation: "slideUp 0.8s 0.2s both" }}>
            Developer & Creative Technologist · Barcelona
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 6vw, 7rem)", fontWeight: 900, lineHeight: 0.88, color: COLORS.cream, marginBottom: "2.2rem", animation: "slideUp 0.9s 0.4s both" }}>
            Ricard<br />
            <em style={{ fontStyle: "italic", color: COLORS.gold }}>Boixeda</em><br />
            Tamburini
          </h1>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", lineHeight: 1.95, color: COLORS.muted, maxWidth: 400, marginBottom: "3rem", animation: "slideUp 1s 0.6s both" }}>
            Construyo productos digitales donde la <strong style={{ color: COLORS.text, fontWeight: 400 }}>ingeniería de precisión</strong> y la <strong style={{ color: COLORS.text, fontWeight: 400 }}>sensibilidad artística</strong> coexisten. IA, web, código generativo y electrónica física.
          </p>
          <div style={{ display: "flex", gap: "1rem", animation: "slideUp 1s 0.8s both" }}>
            <a href="#services" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.bg, background: COLORS.gold, padding: "0.85rem 1.8rem", textDecoration: "none", transition: "background 0.3s" }}
              onMouseEnter={e => e.target.style.background = COLORS.goldLight}
              onMouseLeave={e => e.target.style.background = COLORS.gold}
            >Ver servicios</a>
            <a href="#contact" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.gold, border: `1px solid ${COLORS.border}`, padding: "0.85rem 1.8rem", textDecoration: "none", transition: "border-color 0.3s" }}
              onMouseEnter={e => e.target.style.borderColor = COLORS.gold}
              onMouseLeave={e => e.target.style.borderColor = COLORS.border}
            >Contactar</a>
          </div>
        </div>

        {/* RIGHT — canvas */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <ParticleCanvas />
          {/* grid overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${COLORS.border} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)`, backgroundSize: "60px 60px", opacity: 0.25, pointerEvents: "none" }} />
          {/* gradient blend with left */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${COLORS.bg} 0%, transparent 35%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "3rem", right: "2.5rem", textAlign: "right", animation: "fadeIn 1s 1.5s both" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: COLORS.muted, textTransform: "uppercase" }}>Barcelona · ES · 2025</div>
          </div>
          {/* scroll hint */}
          <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", animation: "fadeIn 1s 2s both" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", color: COLORS.muted, textTransform: "uppercase", writingMode: "vertical-lr" }}>scroll</span>
            <div style={{ width: 1, height: 45, background: `linear-gradient(to bottom, ${COLORS.gold}, transparent)`, animation: "pulse 2s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      <Marquee />

      {/* SERVICES */}
      <section id="services" style={{ padding: "8rem 3rem", background: COLORS.bg }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "0.8rem" }}>Servicios</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 700, color: COLORS.cream, lineHeight: 1.05, marginBottom: "4rem" }}>
            Lo que puedo<br /><em style={{ fontStyle: "italic", color: COLORS.gold }}>construir para ti</em>
          </h2>
          <div style={{ border: `1px solid ${COLORS.border}`, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {SERVICES.map((s, i) => <ServiceCard key={s.num} s={s} idx={i} />)}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding: "8rem 3rem", background: COLORS.surface, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "0.8rem" }}>Proyectos</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 700, color: COLORS.cream, lineHeight: 1.05, marginBottom: "4rem" }}>
            Trabajo <em style={{ fontStyle: "italic", color: COLORS.gold }}>seleccionado</em>
          </h2>
          <div>
            {PROJECTS.map((p, i) => <ProjectRow key={p.num} p={p} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ARTISTIC */}
      <section id="artistic" style={{ padding: "8rem 3rem", background: COLORS.bg, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "0.8rem" }}>Arte & Código</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 700, color: COLORS.cream, lineHeight: 1.05, marginBottom: "4rem" }}>
            Donde el código<br /><em style={{ fontStyle: "italic", color: COLORS.gold }}>se vuelve imagen</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <div style={{ position: "sticky", top: "8rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", lineHeight: 2, color: COLORS.muted, marginBottom: "2rem" }}>
                Mi formación en <strong style={{ color: COLORS.text, fontWeight: 400 }}>Bellas Artes</strong> nunca ha estado separada de mi práctica técnica. El código generativo, las instalaciones interactivas y la electrónica física son extensiones naturales de ese lenguaje visual.
                <br /><br />
                Trabajo con <strong style={{ color: COLORS.text, fontWeight: 400 }}>Processing</strong> para animaciones y arte algorítmico, <strong style={{ color: COLORS.text, fontWeight: 400 }}>Arduino</strong> para prototipos físico-digitales, y <strong style={{ color: COLORS.text, fontWeight: 400 }}>Three.js / WebGL</strong> para experiencias web que van más allá de lo convencional.
              </p>
              <div style={{ border: `1px solid ${COLORS.border}`, position: "relative", overflow: "hidden", background: "#070708" }}>
                <ArtCanvas />
                <span style={{ position: "absolute", bottom: "0.8rem", left: "1rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: COLORS.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Generative · Live Canvas</span>
              </div>
            </div>
            <div>
              {[
                { label: "Animación Generativa", title: "Sistemas de partículas & L-Systems", desc: "Exploración de patrones naturales mediante código. Árboles fractal, fluidos simulados, autómatas celulares y comportamientos emergentes implementados en Processing y p5.js." },
                { label: "Hardware & Electrónica", title: "Arduino & Prototipos Físicos", desc: "Proyectos que conectan el mundo físico y digital: sensores ambientales, actuadores, comunicación serial con interfaces web, y prototipos de producto para startups de hardware." },
                { label: "Experiencias 3D Web", title: "WebGL / Three.js Interactivo", desc: "Shaders personalizados, geometrías procedurales y escenas 3D reactivas al usuario. Proyectos de portfolio para artistas, visualizaciones de datos y campañas de marca." },
                { label: "Instalaciones", title: "Arte Computacional & Espacio", desc: "Propuestas para espacios culturales y eventos: proyección mapping, instalaciones audiovisuales y entornos interactivos que responden a la presencia del espectador." },
              ].map(item => (
                <div key={item.label} style={{ padding: "2.5rem 0", borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.7rem" }}>{item.label}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 700, fontStyle: "italic", color: COLORS.cream, marginBottom: "0.8rem" }}>{item.title}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.73rem", lineHeight: 1.85, color: COLORS.muted }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT strip */}
      <section style={{ padding: "5rem 3rem", background: COLORS.surface, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4rem" }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "1rem" }}>Formación</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, color: COLORS.cream, marginBottom: "0.5rem" }}>Bellas Artes</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: COLORS.muted, lineHeight: 1.7 }}>Imagen & Diseño · Universidad de Barcelona. Base conceptual y visual que impregna cada proyecto técnico.</div>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "1rem" }}>Experiencia</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, color: COLORS.cream, marginBottom: "0.5rem" }}>10+ años</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: COLORS.muted, lineHeight: 1.7 }}>De la Universidad de Barcelona a Paladini Digital Solutions. Proyectos para startups, agencias, instituciones y proyectos propios.</div>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "1rem" }}>Ubicación</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 700, color: COLORS.cream, marginBottom: "0.5rem" }}>Barcelona · Remote-ready</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: COLORS.muted, lineHeight: 1.7 }}>Disponible para proyectos en remoto globalmente. Idiomas: Español, Catalán, Inglés (B2).</div>
          </div>
        </div>
      </section>

      <ContactSection />

      {/* FOOTER */}
      <footer style={{ padding: "2rem 3rem", background: COLORS.bg, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", color: COLORS.muted, textTransform: "uppercase" }}>© 2025 Ricard Boixeda Tamburini</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", color: COLORS.muted }}>Barcelona · Spain</span>
      </footer>
    </>
  );
}
