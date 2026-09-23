import { connections, SpatialHero, ScheduleBadge, SkillsMarquee, ProjectRows, SocialDock, ThemeToggle, HashnodeCard, MagneticCursor, useEditorialMotion, AboutManifesto } from './components/PortfolioMotion';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Modal } from './components/Modal';
import { 
  Terminal, 
  Code2, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Copy, 
  Check, 
  Calendar, 
  Sparkles, 
  Layers, 
  Cpu, 
  Globe, 
  ArrowUpRight, 
  ChevronRight, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Flame, 
  Award, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  Server, 
  Database,
  ArrowUp,
  Clock,
  Send,
  Sliders
} from 'lucide-react';

// Lightweight Web Audio API synthesizer for tactile micro-haptic clicks
class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  constructor() {
    // Initialized lazily on first user gesture
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playPop() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio fallback silent
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.05, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.2);
      });
    } catch {
      // Audio fallback silent
    }
  }
}

const audioFX = new SoundManager();

const HERO_TITLES = [
  "Chief Technical Officer (R&D)",
  "Forward-Deployed Systems Engineer",
  "GDGoC Technical Community Lead",
  "Reinforcement Learning & GNN Builder"
];

const METRICS_DATA = [
  {
    icon: Flame,
    value: "200+",
    label: "LeetCode Solved",
    detail: "Consistent algorithmic contest streak & data structures proficiency."
  },
  {
    icon: Award,
    value: "₹5 Lakhs",
    label: "R&D Grant Procured",
    detail: "Awarded research funding for groundbreaking system prototyping."
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Private Client-Side Tech",
    detail: "Zero telemetry, browser-local compute architectures like ResumeForge."
  },
  {
    icon: Compass,
    value: "GDGoC",
    label: "Community Leadership",
    detail: "Workshops, HackStone hackathons & cloud build-stations through GDGoC."
  }
];

const EXPERIENCES = [
 {role:"Chief Technical Officer (R&D)",company:"Vernovate Pvt. Ltd.",period:"CURRENT",location:"Applied Research & Development",status:"Leadership",description:"Leading applied R&D initiatives and translating research into useful software and systems.",achievements:["Procured a ₹5 Lakhs research grant.","Directing technical research and engineering delivery."],tags:["R&D","Technical Strategy","Systems Engineering"]},
 {role:"Technical Lead",company:"GDGoC AdtU",period:"CURRENT",location:"Developer Community",status:"Community",description:"Connecting students and developers through hands-on engineering, hackathons, workshops, and cloud bootcamps.",achievements:["Directing HackStone and technical workshops.","Supporting developer learning through cloud and engineering bootcamps."],tags:["GDGoC","HackStone","Cloud","Mentorship"]},
 {role:"Computer Science & Engineering",company:"Student & Builder",period:"ONGOING",location:"Learning through building",status:"Foundation",description:"Building a strong algorithmic core alongside hands-on product engineering.",achievements:["Solved 200+ LeetCode problems.","Exploring client-side software and applied reinforcement learning."],tags:["Algorithms","Java","Python","TypeScript"]}
];

const SKILL_CATEGORIES = [
  { id: "all", label: "All Proficiencies" },
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend & Spatial" },
  { id: "backend", label: "Backend & Systems" },
  { id: "devops", label: "DevOps & Cloud" }
];

