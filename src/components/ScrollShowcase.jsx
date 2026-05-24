import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    id: 0,
    range: [0, 0.18],
    num: '01',
    label: 'BLANK CANVAS',
    heading: 'It starts with your idea',
    body: 'Choose your garment. Pick the colour. Tell us your vision — or upload your artwork directly.',
    color: '#FFFFFF',
    side: 'left',
    lightIntensity: 0.6,
  },
  {
    id: 1,
    range: [0.18, 0.36],
    num: '02',
    label: 'SCREEN PRINTING',
    heading: 'Bold. Vivid. Built to last.',
    body: 'Razor-sharp graphics with professional inks that bond deep into the fabric. Perfect for logos, illustrations, and high-impact designs.',
    chips: ['Up to 8 colours', 'Bulk friendly', 'From K95/unit'],
    color: '#FFFFFF',
    side: 'right',
    lightIntensity: 0.9,
    decalColor: '#3B82F6',
  },
  {
    id: 2,
    range: [0.36, 0.54],
    num: '03',
    label: 'EMBROIDERY',
    heading: 'Texture you can feel.',
    body: 'Thread by thread, your design is stitched with precision. Embroidery adds dimension and a luxury finish that lasts a lifetime.',
    chips: ['Up to 10cm design', '3D Puff available', 'From K150/unit'],
    color: '#FAFAFA',
    side: 'left',
    lightIntensity: 1.1,
    decalColor: '#A78BFA',
  },
  {
    id: 3,
    range: [0.54, 0.72],
    num: '04',
    label: 'DTG PRINTING',
    heading: 'Photo-perfect detail.',
    body: 'Direct-to-garment printing reproduces full-colour images, gradients, and fine details with stunning accuracy.',
    chips: ['No minimums', 'Full colour', 'From K120/unit'],
    color: '#F0EEF8',
    side: 'right',
    lightIntensity: 1.3,
    decalColor: '#6366F1',
  },
  {
    id: 4,
    range: [0.72, 1.0],
    num: '05',
    label: 'YOUR CREATION',
    heading: 'All of it. None of it. You decide.',
    body: 'Mix methods. Stack techniques. Every CUSTO order is handcrafted in Lusaka and delivered across Zambia.',
    color: '#FFFFFF',
    side: 'center',
    lightIntensity: 0.8,
  },
];

function getPhase(progress) {
  for (let i = phases.length - 1; i >= 0; i--) {
    if (progress >= phases[i].range[0]) return i;
  }
  return 0;
}

function getPhaseProgress(progress, phaseIndex) {
  const p = phases[phaseIndex];
  const range = p.range[1] - p.range[0];
  return Math.max(0, Math.min(1, (progress - p.range[0]) / range));
}

