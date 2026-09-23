import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUp,
  ArrowUpRight,
  Calendar,
  Github,
  Linkedin,
  Menu,
  X,
  Sun,
  Moon,
  ChevronRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import {
  SkillsMarquee,
  MagneticCursor,
  PreviewArtwork,
} from './components/PortfolioMotion';

const SpatialScene = lazy(() => import('./components/SpatialScene'));
gsap.registerPlugin(ScrollTrigger);

const booking = 'https://topmate.io/lungsom_lamnio'; // Sample destination requested in the design brief.
const roles = [
  'Software Developer',
  'Entrepreneur',
  'Systems Architect',
  'Open Source Builder',
];

const nav = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['contact', 'Contact'],
];

const jobs = [
  {
    period: 'JUNE 2025 — PRESENT',
    current: true,
    role: 'Founder & Director',
    org: 'Vernovate Pvt. Ltd.',
    location: 'Applied Systems & R&D',
    body: 'Overseeing research and development for modern software solutions, specifically focusing on smart traffic management systems.',
    tags: ['R&D', 'Smart Systems', 'Architecture', 'Python'],
  },
  {
    period: 'JULY 2026 — AUG 2026',
    current: false,
    role: 'Software Developer Intern',
    org: 'Oari Collab Private Limited',
    location: 'Software Engineering',
    body: 'Collaborating with cross-functional teams to build and optimize scalable modern software applications, enhancing clean code architectures.',
    tags: ['React', 'MYSQL', 'Clean Architecture', 'Scalability'],
  },
  {
    period: 'JULY 2025 — SEPT 2025',
    current: false,
    role: 'Full Stack Web Developer Intern',
    org: 'UptoSkills',
    location: 'Web Development',
    body: 'Developed a scalable platform for human resource management, streamlining workflows and automating staff processes.',
    tags: ['Full Stack', 'Workflow Automation', 'Web Apps'],
  },
  {
    period: 'FEB 2025 — MAR 2025',
    current: false,
    role: 'Full Stack Web Developer Intern',
    org: 'CodeSpirit',
    location: 'Web Engineering',
    body: 'Built a web platform providing centralized updates for national and international hackathons, integrating notifications and event tracking.',
    tags: ['Full Stack', 'Hackathons', 'Event Systems', 'Web'],
  },
];

const projects = [
  {
    id: 'lungsom-studio',
    title: 'Lungsom Studio',
    subtitle: 'WEB DESIGN · DEVELOPMENT · DIGITAL STUDIO',
    summary: 'An independent digital studio building thoughtful websites and apps.',
    tech: ['Web Design', 'Development'],
    category: 'Digital studio',
    year: '2026',
    url: 'https://lungsomstudio.vercel.app/',
  },
  {
    id: 'resume-forge',
    title: 'ResumeForge',
    subtitle: 'REACT 19 · VITE · TYPESCRIPT · CLIENT-SIDE',
    summary: 'A private resume builder that keeps personal information in the browser.',
    tech: ['React 19', 'Vite'],
    category: 'Product engineering',
    year: '2025',
    url: 'https://resume-forge-lyart.vercel.app/',
  },
  {
    id: 'itms-ai',
    title: 'Intelligent Traffic Management',
    subtitle: 'PYTHON · GRAPH NEURAL NETWORKS · PPO · GOOGLE MAPS',
    summary: 'Applied graph learning and reinforcement learning for adaptive traffic optimization.',
    tech: ['Python', 'GNN', 'PPO'],
    category: 'Applied AI',
    year: '2024',
    url: 'https://github.com/TechWithLungsom/Intelligent-_Traffic_Management_System',
  },
];

function SectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {note && <span>{note}</span>}
      <i className="section-rule" aria-hidden="true" />
    </div>
  );
}

function Socials() {
  return (
    <div className="social-icons">
      {[
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/lungsom-lamnio-339914282/',
          icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 2h18a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm3.5 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM5 9v10h3V9H5Zm5 0v10h3v-5.5c0-2.7 4-2.9 4 0V19h3v-6.3c0-5-5.1-4.8-7-2.7V9h-3Z"
              />
            </svg>
          ),
        },
        { name: 'GitHub', url: 'https://github.com/TechWithLungsom', icon: <Github size={18} /> },
        { name: 'X', url: 'https://x.com/lungsom_lamnio', icon: <span>𝕏</span> },
        {
          name: 'LeetCode',
          url: 'https://leetcode.com/u/Lungsom/',
          icon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 3-9.5 9.5a4 4 0 0 0 0 5.7l2.3 2.3a4 4 0 0 0 5.7 0l2-2M8 10l2-2a4 4 0 0 1 5.7 0l2 2M10 15h11" />
            </svg>
          ),
        },
      ].map((s) => (
        <a
          href={s.url}
          target="_blank"
          rel="noreferrer"
          key={s.name}
          aria-label={s.name}
        >
          <span className="social-tooltip">{s.name}</span>
          {s.icon}
        </a>
      ))}
    </div>
  );
}