const SKILLS = [
  { name: "TypeScript", category: "languages", level: "Expert", years: "3+ Yrs", icon: Code2, highlight: true },
  { name: "Python", category: "languages", level: "Advanced", years: "3+ Yrs", icon: Cpu, highlight: true },
  { name: "JavaScript (ESNext)", category: "languages", level: "Expert", years: "4+ Yrs", icon: Code2, highlight: false },
  { name: "Java", category: "languages", level: "Advanced", years: "3+ Yrs", icon: Terminal, highlight: false },
  { name: "C++", category: "languages", level: "Proficient", years: "2+ Yrs", icon: Sliders, highlight: false },
  { name: "SQL", category: "languages", level: "Advanced", years: "3+ Yrs", icon: Database, highlight: false },
  
  { name: "React 19 & Next.js", category: "frontend", level: "Mastery", years: "4+ Yrs", icon: Globe, highlight: true },
  { name: "Tailwind CSS", category: "frontend", level: "Expert", years: "3+ Yrs", icon: Sparkles, highlight: true },
  { name: "Framer Motion & GSAP", category: "frontend", level: "Advanced", years: "2+ Yrs", icon: Layers, highlight: true },
  { name: "Jetpack Compose", category: "frontend", level: "Proficient", years: "1+ Yr", icon: Globe, highlight: false },
  { name: "Three.js / WebGL", category: "frontend", level: "Intermediate", years: "1+ Yr", icon: Compass, highlight: false },
  { name: "Vite / Turbopack", category: "frontend", level: "Expert", years: "3+ Yrs", icon: Cpu, highlight: false },

  { name: "Node.js & Express", category: "backend", level: "Expert", years: "3+ Yrs", icon: Server, highlight: true },
  { name: "MongoDB", category: "backend", level: "Advanced", years: "3+ Yrs", icon: Database, highlight: true },
  { name: "MySQL / PostgreSQL", category: "backend", level: "Advanced", years: "3+ Yrs", icon: Database, highlight: false },
  { name: "Redis Caching", category: "backend", level: "Proficient", years: "2+ Yrs", icon: Cpu, highlight: false },
  { name: "Graph Neural Networks (GNN)", category: "backend", level: "Applied", years: "1+ Yr", icon: Sparkles, highlight: true },
  { name: "REST & GraphQL APIs", category: "backend", level: "Expert", years: "3+ Yrs", icon: Server, highlight: false },

  { name: "Docker & Containerization", category: "devops", level: "Advanced", years: "2+ Yrs", icon: Layers, highlight: true },
  { name: "Kubernetes (K8s)", category: "devops", level: "Intermediate", years: "1+ Yr", icon: Compass, highlight: false },
  { name: "Amazon Web Services (AWS)", category: "devops", level: "Proficient", years: "2+ Yrs", icon: Globe, highlight: true },
  { name: "Git & CI/CD Pipelines", category: "devops", level: "Expert", years: "4+ Yrs", icon: ShieldCheck, highlight: false },
  { name: "Linux Administration", category: "devops", level: "Advanced", years: "3+ Yrs", icon: Terminal, highlight: false }
];

const PROJECTS = [
  {
    id: "resume-forge",
    title: "ResumeForge",
    subtitle: "Zero-Telemetry, Client-Side Resume Engine",
    year: "2024",
    featured: true,
    category: "Full Stack & Privacy",
    summary: "A production-grade, 100% private, client-side resume builder engineered using React 19, Vite, and Tailwind CSS. Eliminates server database data leakage through local-first persistence.",
    metrics: "React 19 • Vite • 100% Client-Side",
    description: "Designed for engineers and privacy-conscious professionals who refuse to submit sensitive personal career data to cloud servers. Built with fine-tuned PDF generation rendering engines, reactive real-time typography styling, ATS-compliant parsing tests, and dynamic JSON schema import/export.",
    architecture: [
      "Engineered with React 19 concurrent features and Vite build pipeline for sub-millisecond hot-updates.",
      "Custom print styles & Canvas vector pipelines that preserve ultra-crisp vector typography in generated PDFs.",
      "Zero backend dependencies; local IndexedDB transactional storage with zero telemetry leakage."
    ],
    tech: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "IndexedDB", "Web Workers"],
    github: "https://github.com",
    demo: "#",
    highlights: ["100% Privacy Compliant", "ATS Optimization", "Real-Time Vector Preview"]
  },
  {
    id: "itms-ai",
    title: "Intelligent Traffic Management System (ITMS)",
    subtitle: "Autonomous Transit Optimization via GNN & PPO",
    year: "2024",
    featured: true,
    category: "AI & Graph Systems",
    summary: "Next-gen urban traffic optimization combining Graph Neural Networks (GNN) and Proximal Policy Optimization (PPO) reinforcement learning integrated with Google Maps APIs.",
    metrics: "Graph Neural Networks • PPO Reinforcement Learning",
    description: "Modern cities face extreme bottleneck latency due to static signal schedules. ITMS transforms roadway intersections into dynamic graph nodes, learning macroscopic traffic flow vectors through deep reinforcement learning to dynamically modulate phase timing in real time.",
    architecture: [
      "Built multi-agent PPO reinforcement loop evaluating traffic volume, average queue length, and pedestrian flow.",
      "Graph Neural Network (PyTorch Geometric) topology modeling spatial dependencies across consecutive intersection grids.",
      "Integrated Google Maps Traffic Layer and simulation bridge via SUMO (Simulation of Urban MObility)."
    ],
    tech: ["Python", "PyTorch Geometric", "PPO RL", "Google Maps API", "FastAPI", "Docker"],
    github: "https://github.com",
    demo: "#",
    highlights: ["Graph Neural Networks", "Reinforcement Learning", "SUMO Simulation Engine"]
  },
  {
    id: "algorithmic-core",
    title: "Algorithmic Engine & Problem Solving Platform",
    subtitle: "200+ LeetCode & Competitive Core",
    year: "2023 — 2024",
    featured: false,
    category: "Algorithms & Systems",
    summary: "Modular computational engine with benchmarks across dynamic programming, graph traversals, and concurrent multithreading implementations in Java and Python.",
    metrics: "200+ Solutions • Optimized Time Complexity O(N log N)",
    description: "A continuous laboratory for high-performance computing patterns, cache-conscious data structures, and competitive contest problem architectures.",
    architecture: [
      "Extensive benchmarked implementations of Trie, Segment Trees, Disjoint Set Union (DSU), and shortest path algorithms.",
      "Automated unit testing suite validating boundary conditions against large datasets."
    ],
    tech: ["Java", "Python", "Data Structures", "Unit Testing", "Algorithms"],
    github: "https://github.com",
    demo: "#",
    highlights: ["Contest Ranked", "Memory Optimization", "Graph Algorithms"]
  }
];

