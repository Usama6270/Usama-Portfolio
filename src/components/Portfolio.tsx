import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  Code2,
  Brain,
  Database,
  Cpu,
  Sparkles,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Sun,
  Moon,
  MapPin,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const SKILLS = {
  Frontend: ["React", "React Native", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  "AI / ML": ["Python", "TensorFlow", "CNN", "NLP", "Deep Learning", "Generative AI"],
  "Database & Tools": ["MongoDB", "SQL", "Git", "GitHub", "Postman", "Docker", "AWS"],
} as const;

const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: Code2,
  Backend: Cpu,
  "AI / ML": Brain,
  "Database & Tools": Database,
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  category: "Full Stack" | "AI / ML" | "Web";
  github: string;
};

const PROJECTS: Project[] = [
  {
    title: "HomeEase — AI Smart Home Services",
    description:
      "Full-stack mobile & web platform for real-time service booking with an AI chatbot and sentiment analysis for review intelligence.",
    tech: ["React Native", "Node.js", "MongoDB", "NLP"],
    category: "Full Stack",
    github: "https://github.com/Usama6270",
  },
  {
    title: "Sign Language Digit Recognition",
    description:
      "CNN-based deep learning model achieving 97.82% accuracy classifying sign-language digits from image input.",
    tech: ["Python", "TensorFlow", "CNN"],
    category: "AI / ML",
    github: "https://github.com/Usama6270",
  },
  {
    title: "Movie Genre Detection",
    description:
      "Deep learning movie genre classifier using ResNet50 with semi-supervised learning for richer feature representation.",
    tech: ["Python", "ResNet50", "Deep Learning"],
    category: "AI / ML",
    github: "https://github.com/Usama6270",
  },
  {
    title: "Dry Fruit Admin Panel",
    description:
      "MERN admin dashboard for managing inventory, products, users and live sales analytics with a clean ops UI.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    github: "https://github.com/Usama6270",
  },
  {
    title: "Weather Web App",
    description:
      "Real-time weather application using the OpenWeather API plus a small chatbot integration for natural queries.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Web",
    github: "https://github.com/Usama6270",
  },
];

const STATS = [
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 97, suffix: "%", label: "Model Accuracy" },
  { value: 3, suffix: "mo", label: "Internship" },
];

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

function useCounter(target: number, run: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

function Navbar({ theme, toggle }: { theme: string; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            UJ
          </span>
          <span className="hidden sm:inline text-foreground/90">usama.dev</span>
        </a>
        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex transition-all",
            scrolled ? "glass shadow-card" : "",
          )}
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggle}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button asChild size="sm" className="rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
            <a href="#contact">
              Hire Me <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-primary opacity-20 blur-3xl animate-glow" />
      <div className="mx-auto max-w-5xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-mono text-muted-foreground animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for opportunities
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl animate-fade-up">
          <span className="text-gradient">Usama Jamshed</span>
        </h1>
        <p
          className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-foreground/90">Full Stack MERN Developer</span>
          <span className="mx-2 text-primary">·</span>
          <span className="text-foreground/90">AI / ML Enthusiast</span>
        </p>
        <p
          className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Passionate Software Engineering student skilled in MERN stack, AI/ML, UI/UX design, and
          scalable web development — building intelligent, user-friendly products end to end.
        </p>
        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button asChild size="lg" className="rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
            <a href="#projects">
              View Projects <ArrowRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full glass">
            <a href="/cv.pdf" download>
              <Download /> Download CV
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full">
            <a href="#contact">
              <Mail /> Contact Me
            </a>
          </Button>
        </div>
        <div
          className="mt-10 flex items-center justify-center gap-5 text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a aria-label="GitHub" href="https://github.com/Usama6270" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            <Github className="h-5 w-5" />
          </a>
          <a aria-label="LinkedIn" href="https://www.linkedin.com/in/usama-jamshed-a9a223264/" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            <Linkedin className="h-5 w-5" />
          </a>
          <a aria-label="Email" href="mailto:i222499@nu.edu.pk" className="transition-colors hover:text-foreground">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function useInView<T extends Element>(threshold = 0.2) {
  const [ref, setRef] = useState<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return { ref: setRef, inView };
}

function StatItem({ value, suffix, label, run }: { value: number; suffix: string; label: string; run: boolean }) {
  const v = useCounter(value, run);
  return (
    <div className="rounded-2xl glass p-5 text-center hover-lift">
      <div className="font-display text-3xl font-bold md:text-4xl">
        <span className="text-gradient">{v}{suffix}</span>
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-4 md:grid-cols-4">
      {STATS.map((s) => (
        <StatItem key={s.label} {...s} run={inView} />
      ))}
    </div>
  );
}