// 3D shirt for scroll showcase
function ShowcaseShirt({ progress }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const lSleeveRef = useRef();
  const rSleeveRef = useRef();
  const collarRef = useRef();
  const decalRef = useRef();
  const blueLight = useRef();
  const lilacLight = useRef();

  const phaseIndex = getPhase(progress);
  const phase = phases[phaseIndex];
  const pp = getPhaseProgress(progress, phaseIndex);

  useFrame(() => {
    if (!groupRef.current) return;

    // Rotation
    if (phaseIndex < 4) {
      groupRef.current.rotation.y += 0.005;
    } else {
      // Phase 4: dramatic 360
      groupRef.current.rotation.y += 0.015;
    }

    // Colour transition
    const targetColor = new THREE.Color(phase.color);
    if (bodyRef.current?.material) {
      bodyRef.current.material.color.lerp(targetColor, 0.03);
      if (lSleeveRef.current?.material) lSleeveRef.current.material.color.lerp(targetColor, 0.03);
      if (rSleeveRef.current?.material) rSleeveRef.current.material.color.lerp(targetColor, 0.03);
      if (collarRef.current?.material) collarRef.current.material.color.lerp(targetColor, 0.03);
    }

    // Light intensity
    if (blueLight.current) blueLight.current.intensity = THREE.MathUtils.lerp(blueLight.current.intensity, phase.lightIntensity * 1.5, 0.05);
    if (lilacLight.current) lilacLight.current.intensity = THREE.MathUtils.lerp(lilacLight.current.intensity, phase.lightIntensity, 0.05);

    // Decal visibility
    if (decalRef.current) {
      const showDecal = phaseIndex >= 1 && phaseIndex <= 3;
      const targetOpacity = showDecal ? 0.9 : 0;
      decalRef.current.material.opacity = THREE.MathUtils.lerp(
        decalRef.current.material.opacity, targetOpacity, 0.04
      );
      if (phase.decalColor) {
        decalRef.current.material.color.lerp(new THREE.Color(phase.decalColor), 0.05);
      }
    }
  });

  const baseMat = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.88, metalness: 0.02 });

  return (
    <group ref={groupRef} scale={[1.4, 1.4, 1.4]} position={[0, -0.3, 0]}>
      <pointLight ref={blueLight} position={[-3, 3, 2]} intensity={1.5} color="#3B82F6" />
      <pointLight ref={lilacLight} position={[3, -2, 2]} intensity={1.0} color="#A78BFA" />

      {/* Body */}
      <mesh ref={bodyRef} material={baseMat.clone()} castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.1, 0.18, 8, 12, 4]} />
      </mesh>

      {/* Left sleeve */}
      <mesh ref={lSleeveRef} material={baseMat.clone()} position={[-1.05, 0.58, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.28, 0.33, 0.92, 12]} />
      </mesh>

      {/* Right sleeve */}
      <mesh ref={rSleeveRef} material={baseMat.clone()} position={[1.05, 0.58, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.28, 0.33, 0.92, 12]} />
      </mesh>

      {/* Collar */}
      <mesh ref={collarRef} material={baseMat.clone()} position={[0, 1.1, 0]} castShadow>
        <torusGeometry args={[0.3, 0.08, 8, 24]} />
      </mesh>

      {/* Decal plane on chest */}
      <mesh ref={decalRef} position={[0, 0.15, 0.1]}>
        <planeGeometry args={[0.8, 0.7]} />
        <meshStandardMaterial
          color="#3B82F6"
          transparent
          opacity={0}
          roughness={0.5}
        />
      </mesh>

      {/* Logo tag (phase 4) */}
      <mesh position={[0, 0.1, 0.1]}>
        <planeGeometry args={[0.3, 0.12]} />
        <meshStandardMaterial
          color="#A78BFA"
          transparent
          opacity={phaseIndex === 4 ? 0.8 : 0}
          roughness={0.4}
        />
      </mesh>

      {/* Shadow catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <shadowMaterial opacity={0.25} />
      </mesh>
    </group>
  );
}

function SceneParticles({ active }) {
  const ref = useRef();
  const positions = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#A78BFA" transparent opacity={active ? 0.7 : 0.2} sizeAttenuation />
    </points>
  );
}

function ShowcaseScene({ progress }) {
  return (
    <>
      <ambientLight intensity={0.5} color="#C4B5FD" />
      <directionalLight position={[0, 8, 4]} intensity={1.2} color="#EEF2FF" castShadow />
      <SceneParticles active={getPhase(progress) === 4} />
      <ShowcaseShirt progress={progress} />
    </>
  );
}

function PhasePanel({ phase, visible, pp }) {
  const isCenter = phase.side === 'center';
  const isRight = phase.side === 'right';

  return (
    <div
      className="absolute transition-all duration-700"
      style={{
        top: isCenter ? 'auto' : '50%',
        bottom: isCenter ? '8%' : 'auto',
        left: isCenter ? '50%' : isRight ? 'auto' : '5%',
        right: isCenter ? 'auto' : isRight ? '5%' : 'auto',
        transform: isCenter
          ? 'translateX(-50%)'
          : `translateY(-50%) translateX(${visible ? '0px' : isRight ? '60px' : '-60px'})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        maxWidth: isCenter ? '700px' : '420px',
        width: isCenter ? '90%' : '36%',
        textAlign: isCenter ? 'center' : 'left',
        zIndex: 10,
      }}
    >
      <p
        className="font-mono text-xs tracking-[0.2em] mb-3"
        style={{ color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {phase.num} / {phase.label}
      </p>
      <h2
        className="font-display font-bold mb-4 leading-tight"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: isCenter ? 'clamp(36px, 4vw, 60px)' : 'clamp(28px, 3.5vw, 52px)',
          color: '#EEF2FF',
        }}
      >
        {phase.heading}
      </h2>
      <p
        className="leading-relaxed mb-5"
        style={{
          color: 'rgba(238,242,255,0.65)',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '15px',
        }}
      >
        {phase.body}
      </p>

      {phase.chips && (
        <div className={`flex flex-wrap gap-2 ${isCenter ? 'justify-center' : ''}`}>
          {phase.chips.map(chip => (
            <span
              key={chip}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.3)',
                color: '#C4B5FD',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {phase.id === 4 && (
        <div className="mt-8 flex justify-center">
          <a
            href="/studio"
            className="btn-primary text-lg px-10 py-4"
            style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
          >
            START DESIGNING NOW →
          </a>
        </div>
      )}
    </div>
  );
}

export default function ScrollShowcase() {
  const wrapperRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: '+=500%',
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
        onUpdate: self => setProgress(self.progress),
      });
    });
    return () => ctx.revert();
  }, []);

  const currentPhase = getPhase(progress);

  return (
    <div ref={wrapperRef} className="relative w-full overflow-hidden" style={{ height: '100vh', background: '#080B14' }}>
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5.5], fov: 42 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ShowcaseScene progress={progress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays for panels */}
      <div
        className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(8,11,20,0.92), transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(8,11,20,0.92), transparent)' }}
      />

      {/* Phase panels */}
      {phases.map((phase, i) => (
        <PhasePanel
          key={phase.id}
          phase={phase}
          visible={currentPhase === i}
          pp={getPhaseProgress(progress, i)}
        />
      ))}

      {/* Progress bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {phases.map((_, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full transition-all duration-500"
            style={{
              width: currentPhase === i ? '32px' : '12px',
              background: currentPhase === i
                ? 'linear-gradient(90deg, #3B82F6, #A78BFA)'
                : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