const ARTICLES = [
  {
    title: "Architecting Zero-Knowledge Client-Side Web Apps with React 19",
    date: "November 2024",
    readTime: "6 min read",
    tag: "Architecture & Privacy",
    summary: "Why local-first software is the future of client-facing utility apps, detailing offline state persistence, Web Workers vector generation, and zero data leakage.",
    link: "#"
  },
  {
    title: "Reinforcement Learning & GNNs for Real-Time Traffic Flow Optimization",
    date: "September 2024",
    readTime: "9 min read",
    tag: "Deep Tech & AI",
    summary: "A deep dive into representing urban road networks as spatial graph nodes and utilizing Proximal Policy Optimization (PPO) to eliminate intersection gridlock.",
    link: "#"
  },
  {
    title: "From Campus to Scale: Leading GDGoC and High-Impact Hackathons",
    date: "June 2024",
    readTime: "5 min read",
    tag: "Leadership & Community",
    summary: "Lessons learned directing HackStone, mentoring campus developers, and fostering a community obsessed with building production-grade software.",
    link: "#"
  }
];

export default function App() {
  useSmoothScroll();
  useEditorialMotion();
  const [activeSection, setActiveSection] = useState('hero');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<null | typeof PROJECTS[0]>(null);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const openScheduler = () => { if(connections.booking) window.open(connections.booking, '_blank', 'noopener,noreferrer'); else setSchedulerModalOpen(true); };
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([
    "System ready. Welcome to Lungsom's Command Center.",
    "Type 'help' to inspect available console diagnostics."
  ]);
  const [titleIndex, setTitleIndex] = useState(0);

  // Dynamic cycling of hero engineering roles
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Update audio manager state
  useEffect(() => {
    audioFX.enabled = soundEnabled;
  }, [soundEnabled]);

  // ScrollSpy observer
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'writing', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [copyError, setCopyError] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<null | typeof ARTICLES[0]>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => () => { if(copyTimer.current) clearTimeout(copyTimer.current); }, []);
  useEffect(() => { const el=logRef.current; if(el) el.scrollTop=el.scrollHeight; }, [terminalOutput]);
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@example.com');
      audioFX.playSuccess(); setCopiedEmail(true); setCopyError(false);
      if(copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current=setTimeout(()=>setCopiedEmail(false),3000);
    } catch { setCopyError(true); }
  };

  const scrollTo = (id: string) => {
    audioFX.playPop();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  };

  const filteredSkills = useMemo(() => {
    if (activeSkillCategory === 'all') return SKILLS;
    return SKILLS.filter(s => s.category === activeSkillCategory);
  }, [activeSkillCategory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    audioFX.playPop();
    const cmd = terminalInput.trim().toLowerCase();
    let response = "";

    switch (cmd) {
      case 'help':
        response = "Available: 'grant', 'cto', 'skills', 'contact', 'clear', 'exit'";
        break;
      case 'grant':
        response = "Procured ₹5 Lakhs research grant for R&D systems engineering at Vernovate.";
        break;
      case 'cto':
        response = "Serving as Chief Technical Officer (R&D) @ Vernovate Pvt. Ltd. Leading applied systems.";
        break;
      case 'skills':
        response = "Primary: React 19, TypeScript, Python, PyTorch GNN, Docker, Node.js, AWS.";
        break;
      case 'contact':
        response = "Email: hello@example.com | Social links: demo destinations";
        break;
      case 'exit':
        setTerminalOutput(['Session ended. Type help to start again.']);
        setTerminalInput('');
        return;
      case 'clear':
        setTerminalOutput(["Console cleared."]);
        setTerminalInput('');
        return;
      default:
        response = `Command '${cmd}' not recognized. Enter 'help' for guidance.`;
    }

    setTerminalOutput(prev => [...prev.slice(-98), `> ${terminalInput}`, response]);
    setTerminalInput('');
  };

  return (
    <div className="portfolio-reference relative min-h-screen bg-[#060709] text-gray-100 selection:bg-amber-400 selection:text-black font-sans antialiased overflow-x-hidden">
      
      {/* Dynamic Background Noise Texture & Ambient Glow Spots */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-600/5 blur-[140px] pointer-events-none z-0" />

      {/* Floating Spatial Header / Navbar */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <nav className="flex items-center justify-between w-full max-w-6xl px-4 py-2.5 rounded-full bg-[#0d0f14]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
          
          {/* Brand Logo & Pulsing Indicator */}
          <div className="flex items-center gap-3 pl-2">
            <button 
              onClick={() => scrollTo('hero')} 
              className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-white hover:text-amber-400 transition-colors"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-black font-extrabold text-xs shadow-md shadow-amber-500/20">
                LL
              </span>
              <span className="hidden sm:inline-block">lungsom.dev</span>
            </button>

            {/* Consulting Badge */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Available for Advisory
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.04]">
            {[
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'writing', label: 'Writing' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-amber-400 shadow-sm border border-white/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            <ThemeToggle/>
            {/* Audio Toggle Button */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) audioFX.playPop();
              }}
              aria-label="Toggle auditory clicks" aria-pressed={soundEnabled}
              title={soundEnabled ? "Mute interactive audio feedback" : "Enable interactive audio feedback"}
              className={`p-2 rounded-full transition-colors border ${
                soundEnabled 
                  ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' 
                  : 'bg-white/[0.04] text-gray-500 border-white/[0.06] hover:text-gray-300'
              }`}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Schedule CTA */}
            <button
              onClick={() => {
                audioFX.playPop();
                openScheduler();
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold text-xs tracking-tight shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Calendar size={13} className="stroke-[2.5]" />
              <span>Schedule Chat</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                audioFX.playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-full text-gray-400 hover:text-white bg-white/[0.04] border border-white/[0.06]"
              aria-label="Toggle Mobile Menu" aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="absolute top-16 inset-x-4 max-w-sm mx-auto p-4 rounded-2xl bg-[#0d0f14]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl flex flex-col gap-2 lg:hidden z-50 animate-in fade-in slide-in-from-top-2">
            {[
              { id: 'about', label: 'About & Metrics' },
              { id: 'experience', label: 'Experience Timeline' },
              { id: 'skills', label: 'Skills & Proficiencies' },
              { id: 'projects', label: 'SELECTED WORK' },
              { id: 'writing', label: 'Writings & Articles' },
              { id: 'contact', label: 'Contact & Terminal' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {}
      <section id="hero" className="reference-hero relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 lg:px-12 overflow-hidden">
        
        {/* Radial Background Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="hero-masthead lg:col-span-12"><div className="hero-overline">ENGINEER. RESEARCHER. COMMUNITY BUILDER.</div><h1><span>LUNGSOM</span> <span className="outline-type">LAMNIO</span><span className="name-period">.</span></h1><div className="hero-rule"><span>PERSONAL PORTFOLIO / 2026</span><span>IDEAS → SYSTEMS → IMPACT</span></div></div>
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs text-gray-300">
                CTO @ Vernovate • GDGoC AdtU Technical Lead
              </span>
            </div>

            {/* Dynamic Rotating Engineering Focus Tag */}
            <div className="h-10 mb-6 flex items-center">
              <span className="font-mono text-base sm:text-xl font-medium text-amber-400 flex items-center gap-2">
                <span className="text-gray-500 font-normal">&gt;</span>
                <motion.span key={titleIndex} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.3}}>{HERO_TITLES[titleIndex]}</motion.span>
                <span className="w-2 h-5 bg-amber-400 animate-pulse inline-block" />
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light mb-8">
              Architecting resilient, mission-critical systems and client-side web software. 
              Enterprise CTO delivering applied R&D with a <span className="text-white font-medium">₹5 Lakhs research grant</span>, 
              leading a campus developer community, with <span className="text-amber-400 font-mono font-medium">200+ LeetCode problems solved</span>.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-bold text-sm tracking-tight hover:bg-amber-300 transition-all shadow-lg hover:shadow-amber-400/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Explore Work</span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#12151c] text-white font-medium text-sm tracking-tight border border-white/[0.1] hover:border-amber-400/50 hover:bg-[#161a24] transition-all flex items-center justify-center gap-2 group"
              >
                {copiedEmail ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-xs">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                    <span className="font-mono text-xs">Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-[#12151c] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-[#12151c] border border-white/[0.08] text-gray-400 hover:text-amber-400 hover:border-amber-400/30 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            </div>

            <ScheduleBadge onOpen={()=>openScheduler()}/>
            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/[0.08] w-full max-w-lg">
              <div>
                <div className="text-2xl font-extrabold text-white font-mono tracking-tight">₹5L</div>
                <div className="text-xs text-gray-400">R&D Grant Won</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-amber-400 font-mono tracking-tight">200+</div>
                <div className="text-xs text-gray-400">LeetCode Solved</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white font-mono tracking-tight">GDGoC</div>
                <div className="text-xs text-gray-400">Campus Tech Lead</div>
              </div>
            </div>

          </div>

          {/* Right Tactile Interactive Card & Terminal Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Glowing Gradient Frame */}
              <div className="absolute -inset-1 bg-gradient-to-b from-amber-500/20 to-transparent rounded-3xl blur-xl opacity-70" />

              {/* Main Card Container */}
              <div className="relative rounded-3xl bg-[#0d0f17]/90 border border-white/[0.1] backdrop-blur-2xl p-6 shadow-2xl overflow-hidden">
                
                {/* Window Controls Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="font-mono text-xs text-gray-400 ml-2">lungsom-runtime.sh</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-amber-400/90 border border-amber-400/20">
                    ONLINE
                  </span>
                </div>

                {/* Stylized Avatar Card & Identity */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/10">
                      <div className="w-full h-full bg-[#0d0f17] rounded-[14px] flex items-center justify-center font-mono font-black text-xl text-amber-400">
                        LL
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0d0f17]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Lungsom Lamnio</h2>
                    <motion.p key={titleIndex} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className="role-card-title text-xs text-gray-400 font-mono">{HERO_TITLES[titleIndex]}</motion.p>
                    <p className="text-[11px] text-amber-400/90 font-mono mt-0.5">Vernovate & GDGoC AdtU</p>
                  </div>
                </div>

                <SpatialHero index={titleIndex}/>
                {/* Live Floating Tech Badges */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">Current Deployments</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "React 19 & Next.js", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                      { name: "Python / PyTorch GNN", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
                      { name: "Docker & K8s", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
                      { name: "TypeScript", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
                      { name: "Reinforcement Learning (PPO)", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" }
                    ].map((badge) => (
                      <span key={badge.name} className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${badge.color}`}>
                        {badge.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Terminal Live Snippet */}
                <div className="rounded-xl bg-black/60 p-3.5 border border-white/[0.06] font-mono text-xs text-gray-300">
                  <div className="text-gray-500 text-[11px] mb-1.5">// Architectural Principle</div>
                  <div className="text-amber-300 font-semibold">$ verify_zero_telemetry()</div>
                  <div className="text-gray-400 pl-3 mt-1 text-[11px]">
                    → IndexedDB persistence: ACTIVE <br />
                    → Client compute: 100% ISOLATED <br />
                    → Remote leakage: 0 BYTES
                  </div>
                </div>

                {/* Bottom Quick Trigger */}
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex justify-between items-center text-xs text-gray-400 font-mono">
                  <span>BUILD / RESEARCH / LEAD</span>
                  <button 
                    onClick={() => scrollTo('experience')} 
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    View Career Timeline →
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {}
      <motion.section initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true,amount:.08}} transition={{duration:.5}} id="about" className="py-24 px-6 lg:px-12 border-t border-white/[0.06] relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
                <Compass size={14} />
                <span>Executive Summary</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Engineering at the intersection of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  Applied R&D & Scalable Systems
                </span>
              </h2>
            </div>
            <p className="max-w-md text-gray-400 text-sm leading-relaxed">
              Synthesizing cutting-edge theoretical computing—such as graph neural networks and reinforcement learning—with real-world client-side and full-stack enterprise reliability.
            </p>
          </div>

          <AboutManifesto/>
          {/* Grid of Key Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {METRICS_DATA.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={i}
                  className="group relative p-6 rounded-2xl bg-[#0d0f17]/60 border border-white/[0.08] hover:border-amber-400/40 transition-all duration-300 backdrop-blur-md"
                >
                  <div className="p-3 w-fit rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-white tracking-tight mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-200 mb-2">
                    {metric.label}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {metric.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Narrative Split: Philosophy & Foundations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Narrative Card */}
            <div className="p-8 rounded-3xl bg-[#0d0f17]/80 border border-white/[0.08] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Terminal size={18} className="text-amber-400" />
                  Engineering Principles & Delivery
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  As the <strong className="text-white">Chief Technical Officer (R&D) at Vernovate</strong>, my philosophy centers on zero unnecessary abstraction and radical performance. Whether securing competitive research grants or architecting containerized microservice backends, the focus is always end-to-end product integrity.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Concurrently serving as <strong className="text-white">Technical Lead at GDGoC AdtU</strong>, I bridge enterprise practices with student innovation—leading large-scale hackathons, hosting architecture sprints, and cultivating engineers eager to solve high-impact regional challenges.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-gray-300">
                  Algorithmic Rigor
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-gray-300">
                  Zero-Telemetry Paradigms
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-gray-300">
                  Applied AI & GNNs
                </span>
              </div>
            </div>

            {/* Right Card: Interactive Terminal Snapshot */}
            <div className="p-8 rounded-3xl bg-black/80 border border-white/[0.08] font-mono flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs text-gray-400">
                  <span>diagnostics.sh — root@lungsom</span>
                  <span className="text-emerald-400">PROFILE SNAPSHOT</span>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-amber-400">$ cat /etc/research-grant.info</span>
                    <p className="text-gray-300 pl-4 mt-0.5">
                      Grant: ₹5,00,000 INR (Applied Research & Development)<br />
                      Role: CTO (R&D), Vernovate<br />
                      Focus: Applied Research & Development
                    </p>
                  </div>
                  <div>
                    <span className="text-amber-400">$ query_leetcode_stats --handle=lungsom</span>
                    <p className="text-gray-300 pl-4 mt-0.5">
                      Problems Solved: 200+ (Arrays, Graphs, Dynamic Programming)<br />
                      Metric: Supplied profile milestone
                    </p>
                  </div>
                  <div>
                    <span className="text-amber-400">$ ping gdgoc-adtu-community</span>
                    <p className="text-emerald-400 pl-4 mt-0.5">
                      64 bytes from community: icmp_seq=1 ttl=64 time=0.82 ms<br />
                      Events: HackStone 2024, Cloud Study Jams, Compose Camps
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
                <span>Research & Community</span>
                <button 
                  onClick={() => scrollTo('contact')}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-sans"
                >
                  Start an Engagement →
                </button>
              </div>
            </div>

          </div>

        </div>
      </motion.section>

      {}
      <section id="experience" className="py-24 px-6 lg:px-12 bg-[#08090d]/60 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-16">
            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
              <Clock size={14} />
              <span>Career Progression</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              EXPERIENCE
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl">
              From early open-source engineering to executive applied R&D management and community direction.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative border-l border-white/[0.1] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12"><div className="experience-fill" aria-hidden="true"/>
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative group">
                
                {/* Glowing Dot Milestone Indicator */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0d0f17] border-2 border-amber-400 group-hover:scale-125 group-hover:bg-amber-400 transition-all duration-300" />

                {/* Experience Card */}
                <div className="p-6 md:p-8 rounded-3xl bg-[#0d0f17]/70 border border-white/[0.08] group-hover:border-amber-400/30 transition-all duration-300 backdrop-blur-md">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-amber-400 mt-0.5">
                        {exp.company} <span className="text-gray-500">•</span> <span className="text-gray-400 text-xs font-mono">{exp.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] text-gray-300 border border-white/[0.08]">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                    {exp.description}
                  </p>

                  {/* Bullet Achievements */}
                  <div className="space-y-2 mb-6">
                    {exp.achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-amber-400 mt-1">▸</span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                    {exp.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-gray-400 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="skills" className="py-24 px-6 lg:px-12 border-t border-white/[0.06]"><div className="max-w-6xl mx-auto"><div className="editorial-section-heading"><h2>SKILLS</h2><span>TOOLS I BUILD WITH</span></div><SkillsMarquee/></div></section>

      {}
      <section id="projects" className="py-24 px-6 lg:px-12 bg-[#08090d]/60 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
                <Layers size={14} />
                <span>Production Implementations</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                PROJECTS
              </h2>
            </div>
            <p className="max-w-md text-gray-400 text-sm leading-relaxed">
              Open-source software, deep-tech research architectures, and privacy-first web utilities tested under production constraints.
            </p>
          </div>

          <ProjectRows projects={PROJECTS} onOpen={setSelectedProject}/>

        </div>
      </section>

      {}
      <section id="writing" className="py-24 px-6 lg:px-12 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
                <BookOpen size={14} />
                <span>Technical Thoughts & Articles</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                WRITING
              </h2>
            </div>
            <p className="max-w-md text-gray-400 text-sm leading-relaxed">
              Dispatches covering local-first architectures, deep reinforcement learning, and high-velocity engineering leadership.
            </p>
          </div>

          <HashnodeCard/>
          <div className="space-y-4">
            {ARTICLES.map((article, index) => (
              <button
                key={index}
                onClick={() => { audioFX.playPop(); setSelectedArticle(article); }}
                className="group block w-full text-left p-6 md:p-8 rounded-2xl bg-[#0d0f17]/60 border border-white/[0.06] hover:border-amber-400/30 hover:bg-[#0e121a] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      {article.tag}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      Topic overview · {article.readTime}
                    </span>
                  </div>

                  <span className="text-amber-400 text-xs font-mono hidden md:flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Overview <ChevronRight size={14} />
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight mb-2">
                  {article.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed font-light max-w-3xl">
                  {article.summary}
                </p>
              </button>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="contact" className="py-24 px-6 lg:px-12 bg-[#08090d]/80 border-t border-white/[0.06] relative"><div className="contact-masthead"><span className="hero-overline">HAVE SOMETHING IN MIND?</span><h2>LET’S BUILD<br/><span className="outline-type">SOMETHING</span><br/><span className="text-amber-400">GREAT.</span></h2><p>A project, a research question, or an idea worth exploring.<br/>Let’s start a conversation.</p><button onClick={()=>openScheduler()}><Calendar size={16}/> SCHEDULE A CHAT <ArrowUpRight size={17}/></button></div>
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            
            {/* Left Contact Pitch */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
                <Mail size={14} />
                <span>Initiate Dialogue</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
                OPEN A CONVERSATION <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  I’m all ears.
                </span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed font-light mb-8 max-w-md">
                Available for advisory roles, enterprise applied R&D leadership, full-stack systems engineering, and keynote developer sessions.
              </p>

              {/* Direct Action Capsule */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0d0f17] border border-white/[0.08]">
                  <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-mono">Demo Contact · Replace Before Launch</div>
                    <div className="text-white font-mono font-medium text-sm">hello@example.com</div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="ml-auto p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white transition-colors"
                    title="Copy Email" aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      audioFX.playPop();
                      openScheduler();
                    }}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-sm tracking-tight hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Calendar size={16} />
                    <span>Book Strategy Call</span>
                  </button>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="py-3.5 px-6 rounded-2xl bg-[#0d0f17] border border-white/[0.08] text-white font-medium text-sm hover:border-amber-400/40 transition-all flex items-center justify-center gap-2"
                  >
                    <Linkedin size={16} className="text-amber-400" />
                    <span>Connect</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Interactive Developer CLI Console */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-black/90 border border-white/[0.1] shadow-2xl p-6 font-mono text-xs overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-gray-300">lungsom-interactive-terminal</span>
                  </div>
                  <span className="text-[10px] text-gray-500">v2.4.0</span>
                </div>

                {/* Console Log Buffer */}
                <div ref={logRef} role="log" aria-live="polite" className="h-52 overflow-y-auto space-y-2 text-gray-300 scrollbar-thin scrollbar-thumb-white/10 pr-2">
                  {terminalOutput.map((line, idx) => (
                    <div key={idx} className={line.startsWith('>') ? 'text-amber-400 font-semibold' : 'text-gray-300'}>
                      {line}
                    </div>
                  ))}
                </div>

                {/* Interactive CLI Input Line */}
                <form onSubmit={handleTerminalSubmit} className="mt-4 pt-3 border-t border-white/[0.08] flex items-center gap-2">
                  <span className="text-amber-400">&gt;</span>
                  <input
                    aria-label="Terminal command"
                    maxLength={160}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="type 'help', 'grant', or 'skills'..."
                    className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-600 font-mono text-xs"
                  />
                  <button type="submit" className="p-1 text-gray-400 hover:text-amber-400" aria-label="Run command">
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Footer Bar & Back To Top */}
          <div className="pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-400 font-mono">
            <div>
              © {new Date().getFullYear()} Lungsom Lamnio. Engineered with React 19 & Tailwind CSS.
            </div>

            <div className="flex items-center gap-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LeetCode</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              
              <button
                onClick={() => {
                  audioFX.playPop();
                  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
                }}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors pl-2"
              >
                <span>Scroll to Top</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {}
      {selectedProject && (
        <Modal onClose={() => setSelectedProject(null)} label="Project details">
          <div className="relative w-full max-w-2xl bg-[#0d0f17] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => {
                audioFX.playPop();
                setSelectedProject(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1] transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
              <span>{selectedProject.category}</span>
              <span>•</span>
              <span>{selectedProject.year}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              {selectedProject.title}
            </h3>
            
            <p className="text-sm font-mono text-gray-400 mb-6">
              {selectedProject.subtitle}
            </p>

            <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 font-mono text-xs mb-6">
              {selectedProject.metrics}
            </div>

            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Architectural Blueprint</h4>
            <div className="space-y-2 mb-6">
              {selectedProject.architecture.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                  <span className="text-amber-400 mt-1">▸</span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Technologies Utilized</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-gray-200 border border-white/[0.08]">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/[0.08]">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium text-xs font-mono border border-white/[0.08] flex items-center justify-center gap-2 transition-colors"
              >
                <Github size={16} />
                <span>Inspect Repository</span>
              </a>

              {selectedProject.demo !== "#" && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Launch Live Instance</span>
                </a>
              )}
            </div>

          </div>
        </Modal>
      )}

      {}
      {schedulerModalOpen && (
        <Modal onClose={() => setSchedulerModalOpen(false)} label="Consultation inquiry">
          <div className="relative w-full max-w-lg bg-[#0d0f17] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            <button
              onClick={() => {
                audioFX.playPop();
                setSchedulerModalOpen(false);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1] transition-colors"
              aria-label="Close scheduler"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
              <Calendar size={14} />
              <span>Consultation Inquiry</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              Discuss a Technical Consultation
            </h3>

            <p className="text-sm text-gray-400 font-light mb-6">
              Demo contact details are currently in use. This opens an email draft; it does not reserve a meeting time.
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-xs font-mono text-gray-400 mb-1">Standard Advisory Call</div>
                <div className="text-white font-semibold text-sm">30-Minute Architecture & R&D Briefing</div>
                <div className="text-xs text-gray-500 font-mono mt-1">Via Google Meet or Zoom</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-xs font-mono text-gray-400 mb-1">Contact Email</div>
                <div className="text-white font-mono text-sm">hello@example.com</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-mono text-xs border border-white/[0.08] transition-colors"
              >
                {copiedEmail ? "Copied Email!" : "Copy Email"}
              </button>

              <a
                href="mailto:hello@example.com?subject=Strategic%20Consultation%20Inquiry%20-%20Lungsom%20Lamnio"
                className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send size={14} />
                <span>Open Email Draft</span>
              </a>
            </div>

          </div>
        </Modal>
      )}

      {}
      <SocialDock/><MagneticCursor/>
      {selectedArticle && <Modal onClose={()=>setSelectedArticle(null)} label={selectedArticle.title}><article className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d0f17] p-8"><button aria-label="Close article overview" className="absolute right-5 top-5 p-2" onClick={()=>setSelectedArticle(null)}><X size={18}/></button><div className="text-amber-400 font-mono text-xs mb-4">TOPIC OVERVIEW</div><h2 className="text-2xl font-bold pr-6 mb-5">{selectedArticle.title}</h2><p className="text-gray-300 leading-relaxed">{selectedArticle.summary}</p><p className="text-gray-500 text-sm mt-6">A full article has not been published here yet.</p></article></Modal>}
      {copyError && <div role="alert" className="fixed bottom-6 right-6 z-50 rounded-xl border border-amber-400/30 bg-[#16130b] p-4 text-sm">Clipboard unavailable. Select and copy hello@example.com.</div>}
      {copiedEmail && (
        <div className="fixed bottom-8 right-8 z-50 px-4 py-3 rounded-2xl bg-emerald-500 text-black font-semibold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <Check size={16} className="stroke-[3]" />
          <span role="status">hello@example.com copied to clipboard!</span>
        </div>
      )}

    </div>
  );
}