function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <div className="mb-3 inline-block rounded-full border border-border glass px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
        {kicker}
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="01 // About" title="Engineer building at the edge of AI" />
        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl glass p-8 shadow-card">
            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
              I'm a Software Engineering student at{" "}
              <span className="text-gradient font-semibold">FAST National University</span> with
              hands-on experience across the <span className="text-foreground">MERN stack</span>,{" "}
              <span className="text-foreground">AI/ML</span>, <span className="text-foreground">NLP</span> and{" "}
              <span className="text-foreground">DevOps</span>.
            </p>
            <p className="mt-4 text-muted-foreground">
              I love crafting intelligent, user-friendly applications — from real-time MERN platforms
              to deep-learning models — and have a strong interest in full-stack engineering paired
              with AI-powered systems that ship to real users.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["MERN", "AI / ML", "NLP", "DevOps", "UI / UX"].map((t) => (
                <span key={t} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 grid gap-3">
            {[
              { icon: Sparkles, title: "Intelligent UX", text: "AI-augmented features that feel native, not bolted on." },
              { icon: Code2, title: "End to End", text: "From schema → API → UI → deploy, owning the full stack." },
              { icon: Brain, title: "ML Mindset", text: "Comfortable with CNNs, NLP and modern generative tooling." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl glass p-5 hover-lift">
                <c.icon className="h-5 w-5 text-primary" />
                <div className="mt-2 font-semibold">{c.title}</div>
                <div className="text-sm text-muted-foreground">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <Stats />
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="02 // Skills" title="A polyglot toolkit" subtitle="The technologies I reach for to ship products quickly and reliably." />
        <div className="grid gap-5 md:grid-cols-2">
          {Object.entries(SKILLS).map(([cat, items]) => {
            const Icon = SKILL_ICONS[cat] ?? Code2;
            return (
              <div key={cat} className="group rounded-2xl glass p-6 hover-lift">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{cat}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-mono text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const cats = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))], []);
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="03 // Projects" title="Selected work" subtitle="A mix of full-stack platforms and applied deep-learning experiments." />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-mono transition-all",
                active === c
                  ? "border-transparent bg-gradient-primary text-primary-foreground shadow-glow"
                  : "border-border bg-muted/30 text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <article
              key={p.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl glass p-6 hover-lift"
              style={{ animation: `fade-up 0.6s ${i * 0.05}s both` }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {p.category}
                </span>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub repo"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
              <h3 className="font-display text-lg font-semibold leading-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-mono text-primary">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href={p.github} target="_blank" rel="noreferrer">
                    <Github /> Code
                  </a>
                </Button>
                <Button asChild size="sm" variant="ghost" className="rounded-full">
                  <a href={p.github} target="_blank" rel="noreferrer">
                    Details <ExternalLink />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContributionGrid() {
  const cells = useMemo(
    () => Array.from({ length: 7 * 26 }, () => Math.floor(Math.random() * 5)),
    [],
  );
  const intensity = ["bg-muted/40", "bg-primary/15", "bg-primary/35", "bg-primary/60", "bg-primary"];
  return (
    <div className="rounded-2xl glass p-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Contribution activity
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          Less
          {intensity.map((c, i) => (
            <span key={i} className={cn("h-2.5 w-2.5 rounded-sm", c)} />
          ))}
          More
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-hidden">
        {cells.map((v, i) => (
          <span key={i} className={cn("h-3 w-3 rounded-sm", intensity[v])} />
        ))}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="04 // Journey" title="Experience & Education" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl glass p-6 hover-lift">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Briefcase className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-lg font-semibold">Web Development Intern</div>
                <div className="text-sm text-muted-foreground">InternBoot · 3 months</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Built responsive web applications, integrated frontend with backend services, and
              shipped features collaboratively using modern Git workflows.
            </p>
          </div>
          <div className="rounded-2xl glass p-6 hover-lift">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-lg font-semibold">BS Software Engineering</div>
                <div className="text-sm text-muted-foreground">
                  FAST National University of Computer & Emerging Sciences · 2022 – Present
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Coursework spanning algorithms, distributed systems, machine learning and
              human-computer interaction, alongside applied projects.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <ContributionGrid />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="relative overflow-hidden rounded-3xl glass p-10 text-center shadow-card md:p-14">
          <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
          <div className="mb-3 inline-block rounded-full border border-border glass px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
            05 // Contact
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Let's <span className="text-gradient">build</span> something great.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Open to internships, full-time roles and collaborative projects in MERN, AI/ML and
            product engineering.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              <a href="mailto:i222499@nu.edu.pk">
                <Mail /> i222499@nu.edu.pk
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full glass">
              <a href="https://github.com/Usama6270" target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full glass">
              <a href="https://www.linkedin.com/in/usama-jamshed-a9a223264/" target="_blank" rel="noreferrer">
                <Linkedin /> LinkedIn
              </a>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Pakistan · Remote-friendly
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground md:flex-row">
        <div className="font-mono">© {new Date().getFullYear()} Usama Jamshed</div>
        <div className="font-mono text-xs">Designed & built with React + Tailwind</div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-screen">
      <Navbar theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
