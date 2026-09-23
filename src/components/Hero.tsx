import { Component, Suspense, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { Group } from 'three';
import { Button } from './ui/button';

function Artifact({ still }: { still: boolean }) {
  const group = useRef<Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current || still) return;
    group.current.rotation.y += (pointer.x * 0.38 - group.current.rotation.y) * 0.025;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.12 + pointer.y * 0.12;
  });

  return (
    <group ref={group} rotation={[0.35, 0, -0.5]}>
      <Float
        speed={still ? 0 : 1.4}
        rotationIntensity={still ? 0 : 0.25}
        floatIntensity={still ? 0 : 0.4}
      >
        <mesh>
          <torusKnotGeometry args={[1.55, 0.47, 220, 32, 2, 3]} />
          <MeshDistortMaterial
            color="#9aa9a2"
            metalness={0.93}
            roughness={0.24}
            distort={0.13}
            speed={still ? 0 : 1.3}
          />
        </mesh>
        <mesh rotation={[1.2, 0.2, 0.3]}>
          <torusGeometry args={[2.35, 0.008, 8, 160]} />
          <meshBasicMaterial color="#c6f578" />
        </mesh>
      </Float>
    </group>
  );
}

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <div className="artifact-fallback">∞</div>
    ) : (
      this.props.children
    );
  }
}

export function Hero() {
  const reduced = !!useReducedMotion();

  return (
    <section
      id="home"
      className="hero section-shell"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
    >
      <div className="hero-spotlight" />

      <div className="hero-topline mono">
        <span>
          <i className="status-dot" /> ENGINEERING WHAT’S NEXT
        </span>
        <span>PORTFOLIO — 2026</span>
      </div>

      <div className="hero-copy">
        <div className="eyebrow">
          LUNGSOM LAMNIO <span>/</span> ENGINEER & TECHNICAL LEADER
        </div>

        <h1>
          {['Ideas into', 'impact.'].map((line, i) => (
            <span className="title-line" key={line}>
              <motion.span
                initial={reduced ? false : { y: '110%', filter: 'blur(8px)' }}
                animate={{ y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 1,
                  delay: 0.15 + i * 0.17,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={i ? 'accent-title' : ''}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <p>
          I build thoughtful software.
          <br />
          And lead the people who make it possible.
        </p>

        <div className="hero-actions">
          <Button asChild>
            <a href="#work" data-cursor="Explore">
              Explore my work <ArrowUpRight size={18} />
            </a>
          </Button>
          <a className="text-link" href="#about">
            A little about me <ArrowDown size={16} />
          </a>
        </div>
      </div>

      <div
        className="hero-art"
        aria-label="Interactive floating metallic orbital sculpture"
        role="img"
      >
        <div className="orbit-label mono">FIG. 01 — CONTINUOUS EVOLUTION</div>

        <CanvasBoundary>
          <Suspense fallback={<div className="artifact-fallback">∞</div>}>
            <Canvas
              camera={{ position: [0, 0, 7.7], fov: 40 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              frameloop={reduced ? 'demand' : 'always'}
            >
              <ambientLight intensity={1.1} />
              <directionalLight position={[2, 4, 3]} intensity={5} color="#ecffe0" />
              <directionalLight position={[-4, 0, 2]} intensity={4} color="#7d98ab" />
              <pointLight position={[0, -3, 2]} intensity={35} color="#c6f578" />
              <Artifact still={reduced} />
            </Canvas>
          </Suspense>
        </CanvasBoundary>

        <span className="art-coordinate mono">R&D / SYSTEMS / HUMAN IMPACT</span>
      </div>

      <div className="hero-bottom">
        <div className="mono">
          CTO @ VERNOVATE <span>↗</span> TECH LEAD @ GDGoC AdtU
        </div>
        <a href="#about" className="scroll-hint mono">
          SCROLL TO DISCOVER <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}