function PortraitBadge() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`portrait-badge ${flipped ? 'flipped' : ''}`}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setFlipped(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setFlipped(false);
      }}
    >
      <div className="portrait-inner">
        <button
          className="portrait-front"
          onClick={() => setFlipped(true)}
          onFocus={() => setFlipped(true)}
          aria-label="Flip portrait to schedule a chat"
          tabIndex={flipped ? -1 : 0}
        >
          <img
            src="/portrait.png"
            alt="Pixel-art portrait of Lungsom Lamnio"
            width="1032"
            height="966"
          />
        </button>
        <a
          className="portrait-back"
          href={booking}
          target="_blank"
          rel="noreferrer"
          aria-label="Schedule a chat on Topmate"
          tabIndex={flipped ? 0 : -1}
          onBlur={() => setFlipped(false)}
        >
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path
                id="booking-circle"
                d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
              />
            </defs>
            <text>
              <textPath href="#booking-circle" textLength="450">
                SCHEDULE A CHAT · SCHEDULE A CHAT ·{' '}
              </textPath>
            </text>
          </svg>
          <ArrowUpRight size={54} strokeWidth={1} />
        </a>
      </div>
    </div>
  );
}

function AboutTyping() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const text =
    'I turn complex ideas into useful systems. From high-level architecture to the smallest interface detail — I build with purpose, and lead with curiosity.';

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.typed-word');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 78%',
          end: 'bottom 28%',
          scrub: 0.7,
        },
      });
      words.forEach((word, i) => {
        tl.fromTo(word, { y: 6 }, { y: 0, duration: 0.8, ease: 'sine.inOut' }, i);
        tl.fromTo(
          word,
          { opacity: 0.23 },
          { opacity: 1, duration: 0.75, ease: 'sine.inOut' },
          i + 0.15
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <p className="about-typing" ref={ref} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span className="typed-word" key={i} aria-hidden="true">
          {word + ' '}
        </span>
      ))}
    </p>
  );
}

function SocialDock() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const slot = document.querySelector('.social-anchor');
      if (!slot || !ref.current) return;
      const rect = slot.getBoundingClientRect();
      const top = Math.min(rect.top + scrollY + scrollY * 0.65, innerHeight - 96);
      ref.current.style.top = `${top}px`;
      ref.current.classList.toggle('is-docked', scrollY > 80);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <aside ref={ref} className="floating-socials" aria-label="Social profiles">
      <Socials />
    </aside>
  );
}

function ProjectList() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="project-list">
      {projects.map((p, i) => (
        <article
          key={p.id}
          className={`work-row ${active === p.id ? 'preview-active' : ''}`}
          onPointerEnter={() => setActive(p.id)}
          onPointerLeave={() => setActive(null)}
          onFocus={() => setActive(p.id)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setActive(null);
          }}
        >
          <span className="work-number">0{i + 1}</span>
          <a className="work-title" href={p.url} target="_blank" rel="noreferrer">
            <h3>{p.title}</h3>
            <span>{p.subtitle}</span>
          </a>
          <time>{p.year}</time>
          <a
            className="work-arrow"
            href={p.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${p.title}`}
          >
            <ArrowUpRight size={26} />
          </a>
          <AnimatePresence>
            {active === p.id && (
              <motion.a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${p.title} preview`}
                className="work-preview"
                initial={{ opacity: 0, y: 15, scale: 0.94, rotate: -3 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <PreviewArtwork project={p} />
              </motion.a>
            )}
          </AnimatePresence>
        </article>
      ))}
    </div>
  );
}

