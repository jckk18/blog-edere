import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { TriangleAlert as AlertTriangle, ArrowUpRight, BookOpen, Brain, Check, CircleCheck as CheckCircle2, CircleDot, FingerprintPattern as Fingerprint, Landmark, Menu, Minus, Plus, Scale, ShieldCheck, X } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

interface Entry {
  num: string;
  chapter: string;
  title: string;
  kicker: string;
  tags: string[];
  readTime: string;
  preview: string;
  sectionId?: string;
  render: () => ReactNode;
}

// ---------- Typographic primitives ----------
const H = ({ children }: { children: ReactNode }) => (
  <h3 className="serif mt-11 mb-4 text-3xl leading-tight text-ink md:text-4xl">{children}</h3>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="mb-5 text-[17px] leading-[1.78] text-ink-2">{children}</p>
);

const UL = ({ children }: { children: ReactNode }) => (
  <ul className="mb-6 space-y-3 pl-0 text-[16px] leading-[1.7] text-ink-2">{children}</ul>
);

const LI = ({ children }: { children: ReactNode }) => (
  <li className="relative pl-7 before:absolute before:left-0 before:top-[0.72em] before:h-[7px] before:w-[7px] before:rounded-full before:bg-accent before:shadow-[0_0_0_4px_rgba(43,91,255,0.10)]">
    {children}
  </li>
);

const STRONG = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-ink">{children}</strong>
);

function LegalArticle({ title, body, penalty }: { title: string; body: string; penalty: string }) {
  return (
    <figure className="my-6 rounded-[2rem] border border-rule bg-surface p-6 shadow-soft md:p-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="eyebrow text-accent">{title}</div>
        <div className="rounded-full border border-rule bg-paper px-3 py-1 mono text-[11px] text-muted-ink">
          Pena · {penalty}
        </div>
      </div>
      <blockquote className="serif text-2xl leading-snug text-ink italic md:text-3xl">
        &ldquo;{body}&rdquo;
      </blockquote>
    </figure>
  );
}

