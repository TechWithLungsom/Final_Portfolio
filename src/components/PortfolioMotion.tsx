import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Moon, Sun, Rss, Code2, FileText, Network } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/** Configure verified destinations here; empty values deliberately expose a demo state. */
export const connections = { booking:'', github:'', linkedin:'', x:'', hashnode:'', resumeRepo:'', resumeLive:'', trafficRepo:'', trafficLive:'' };

const LazySpatialScene=lazy(()=>import('./SpatialScene'));
export function SpatialHero({index}:{index:number}){return <Suspense fallback={<div className="spatial-stage spatial-fallback">LOADING SPATIAL FIELD</div>}><LazySpatialScene index={index}/></Suspense>}

export function ScheduleBadge({onOpen}:{onOpen:()=>void}){return <button className="schedule-orbit" aria-label="Schedule a chat" onClick={()=>connections.booking?window.open(connections.booking,'_blank','noopener,noreferrer'):onOpen()}><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="chat-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs><text><textPath href="#chat-ring" textLength="276">SCHEDULE A CHAT • LET’S BUILD • </textPath></text></svg><ArrowUpRight size={29}/></button>}

const categories=[{label:'Languages',items:['TypeScript','JavaScript','Python','Java','SQL']},{label:'Frontend & Mobile',items:['React 19','Next.js','Tailwind CSS','Jetpack Compose','Framer Motion','GSAP']},{label:'Backend & Data',items:['Node.js','Express','MongoDB','MySQL','Graph Neural Networks','PPO']},{label:'DevOps',items:['Docker','Kubernetes','AWS','Linux','Git','CI/CD']}];
export function SkillsMarquee(){return <div className="skill-marquees"><div className="marquee-instruction">THE TOOLKIT <span>HOVER OR FOCUS TO PAUSE</span></div>{categories.map((row,i)=><div className="marquee-row" key={row.label}><h3>{row.label}</h3><div className="marquee-window" tabIndex={0} aria-label={`${row.label}: ${row.items.join(', ')}. Focus to pause animation.`}><div className={`marquee-track ${i%2?'reverse':''}`}>{[0,1].map(copy=><div className="marquee-set" key={copy} aria-hidden={copy===1}>{row.items.map(item=><span key={item}>{item}<svg className="skill-separator" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/></svg></span>)}</div>)}</div></div></div>)}</div>}

type Project={id:string;title:string;subtitle:string;summary:string;tech:string[];category:string};
const projectScreenshots: Record<string, string> = {
  'resume-forge': '/project-previews/resumeforge.png',
  'itms-ai': '/project-previews/traffic-management.png',
  'lungsom-studio': '/project-previews/lungsom-studio.png',
};

export function PreviewArtwork({ project }: { project: Project }) {
  const screenshot = projectScreenshots[project.id];
  if (!screenshot) return null;
  return (
    <div className="project-screenshot-preview">
      <img src={screenshot} alt={`${project.title} website preview`} width={1600} height={860} />
    </div>
  );
}
export function ProjectRows({projects,onOpen}:{projects:Project[];onOpen:(p:any)=>void}){const [active,setActive]=useState<string|null>(null);const x=useMotionValue(0),y=useMotionValue(0),sx=useSpring(x,{stiffness:240,damping:26}),sy=useSpring(y,{stiffness:240,damping:26});return <div className="project-rows">{projects.map((p,i)=><article key={p.id} className="project-row" onPointerEnter={()=>setActive(p.id)} onPointerLeave={()=>setActive(null)} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();x.set(Math.min(Math.max(e.clientX-r.left-170,0),r.width-360));y.set(e.clientY-r.top-100)}} onFocus={()=>setActive(p.id)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setActive(null)}}><span className="project-number">0{i+1}</span><button className="project-row-main" onClick={()=>onOpen(p)} data-cursor="View"><span>{p.category}</span><h3>{p.title}</h3><p>{p.subtitle}</p></button><div className="project-row-links">{(p.id==='resume-forge'?connections.resumeLive:connections.trafficLive)&&<a href={p.id==='resume-forge'?connections.resumeLive:connections.trafficLive} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`}>LIVE ↗</a>}{(p.id==='resume-forge'?connections.resumeRepo:connections.trafficRepo)?<a href={p.id==='resume-forge'?connections.resumeRepo:connections.trafficRepo} target="_blank" rel="noreferrer" aria-label={`${p.title} repository`}><Github size={19}/></a>:<span title="Repository URL not connected">SOURCE PENDING</span>}<button aria-label={`View ${p.title} details`} onClick={()=>onOpen(p)}><ArrowUpRight size={27}/></button></div><AnimatePresence>{active===p.id&&<motion.div className="floating-project-preview" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.95}} style={{left:sx,top:sy}}><PreviewArtwork project={p}/></motion.div>}</AnimatePresence><div className="touch-project-preview"><PreviewArtwork project={p}/></div></article>)}</div>}

export function SocialDock(){return <aside className="social-dock" aria-label="Social profiles"><span className="dock-demo">DEMO LINKS</span>{[{name:'LinkedIn',url:connections.linkedin||'https://linkedin.com',icon:<Linkedin size={17}/>},{name:'GitHub',url:connections.github||'https://github.com',icon:<Github size={18}/>},{name:'X',url:connections.x||'https://x.com',icon:<span>𝕏</span>}].map(s=><a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}><span className="dock-tooltip">{s.name}</span>{s.icon}</a>)}</aside>}
export function ThemeToggle(){const [light,setLight]=useState(()=>{try{return localStorage.getItem('portfolio-theme')==='light'}catch{return false}});useEffect(()=>{document.documentElement.dataset.theme=light?'light':'dark';try{localStorage.setItem('portfolio-theme',light?'light':'dark')}catch{}},[light]);return <button className="theme-toggle" aria-label={light?'Switch to dark theme':'Switch to light theme'} onClick={()=>setLight(v=>!v)}>{light?<Moon size={16}/>:<Sun size={16}/>}</button>}
type HashnodePost={title:string;brief:string;url:string};
export function HashnodeCard(){
 const [posts,setPosts]=useState<HashnodePost[]>([]),[status,setStatus]=useState('');
 useEffect(()=>{
  if(!connections.hashnode)return;
  const controller=new AbortController();
  async function load(){try{
   setStatus('Loading recent articles…');
   const host=new URL(connections.hashnode).hostname;
   const response=await fetch('https://gql.hashnode.com',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({query:'query PortfolioPosts($host: String!) { publication(host: $host) { posts(first: 3) { edges { node { title brief url } } } } }',variables:{host}})});
   if(!response.ok)throw new Error('Request failed');
   const result=await response.json();if(result.errors||!result.data?.publication)throw new Error('Publication unavailable');
   const articles=result.data.publication.posts.edges.map((edge:{node:HashnodePost})=>edge.node).filter((post:HashnodePost)=>typeof post.url==='string'&&post.url.startsWith('https://'));
   setPosts(articles);setStatus(articles.length?'':'No published articles yet.');
  }catch{if(!controller.signal.aborted)setStatus('Articles are unavailable. Visit the publication directly.')}}
  void load();return()=>controller.abort();
 },[]);
 return <div className="hashnode-block"><div className="hashnode-card"><Rss size={26}/><div><span>THE ENGINEERING NOTEBOOK</span><h3>Long-form ideas. Open conversations.</h3><p>Architecture, applied AI, and the craft of building software.</p></div>{connections.hashnode?<a href={connections.hashnode} target="_blank" rel="noreferrer">Read on Hashnode <ArrowUpRight size={17}/></a>:<span className="hashnode-status">HASHNODE PUBLICATION<br/>NOT CONNECTED</span>}</div>{status&&<p role="status" className="hashnode-loading">{status}</p>}{posts.map(post=><a className="hashnode-post" key={post.url} href={post.url} target="_blank" rel="noreferrer"><h3>{post.title}<ArrowUpRight size={18}/></h3><p>{post.brief}</p></a>)}</div>
}
export function MagneticCursor(){const x=useMotionValue(-100),y=useMotionValue(-100),sx=useSpring(x,{stiffness:500,damping:32,mass:.5}),sy=useSpring(y,{stiffness:500,damping:32,mass:.5});const [hover,setHover]=useState(false);const reduced=useReducedMotion();useEffect(()=>{if(reduced||!matchMedia('(pointer:fine)').matches)return;const move=(e:PointerEvent)=>{const el=(e.target as Element).closest('button,a');x.set(e.clientX);y.set(e.clientY);setHover(!!el)};window.addEventListener('pointermove',move);return()=>window.removeEventListener('pointermove',move)},[reduced,x,y]);return reduced?null:<><motion.div aria-hidden="true" className={`magnetic-follower ${hover?'is-hover':''}`} style={{left:sx,top:sy}}/><motion.div aria-hidden="true" className="cursor-dot" style={{left:x,top:y}}/></>}
/** Scope triggers to the mounted page and revert every animation in StrictMode. */
export function useEditorialMotion(){useEffect(()=>{const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{const context=gsap.context(()=>{gsap.utils.toArray<HTMLElement>('section:not(#hero) h2').forEach(el=>gsap.from(el,{y:38,opacity:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));gsap.utils.toArray<HTMLElement>('.about-reveal-word').forEach((el,i,all)=>gsap.to(el,{opacity:1,ease:'none',scrollTrigger:{trigger:'.about-manifesto',start:`top ${85-i/all.length*30}%`,end:`bottom ${65-i/all.length*25}%`,scrub:true}}));gsap.fromTo('.experience-fill',{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:'#experience',start:'top 55%',end:'bottom 75%',scrub:true}})});return()=>context.revert()});return()=>mm.revert()},[])}
export function AboutManifesto(){return <div className="about-manifesto">{'I turn complex ideas into useful systems. From applied research to the smallest interface detail — I build with purpose, and lead with curiosity.'.split(' ').map((word,i)=><span className="about-reveal-word" key={i}>{word} </span>)}</div>}