export default function App({ ready = true }: { ready?: boolean }) {
  useSmoothScroll();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false),
    [menu, setMenu] = useState(false),
    [active, setActive] = useState(''),
    [role, setRole] = useState(0),
    [light, setLight] = useState(false);

  useEffect(() => {
    try {
      setLight(localStorage.getItem('portfolio-theme') === 'light');
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    try {
      localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
    } catch {}
  }, [light]);

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 70);
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -55% 0px' }
    );

    document.querySelectorAll('section[id]').forEach((e) => observer.observe(e));

    return () => {
      window.removeEventListener('scroll', scroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => setRole((r) => (r + 1) % roles.length), 3300);
    return () => clearInterval(interval);
  }, [reduced]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.to(
          '.hero-introduction,.portrait-badge,.sliding-name,.hero-spatial-layer',
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom 25%',
              scrub: true,
            },
          }
        );

        gsap.utils.toArray<HTMLElement>('.section-rule').forEach((el) =>
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.4,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        );

        gsap.utils.toArray<HTMLElement>('.section-title h2').forEach((el) =>
          gsap.from(el, {
            opacity: 0,
            y: 25,
            duration: 0.8,
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          })
        );

        gsap.fromTo(
          '.timeline-progress',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.career-timeline',
              start: 'top 60%',
              end: 'bottom 65%',
              scrub: true,
            },
          }
        );
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="portfolio-v3">
      <a className="skip-link" href="#about">
        Skip to content
      </a>

      <header className={`floating-header ${scrolled ? 'is-scrolled' : ''}`}>
        <nav aria-label="Main navigation">
          <div className="nav-group nav-left">
            {nav.slice(0, 3).map(([id, label]) => (
              <a className={active === id ? 'active' : ''} href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </div>

          <a href="#hero" className="nav-monogram" aria-label="Lungsom Lamnio home">
            LL
          </a>

          <div className="nav-group nav-right">
            {nav.slice(3).map(([id, label]) => (
              <a className={active === id ? 'active' : ''} href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </div>

          <button
            className="theme-control"
            onClick={() => setLight((v) => !v)}
            aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {light ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          <button
            className="menu-control"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-label="Toggle navigation"
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menu && (
          <div className="mobile-navigation">
            {nav.map(([id, label]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="hero" className="portrait-hero">
          <div className="hero-spatial-layer">
            <Suspense fallback={null}>
              <SpatialScene index={role} ready={ready} />
            </Suspense>
          </div>

          <div className="hero-introduction">
            <h1>
              Hi, I’m <strong>Lungsom Lamnio.</strong>
            </h1>
            <div className="role-cycler">
              <AnimatePresence mode="wait">
                <motion.span
                  key={role}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  {roles[role]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="sliding-name" aria-hidden="true">
            <div>
              {[0, 1].map((n) => (
                <span key={n}>LUNGSOM LAMNIO&nbsp;—&nbsp;</span>
              ))}
            </div>
          </div>

          <PortraitBadge />
          <div className="social-anchor" />
        </section>

        <section id="about" className="section-wrap">
          <SectionTitle title="ABOUT" note="WHO I AM" />
          <AboutTyping />

          <div className="about-bottom">
            <div className="about-prose">
              <p>
                I’m a Computer Science & Engineering student, Founder and Director of Vernovate Private Limited, and a competitive hackathon winner.
              </p>
              <p>
                My focus is on turning complex challenges into scalable, production-ready systems. I care deeply about architecture that is resilient, performant, and purposeful to the people using it.
              </p>
              <p>
                Beyond engineering, I lead technical initiatives, build developer communities, and mentor emerging builders to create impactful technology together.
              </p>
            </div>

            <div className="about-console">
              <div className="console-top">
                <span>● ● ●</span>
                <span>about/lungsom</span>
              </div>
              <div className="console-lines">
                <p>
                  <span>const</span> engineer = {'{'}
                </p>
                <p>
                  &nbsp;&nbsp;curiosity: <em>"always on"</em>,
                </p>
                <p>
                  &nbsp;&nbsp;focus: [<em>"Entrepreneurship"</em>, <em>"scalable software"</em>],
                </p>
                <p>
                  &nbsp;&nbsp;approach: <em>"build, learn, repeat"</em>,
                </p>
                <p>
                  &nbsp;&nbsp;drive: <em>"relentless problem-solving"</em>
                </p>
                <p>{'};'}</p>
              </div>
              <div className="console-bottom">
                <i /> Open to thoughtful collaborations
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section-wrap">
          <SectionTitle title="EXPERIENCE" />
          <div className="career-timeline">
            <div className="timeline-progress" />
            {jobs.map((job, i) => (
              <article className="career-row" key={job.role}>
                <div className="career-date">
                  <span>{job.period}</span>
                  {job.current && (
                    <b>
                      <i /> CURRENT
                    </b>
                  )}
                </div>
                <div className="career-detail">
                  <span className="career-index">0{i + 1}</span>
                  <h3>{job.role}</h3>
                  <div className="career-org">
                    @ {job.org} <span>· {job.location}</span>
                  </div>
                  <p>{job.body}</p>
                  <div className="tech-chips">
                    {job.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-wrap">
          <SectionTitle
            title="SKILLS"
            note="TOOLS I BUILD WITH · HOVER OR FOCUS TO PAUSE"
          />
          <SkillsMarquee />
        </section>

        <section id="projects" className="section-wrap">
          <SectionTitle title="PROJECTS" note="SELECTED WORK — HOVER TO PREVIEW" />
          <ProjectList />
        </section>

        <section id="contact" className="contact-section">
          <span className="contact-label">CONTACT</span>
          <h2>
            LET’S BUILD
            <br />
            <span className="outlined">SOMETHING</span>
            <br />
            <span className="accent">GREAT.</span>
          </h2>
          <p>
            Have a project in mind, a role to fill, or just want
            <br className="desktop-break" /> to talk shop? My inbox is always open.
          </p>
          <a className="contact-cta" href={booking} target="_blank" rel="noreferrer">
            <Calendar size={17} /> SCHEDULE A CHAT <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      <footer className="minimal-footer">
        <div>
          <span className="footer-mark">◎</span> Lungsom Lamnio{' '}
          <small>{new Date().getFullYear()}</small>
          <p>TURNING IDEAS INTO REALITY.</p>
        </div>
        <a href="#hero" aria-label="Back to top">
          <ArrowUp size={18} />
        </a>
      </footer>

      <SocialDock />
      <MagneticCursor />
    </div>
  );
}