function PhishingFlow() {
  const steps = [
    { title: "Señuelo", text: "Un mensaje imita a un banco, red social o institución pública." },
    { title: "Urgencia", text: "La víctima recibe una amenaza: bloqueo, multa o verificación inmediata." },
    { title: "Captura", text: "El enlace falso solicita usuario, clave, token o datos personales." },
    { title: "Fraude", text: "El atacante usa o vende la información obtenida." },
  ];

  return (
    <div className="my-8 rounded-[2rem] border border-rule bg-surface p-4 shadow-soft md:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div className="eyebrow text-accent">Mapa del ataque</div>
          <h4 className="serif mt-1 text-3xl text-ink">De la confianza al fraude</h4>
        </div>
        <Fingerprint className="h-8 w-8 text-accent" />
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.title} className="group relative rounded-[1.5rem] border border-rule bg-paper p-5 transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper mono text-[12px]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h5 className="serif text-2xl text-ink">{step.title}</h5>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{step.text}</p>
            {index < steps.length - 1 && (
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted-ink opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SignalComparison() {
  const safe = ["Dominio oficial", "Sin solicitud de claves", "Lenguaje claro", "Verificación desde canales conocidos"];
  const risky = ["Link acortado o extraño", "Amenaza de bloqueo", "Errores de escritura", "Pide token, clave o código SMS"];

  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-[2rem] border border-rule bg-surface p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-positive" />
          <h4 className="serif text-3xl text-ink">Señales confiables</h4>
        </div>
        <ul className="space-y-3">
          {safe.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] text-ink-2">
              <Check className="mt-1 h-4 w-4 shrink-0 text-positive" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[2rem] border border-warning/30 bg-warning-soft p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h4 className="serif text-3xl text-ink">Señales de alerta</h4>
        </div>
        <ul className="space-y-3">
          {risky.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] text-ink-2">
              <CircleDot className="mt-1 h-4 w-4 shrink-0 text-warning" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PreventionChecklist() {
  const items = [
    "Verificar siempre la URL antes de ingresar datos: protocolo seguro y dominio exacto.",
    "Activar autenticación de dos factores en banca digital, correo y redes sociales.",
    "No compartir contraseñas, claves dinámicas ni datos personales por teléfono, WhatsApp o correo.",
    "Desconfiar de mensajes con urgencia extrema: bloqueos, multas o bonos inesperados.",
    "Mantener sistema operativo, navegador y aplicaciones actualizados.",
    "Usar un gestor de contraseñas para evitar credenciales repetidas.",
    "Confirmar directamente con la entidad financiera cualquier comunicación sospechosa.",
  ];
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const completed = checked.filter(Boolean).length;
  const pct = Math.round((completed / items.length) * 100);

  return (
    <div className="my-8 overflow-hidden rounded-[2rem] border border-rule bg-surface shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-4 md:px-6">
        <div>
          <div className="eyebrow text-accent">Checklist interactivo</div>
          <h4 className="serif mt-1 text-3xl text-ink">Seguridad personal</h4>
        </div>
        <div className="rounded-full bg-ink px-4 py-2 mono text-[12px] text-paper">
          {completed}/{items.length} · {pct}%
        </div>
      </div>
      <div className="h-1 bg-paper-3">
        <div className="h-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <ul className="divide-y divide-rule">
        {items.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))}
              aria-pressed={checked[i]}
              className="group flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-paper md:px-6"
            >
              <span
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink transition-colors"
                style={{ background: checked[i] ? "#111827" : "transparent" }}
              >
                {checked[i] && <Check className="h-3.5 w-3.5 text-paper" />}
              </span>
              <span className={"text-[15px] leading-relaxed transition-all " + (checked[i] ? "text-muted-ink line-through" : "text-ink-2")}>
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DenunciaCTA() {
  return (
    <aside className="my-10 overflow-hidden rounded-[2.2rem] bg-ink p-8 text-paper shadow-deep md:p-10">
      <div className="relative z-10 max-w-2xl">
        <div className="eyebrow text-accent-light">Llamado a la acción</div>
        <h4 className="serif mt-3 text-4xl leading-tight md:text-6xl">¿Fuiste víctima de phishing?</h4>
        <p className="mt-5 text-[16px] leading-relaxed text-paper-muted md:text-lg">
          Denuncia ante el <span className="text-paper underline decoration-accent-light decoration-2 underline-offset-4">CICPC — División de Delitos Informáticos</span> y conserva capturas, enlaces, números telefónicos, correos y comprobantes. La denuncia ayuda a documentar patrones y proteger a otros usuarios.
        </p>
      </div>
    </aside>
  );
}

// ---------- Entries data ----------
const entries: Entry[] = [
  {
    num: "I",
    chapter: "Capítulo uno",
    title: "Introducción al phishing",
    kicker: "Anatomía del engaño digital",
    tags: ["Introducción", "Phishing", "Ciberdelito"],
    readTime: "5 min",
    preview: "Qué es, cómo opera y por qué resulta especialmente peligroso en un entorno donde la vida bancaria y social depende de canales digitales.",
    render: () => (
      <>
        <P>El phishing es una técnica de ingeniería social utilizada por ciberdelincuentes para engañar a usuarios y obtener información confidencial como contraseñas, datos bancarios o información personal. El término proviene del inglés <em>fishing</em> —pesca— y describe la idea de atraer víctimas mediante señuelos digitales cuidadosamente diseñados.</P>
        <H>Tipos de phishing</H>
        <UL>
          <LI><STRONG>Phishing tradicional</STRONG> — correos masivos que simulan ser de entidades legítimas, como bancos, plataformas sociales o servicios públicos.</LI>
          <LI><STRONG>Spear phishing</STRONG> — ataques dirigidos a personas u organizaciones específicas, con mensajes personalizados.</LI>
          <LI><STRONG>Smishing</STRONG> — phishing a través de SMS, WhatsApp o mensajería instantánea.</LI>
          <LI><STRONG>Vishing</STRONG> — llamadas telefónicas donde el atacante se hace pasar por representante de una empresa.</LI>
          <LI><STRONG>Pharming</STRONG> — redireccionamiento malicioso de URLs legítimas hacia sitios fraudulentos.</LI>
        </UL>
        <H>Contexto en Venezuela</H>
        <P>En Venezuela, el phishing resulta especialmente sensible por la dependencia cotidiana de pagos móviles, banca digital, redes sociales y mensajería. La mezcla entre urgencia económica, uso extendido de WhatsApp y baja formación en seguridad digital crea un escenario propicio para el engaño.</P>
        <H>Cómo opera un ataque</H>
        <PhishingFlow />
      </>
    ),
  },
  {
    num: "II",
    chapter: "Capítulo dos",
    title: "Marco legal en Venezuela",
    kicker: "La LECDI bajo el microscopio",
    tags: ["Marco Legal", "LECDI", "Ley Venezolana"],
    readTime: "7 min",
    sectionId: "marco-legal",
    preview: "La Ley Especial contra los Delitos Informáticos establece el punto de partida jurídico. El reto está en adaptar esa base a formas modernas de fraude digital.",
    render: () => (
      <>
        <P>La <STRONG>Ley Especial contra los Delitos Informáticos (LECDI)</STRONG>, publicada en la Gaceta Oficial N.º 37.313 del 30 de octubre de 2001, constituye el principal instrumento jurídico venezolano para combatir delitos cometidos mediante tecnologías de información y comunicación.</P>
        <H>Artículos aplicables al phishing</H>
        <LegalArticle title="Artículo 14 — Fraude" body="El que, a través del uso de tecnologías de información, engañe a una persona para obtener de ella o de un tercero una cantidad de dinero, bienes o cualquier otro provecho económico…" penalty="3 a 7 años de prisión" />
        <LegalArticle title="Artículo 16 — Apropiación de datos" body="Tipifica el acceso no autorizado a sistemas con el fin de obtener, modificar, destruir o revelar datos confidenciales." penalty="1 a 5 años de prisión" />
        <LegalArticle title="Artículo 20 — Violación de la privacidad" body="Sanciona el uso no autorizado de datos personales obtenidos mediante sistemas de información." penalty="2 a 6 años de prisión" />
        <LegalArticle title="Artículo 6 — Acceso indebido" body="Penaliza el acceso no autorizado a sistemas de información." penalty="1 a 5 años de prisión" />
        <H>Instituciones para denunciar</H>
        <UL>
          <LI><STRONG>CICPC</STRONG> — Cuerpo de Investigaciones Científicas, Penales y Criminalísticas, División de Delitos Informáticos.</LI>
          <LI><STRONG>Ministerio Público</STRONG> — fiscalías competentes para procesar denuncias vinculadas a delitos informáticos.</LI>
          <LI><STRONG>CONATEL</STRONG> — Comisión Nacional de Telecomunicaciones, vinculada al ecosistema regulatorio de telecomunicaciones.</LI>
        </UL>
        <H>Límites del marco legal</H>
        <P>La LECDI fue una base importante para su época, pero el phishing actual opera mediante redes sociales, aplicaciones móviles, pagos instantáneos, suplantación por mensajería y esquemas transnacionales. Por ello, el marco normativo necesita actualización, lenguaje técnico más preciso y mecanismos de denuncia más accesibles.</P>
      </>
    ),
  },
  {
    num: "III",
    chapter: "Capítulo tres",
    title: "Impacto psicológico",
    kicker: "Lo que la víctima no cuenta",
    tags: ["Psicología Digital", "Víctimas", "Impacto Social"],
    readTime: "6 min",
    sectionId: "impacto",
    preview: "Ser víctima de phishing no solo implica una pérdida económica. También produce culpa, vergüenza, ansiedad y desconfianza hacia la vida digital.",
    render: () => (
      <>
        <P>Las consecuencias del phishing no se limitan a la dimensión económica. Para muchas personas, la pérdida de dinero viene acompañada de vergüenza, culpa y sensación de vulnerabilidad, especialmente cuando el fraude ocurre dentro de entornos cotidianos como WhatsApp, banca móvil o redes sociales.</P>
        <H>Consecuencias frecuentes</H>
        <UL>
          <LI><STRONG>Ansiedad y desconfianza digital</STRONG> — dificultad para realizar transacciones en línea, incluso cuando son legítimas.</LI>
          <LI><STRONG>Vergüenza y culpa</STRONG> — muchas víctimas se sienten responsables por “haber caído”, lo que inhibe la denuncia.</LI>
          <LI><STRONG>Estrés sostenido</STRONG> — preocupación por nuevas pérdidas, exposición de datos personales o robo de identidad.</LI>
          <LI><STRONG>Aislamiento social</STRONG> — temor a ser juzgados por familiares, amigos o compañeros de trabajo.</LI>
          <LI><STRONG>Pérdida de confianza</STRONG> — deterioro de la seguridad personal ante decisiones digitales cotidianas.</LI>
        </UL>
        <H>Intervención y acompañamiento</H>
        <UL>
          <LI>Comunicación empática por parte de bancos, instituciones y familiares.</LI>
          <LI>Guías de denuncia claras para reducir la sensación de desamparo.</LI>
          <LI>Educación post-victimización para recuperar confianza en el entorno digital.</LI>
          <LI>Acompañamiento legal y psicológico cuando el caso involucra pérdidas graves o exposición de datos personales.</LI>
        </UL>
      </>
    ),
  },
  {
    num: "IV",
    chapter: "Capítulo cuatro",
    title: "Casos y modalidades",
    kicker: "Patrones del fraude cotidiano",
    tags: ["Casos", "Venezuela", "Estadísticas"],
    readTime: "5 min",
    sectionId: "casos",
    preview: "Más que casos aislados, el phishing se repite mediante patrones: bancos falsos, mensajes de verificación, bonos engañosos y suplantación de contactos.",
    render: () => (
      <>
        <P>El phishing en Venezuela suele presentarse mediante mensajes que imitan instituciones conocidas o aprovechan situaciones de necesidad. El objetivo no es únicamente engañar técnicamente, sino generar presión emocional para que la víctima actúe sin verificar.</P>
        <H>Sectores más afectados</H>
        <UL>
          <LI><STRONG>Sector bancario</STRONG> — suplantación de bancos mediante correos, SMS, llamadas o mensajes de WhatsApp.</LI>
          <LI><STRONG>Sector gubernamental</STRONG> — portales falsos que imitan trámites, beneficios, registros o declaraciones.</LI>
          <LI><STRONG>Redes sociales</STRONG> — robo de cuentas para pedir dinero a contactos o distribuir enlaces maliciosos.</LI>
          <LI><STRONG>Comercio electrónico</STRONG> — tiendas falsas, comprobantes manipulados y links fraudulentos.</LI>
        </UL>
        <H>Modalidades comunes</H>
        <UL>
          <LI>Mensajes de supuesta “verificación de cuenta” enviados por WhatsApp.</LI>
          <LI>Correos falsos sobre retenciones, multas, beneficios o trámites urgentes.</LI>
          <LI>Llamadas de supuestos agentes bancarios solicitando claves dinámicas.</LI>
          <LI>Enlaces distribuidos en grupos prometiendo bonos, premios o promociones.</LI>
        </UL>
        <SignalComparison />
      </>
    ),
  },
  {
    num: "V",
    chapter: "Capítulo cinco",
    title: "Medidas de prevención",
    kicker: "Defensa en capas",
    tags: ["Prevención", "Seguridad", "Educación Digital"],
    readTime: "6 min",
    sectionId: "prevencion",
    preview: "La prevención no depende de una sola herramienta. Requiere hábitos, verificación, educación y respuesta institucional.",
    render: () => (
      <>
        <P>La prevención del phishing requiere un enfoque multidimensional que involucre a individuos, empresas e instituciones. Ninguna capa es suficiente por sí sola: la seguridad funciona mejor cuando combina hábitos personales, protocolos organizacionales y educación pública.</P>
        <H>Medidas individuales</H>
        <PreventionChecklist />
        <H>Medidas colectivas y empresariales</H>
        <UL>
          <LI>Implementar programas de capacitación en ciberseguridad para empleados.</LI>
          <LI>Realizar simulaciones periódicas de ataques de phishing en organizaciones.</LI>
          <LI>Establecer protocolos de verificación multinivel para transacciones sensibles.</LI>
          <LI>Implementar filtros anti-phishing en servidores de correo corporativo.</LI>
        </UL>
        <H>Rol del Estado venezolano</H>
        <UL>
          <LI>Actualizar la LECDI para incluir modalidades modernas de phishing y suplantación digital.</LI>
          <LI>Fortalecer la División de Delitos Informáticos del CICPC con recursos y personal especializado.</LI>
          <LI>Implementar campañas nacionales de educación digital con lenguaje accesible.</LI>
          <LI>Crear canales de denuncia centralizados, rápidos y fáciles de utilizar.</LI>
        </UL>
      </>
    ),
  },
  {
    num: "VI",
    chapter: "Capítulo seis",
    title: "Conclusiones",
    kicker: "Hacia una cultura de ciberseguridad",
    tags: ["Conclusiones", "Ciberseguridad", "Concientización"],
    readTime: "4 min",
    sectionId: "conclusiones",
    preview: "El phishing representa un desafío real para Venezuela. Combatirlo exige educación digital, actualización legal y responsabilidad colectiva.",
    render: () => (
      <>
        <P>El análisis realizado permite concluir que el phishing no debe entenderse como un simple error del usuario, sino como una forma de delito informático que explota confianza, urgencia, desconocimiento y vulnerabilidades institucionales.</P>
        <H>Puntos clave</H>
        <UL>
          <LI>El phishing es una amenaza adaptable que afecta a personas, empresas e instituciones.</LI>
          <LI>La LECDI del 2001 constituye una base legal importante, pero necesita actualización frente al ecosistema digital actual.</LI>
          <LI>Las consecuencias van más allá de lo económico: el impacto psicológico y social también debe ser atendido.</LI>
          <LI>La prevención efectiva requiere educación digital como política pública y como hábito ciudadano.</LI>
          <LI>La denuncia y la visibilización de casos son fundamentales para reducir la impunidad.</LI>
        </UL>
        <H>Reflexión final</H>
        <P>La ciberseguridad no es solo responsabilidad de expertos o instituciones. También es una responsabilidad ciudadana. En Venezuela, donde la transición digital ha sido acelerada, la brecha entre adopción tecnológica y educación en seguridad digital representa una amenaza cotidiana.</P>
        <P>Concientizar al entorno, reportar intentos de phishing y exigir mejores mecanismos de prevención son acciones concretas para construir una cultura digital más segura.</P>
        <DenunciaCTA />
      </>
    ),
  },
];

// ---------- Hooks ----------
function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entriesList) => entriesList.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      }),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ---------- Components ----------
function Wordmark() {
  return (
    <a href="#top" className="group flex items-baseline gap-2" aria-label="Ir al inicio">
      <span className="serif text-[28px] leading-none text-ink transition-colors group-hover:text-accent">Ciber<span className="italic">Venezuela</span></span>
      <span className="mono hidden text-[10px] uppercase tracking-[0.2em] text-muted-ink sm:inline">— UBA · 2026</span>
    </a>
  );
}

const NAV = [
  { label: "Índice", href: "#entradas" },
  { label: "Marco legal", href: "#marco-legal" },
  { label: "Impacto", href: "#impacto" },
  { label: "Casos", href: "#casos" },
  { label: "Prevención", href: "#prevencion" },
  { label: "Conclusiones", href: "#conclusiones" },
  { label: "Bibliografía", href: "#referencias" },
];

function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250,247,240,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.2)" : "none",
        borderBottom: scrolled ? "1px solid rgba(17,24,39,0.10)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Wordmark />
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="link-ink text-[13px] font-medium text-ink-2 hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <button onClick={() => setOpen(true)} className="rounded-full border border-rule bg-surface/80 p-2 text-ink shadow-soft lg:hidden" aria-label="Abrir menú">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={"fixed inset-0 z-50 transition-opacity lg:hidden " + (open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}
        style={{ background: "rgba(17,24,39,0.48)" }}
        onClick={() => setOpen(false)}
      >
        <aside
          className={"absolute right-0 top-0 h-full w-[86%] max-w-sm bg-paper shadow-deep transition-transform duration-300 " + (open ? "translate-x-0" : "translate-x-full")}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-rule p-5">
            <Wordmark />
            <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="rounded-full border border-rule p-2 text-ink">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-5">
            {NAV.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="serif flex items-baseline justify-between rounded-2xl border border-transparent px-2 py-4 text-2xl text-ink transition-colors hover:border-rule hover:bg-surface"
              >
                <span>{n.label}</span>
                <span className="mono text-[11px] text-accent">0{i + 1}</span>
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}

function Marquee() {
  const items = ["LECDI · 2001", "6 capítulos", "Universidad Bicentenaria de Aragua", "Maracay · Venezuela", "Edición 2026", "Phishing & delitos informáticos"];
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-rule bg-ink py-3 text-paper">
      <div className="marquee-track whitespace-nowrap mono text-[12px] uppercase tracking-[0.18em] text-paper-muted">
        {loop.map((t, i) => (
          <span key={`${t}-${i}`} className="inline-flex items-center gap-12">
            {t}
            <span className="text-accent-light">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-28 pb-12 md:pt-36 md:pb-20">
      <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="hero-panel relative overflow-hidden rounded-[2.8rem] px-6 py-7 text-paper shadow-deep md:px-10 md:py-10 lg:px-12">
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-paper-muted">Vol. 01 · N.º 06</div>
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-paper-muted">Mayo 2026 — Maracay, VE</div>
          </div>

          <div className="relative z-10 grid grid-cols-12 gap-x-8 gap-y-10 pt-12 md:pt-16">
            <div className="col-span-12 lg:col-span-8">
              <div className="eyebrow text-accent-light">Investigación académica</div>
              <h1 className="display mt-5 max-w-5xl text-paper" style={{ fontSize: "clamp(52px, 9.5vw, 132px)" }}>
                Phishing <em className="italic text-accent-light">en</em><br />
                Venezuela.
              </h1>
              <p className="serif mt-7 max-w-3xl text-2xl leading-[1.32] text-paper-muted md:text-[34px]">
                Una lectura crítica del delito informático más cotidiano del país: ley, impacto psicológico, patrones de engaño y prevención ciudadana.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#entradas" className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 mono text-[12px] uppercase tracking-widest text-ink transition-transform hover:-translate-y-0.5">
                  Empezar a leer <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#prevencion" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 mono text-[12px] uppercase tracking-widest text-paper transition-colors hover:bg-white/10">
                  Ver prevención
                </a>
              </div>
            </div>

            <aside className="col-span-12 lg:col-span-4">
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="eyebrow text-paper-muted">En este número</div>
                  <BookOpen className="h-5 w-5 text-accent-light" />
                </div>
                <ol className="space-y-2.5">
                  {entries.map((e) => (
                    <li key={e.num}>
                      <a href={e.sectionId ? `#${e.sectionId}` : "#entradas"} className="group flex items-baseline gap-3 rounded-2xl px-3 py-2 text-paper-muted transition-colors hover:bg-white/10 hover:text-paper">
                        <span className="mono w-7 text-[11px] text-accent-light">{e.num}</span>
                        <span className="serif text-xl leading-tight">{e.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExecutiveSummary() {
  const ref = useReveal<HTMLDivElement>();
  const cards = [
    { icon: ShieldCheck, label: "Amenaza", title: "Engaño por confianza", text: "El atacante no rompe la puerta: convence a la víctima de abrirla." },
    { icon: Scale, label: "Ley", title: "Base jurídica vigente", text: "La LECDI permite sancionar fraudes informáticos, pero necesita actualización." },
    { icon: Brain, label: "Impacto", title: "Daño emocional", text: "La pérdida económica suele venir acompañada de culpa, ansiedad y vergüenza." },
    { icon: Landmark, label: "Prevención", title: "Cultura digital", text: "La defensa más sólida combina hábitos, educación y respuesta institucional." },
  ];

  return (
    <section className="bg-paper py-10 md:py-16">
      <div ref={ref} className="fade-in-up mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {cards.map(({ icon: Icon, label, title, text }) => (
          <article key={title} className="rounded-[2rem] border border-rule bg-surface p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-8 flex items-center justify-between">
              <div className="eyebrow text-accent">{label}</div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <h3 className="serif text-3xl leading-tight text-ink">{title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedPull() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-paper py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div ref={ref} className="fade-in-up grid gap-8 rounded-[2.5rem] border border-rule bg-surface p-7 shadow-soft md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <div className="hr-dot mb-8"><span>✦</span></div>
            <blockquote className="serif text-3xl leading-[1.2] text-ink md:text-5xl">
              <span className="text-accent">“</span>
              La brecha entre nuestra adopción tecnológica y nuestra educación en seguridad digital es el verdadero anzuelo: el phishing solo viene a recogerlo.
              <span className="text-accent">”</span>
            </blockquote>
            <div className="mt-8 eyebrow">Editorial — CiberVenezuela</div>
          </div>
          <div className="rounded-[2rem] bg-ink p-6 text-paper">
            <div className="eyebrow text-accent-light">Lectura recomendada</div>
            <h3 className="serif mt-4 text-4xl leading-tight">No todo ataque parece un ataque.</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-paper-muted">
              El phishing moderno se disfraza de trámite, beneficio, urgencia bancaria o mensaje familiar. Por eso la prevención debe enfocarse en reconocer patrones, no solo errores técnicos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EntryItem({ entry, index }: { entry: Entry; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      id={entry.sectionId}
      className={"chapter fade-in-up scroll-mt-24 border-t border-rule " + (open ? "chapter-open" : "")}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="grid w-full grid-cols-12 gap-x-4 gap-y-4 px-5 py-9 text-left md:px-8 md:py-12"
      >
        <div className="col-span-2 md:col-span-1">
          <span className="chapter-num serif text-4xl text-ink-2 transition-colors md:text-5xl">{entry.num}</span>
        </div>
        <div className="col-span-10 md:col-span-8">
          <div className="eyebrow">{entry.chapter} · {entry.readTime} de lectura</div>
          <h3 className="serif mt-3 text-3xl leading-[1.05] text-ink md:text-[48px]">{entry.title}</h3>
          <p className="serif mt-3 text-lg italic text-muted-ink md:text-xl">{entry.kicker}</p>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-2 md:text-[16px]">{entry.preview}</p>
        </div>
        <div className="col-span-12 flex items-start gap-3 md:col-span-3 md:justify-end md:pt-2">
          <span className="hidden mono text-[11px] uppercase tracking-widest text-muted-ink md:inline">
            {open ? "Cerrar" : "Leer"}
          </span>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink text-ink transition-colors hover:bg-ink hover:text-paper">
            {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </span>
        </div>
      </button>

      {open && (
        <div className="grid grid-cols-12 gap-x-4 px-5 pb-14 md:px-8 md:pb-20">
          <div className="hidden md:col-span-1 md:block" />
          <div className="dropcap col-span-12 md:col-span-10 lg:col-span-8">
            {entry.render()}
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-5">
              {entry.tags.map((tag) => (
                <span key={tag} className="mono text-[11px] uppercase tracking-widest text-muted-ink">— {tag}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function IndexSection() {
  const titleRef = useReveal<HTMLDivElement>();
  return (
    <section id="entradas" className="bg-paper py-16 scroll-mt-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={titleRef} className="fade-in-up mb-14 grid grid-cols-12 items-end gap-x-4 gap-y-6">
          <div className="col-span-12 md:col-span-8">
            <div className="eyebrow text-accent">Índice de la edición</div>
            <h2 className="display mt-4 text-ink" style={{ fontSize: "clamp(46px, 8vw, 98px)" }}>
              Seis capítulos<em className="italic text-accent">.</em>
            </h2>
          </div>
          <p className="col-span-12 text-[15px] leading-relaxed text-ink-2 md:col-span-4 md:text-right">
            El primer capítulo queda abierto para facilitar la lectura. Puedes desplegar o cerrar cada sección según avances por el blog.
          </p>
        </div>

        <div className="rounded-[2.4rem] border border-rule bg-surface shadow-soft">
          {entries.map((entry, index) => (<EntryItem key={entry.num} entry={entry} index={index} />))}
        </div>
      </div>
    </section>
  );
}

function References() {
  const refs = [
    "Asamblea Nacional de Venezuela. (2001). Ley Especial contra los Delitos Informáticos. Gaceta Oficial N.º 37.313, 30 de octubre de 2001. Caracas: República Bolivariana de Venezuela.",
    "ESET Latinoamérica. (2024). ESET Security Report Latinoamérica. Reporte regional sobre amenazas informáticas y hábitos de seguridad digital.",
    "Kaspersky. (2024). Panorama de amenazas cibernéticas en América Latina. Reporte regional de ciberseguridad.",
    "Mitnick, K. & Simon, W. (2003). The Art of Deception: Controlling the Human Element of Security. Wiley Publishing.",
    "Odremán y Asociados. (2025). Delitos informáticos en Venezuela: cómo identificar y denunciar. Recurso jurídico divulgativo.",
  ];
  return (
    <ol className="divide-y divide-white/10">
      {refs.map((ref, index) => (
        <li key={ref} className="grid grid-cols-[36px_1fr] items-baseline gap-4 py-4">
          <span className="mono text-[11px] text-accent-light">[{String(index + 1).padStart(2, "0")}]</span>
          <span className="text-[14px] leading-[1.7] text-paper-muted">{ref}</span>
        </li>
      ))}
    </ol>
  );
}

function Footer() {
  return (
    <footer id="referencias" className="scroll-mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <div className="eyebrow text-accent-light">Colofón</div>
            <h3 className="serif mt-4 text-4xl text-paper md:text-6xl">CiberVenezuela <em className="italic text-accent-light">—</em> 2026</h3>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper-muted">
              Publicación académica sobre el phishing como delito informático en Venezuela. Análisis legal, psicológico y preventivo para fomentar una cultura de ciberseguridad.
            </p>
            <div className="mt-6 mono text-[11px] uppercase tracking-[0.2em] text-paper">
              Universidad Bicentenaria de Aragua · Maracay
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="eyebrow text-paper-muted">Secciones</div>
            <ul className="mt-4 space-y-3 text-[15px] text-paper-muted">
              {NAV.map((navItem) => (
                <li key={navItem.href}><a href={navItem.href} className="link-ink hover:text-paper">{navItem.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow text-paper-muted">Bibliografía</div>
            <div className="mt-4"><References /></div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-baseline md:justify-between">
          <p className="mono text-[11px] uppercase tracking-widest text-paper-muted">
            Elaborado con fines académicos · Informática · UBA 2026
          </p>
          <p className="serif text-2xl text-paper">© Ciber<em className="italic text-accent-light">Venezuela</em></p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ExecutiveSummary />
        <FeaturedPull />
        <IndexSection />
      </main>
      <Footer />
    </div>
  );
}
