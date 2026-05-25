import { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    id: 0, range: [0, 0.18], num: '01', label: 'BLANK CANVAS',
    heading: 'It starts with your idea',
    body: 'Choose your garment. Pick the colour. Tell us your vision — or upload your artwork directly.',
    color: '#1A1A1A', side: 'left', lightIntensity: 0.9,
  },
  {
    id: 1, range: [0.18, 0.36], num: '02', label: 'SCREEN PRINTING',
    heading: 'Bold. Vivid. Built to last.',
    body: 'Razor-sharp graphics with professional inks that bond deep into the fabric. Perfect for logos, illustrations, and high-impact designs.',
    chips: ['Up to 8 colours', 'Bulk friendly', 'From K95/unit'],
    color: '#0C0C0A', side: 'right', lightIntensity: 1.1, decalColor: '#C9A96E',
  },
  {
    id: 2, range: [0.36, 0.54], num: '03', label: 'EMBROIDERY',
    heading: 'Texture you can feel.',
    body: 'Thread by thread, your design is stitched with precision. Embroidery adds dimension and a luxury finish that lasts a lifetime.',
    chips: ['Up to 10cm design', '3D Puff available', 'From K150/unit'],
    color: '#2A2520', side: 'left', lightIntensity: 1.2, decalColor: '#A07840',
  },
  {
    id: 3, range: [0.54, 0.72], num: '04', label: 'DTG PRINTING',
    heading: 'Photo-perfect detail.',
    body: 'Direct-to-garment printing reproduces full-colour images, gradients, and fine details with stunning accuracy.',
    chips: ['No minimums', 'Full colour', 'From K120/unit'],
    color: '#1A1A1A', side: 'right', lightIntensity: 1.3, decalColor: '#C9A96E',
  },
  {
    id: 4, range: [0.72, 1.0], num: '05', label: 'YOUR CREATION',
    heading: 'All of it. None of it. You decide.',
    body: 'Mix methods. Stack techniques. Every CUSTO order is handcrafted in Lusaka and delivered across Zambia.',
    color: '#0C0C0A', side: 'center', lightIntensity: 1.0,
  },
];

function getPhase(p) {
  for (let i = phases.length - 1; i >= 0; i--) {
    if (p >= phases[i].range[0]) return i;
  }
  return 0;
}

function createShirtGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.64, -1.02);
  shape.lineTo(0.64, -1.02);
  shape.bezierCurveTo(0.66, -0.4, 0.67, 0.1, 0.64, 0.3);
  shape.lineTo(0.92, 0.40);
  shape.bezierCurveTo(1.14, 0.48, 1.30, 0.40, 1.34, 0.24);
  shape.bezierCurveTo(1.32, 0.10, 1.20, 0.02, 1.06, 0.04);
  shape.bezierCurveTo(0.94, 0.06, 0.82, 0.13, 0.75, 0.26);
  shape.lineTo(0.75, 0.52);
  shape.bezierCurveTo(0.73, 0.70, 0.44, 0.85, 0.0, 0.87);
  shape.bezierCurveTo(-0.44, 0.85, -0.73, 0.70, -0.75, 0.52);
  shape.lineTo(-0.75, 0.26);
  shape.bezierCurveTo(-0.82, 0.13, -0.94, 0.06, -1.06, 0.04);
  shape.bezierCurveTo(-1.20, 0.02, -1.32, 0.10, -1.34, 0.24);
  shape.bezierCurveTo(-1.30, 0.40, -1.14, 0.48, -0.92, 0.40);
  shape.lineTo(-0.64, 0.3);
  shape.bezierCurveTo(-0.67, 0.1, -0.66, -0.4, -0.64, -1.02);

  const geo = new THREE.ExtrudeGeometry(shape, {
    steps: 1, depth: 0.09,
    bevelEnabled: true, bevelThickness: 0.022, bevelSize: 0.014, bevelSegments: 4,
  });
  geo.computeBoundingBox();
  const c = new THREE.Vector3();
  geo.boundingBox.getCenter(c);
  geo.translate(-c.x, -c.y, -c.z);
  return geo;
}

function ShowcaseShirt({ progress }) {
  const meshRef      = useRef();
  const matRef       = useRef();
  const decalRef     = useRef();
  const warmLightRef = useRef();
  const coolLightRef = useRef();
  const geometry = useMemo(() => createShirtGeometry(), []);
  const phaseIndex = getPhase(progress);
  const phase = phases[phaseIndex];

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += phaseIndex === 4 ? 0.016 : 0.005;
    if (matRef.current) matRef.current.color.lerp(new THREE.Color(phase.color), 0.04);
    if (warmLightRef.current)
      warmLightRef.current.intensity = THREE.MathUtils.lerp(warmLightRef.current.intensity, phase.lightIntensity * 1.4, 0.05);
    if (coolLightRef.current)
      coolLightRef.current.intensity = THREE.MathUtils.lerp(coolLightRef.current.intensity, phase.lightIntensity * 0.7, 0.05);
    if (decalRef.current) {
      const show = phaseIndex >= 1 && phaseIndex <= 3;
      decalRef.current.material.opacity = THREE.MathUtils.lerp(decalRef.current.material.opacity, show ? 0.85 : 0, 0.04);
      if (phase.decalColor) decalRef.current.material.color.lerp(new THREE.Color(phase.decalColor), 0.06);
    }
  });

  return (
    <group scale={[1.4, 1.4, 1.4]} position={[0, -0.1, 0]}>
      <pointLight ref={warmLightRef} position={[-3, 3.5, 2]} intensity={1.5} color="#F5EDD6" />
      <pointLight ref={coolLightRef} position={[3, -2, 2]}   intensity={0.8} color="#FFFFFF" />

      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial ref={matRef} color="#1A1A1A" roughness={0.82} metalness={0.04} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={decalRef} position={[0, 0.08, 0.12]}>
        <planeGeometry args={[0.72, 0.62]} />
        <meshStandardMaterial color="#C9A96E" transparent opacity={0} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* CUSTO label — phase 4 */}
      <mesh position={[0, 0.08, 0.13]}>
        <planeGeometry args={[0.28, 0.10]} />
        <meshStandardMaterial color="#C9A96E" transparent opacity={phaseIndex === 4 ? 0.8 : 0} roughness={0.35} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <shadowMaterial opacity={0.08} />
      </mesh>
    </group>
  );
}

function SceneParticles({ active }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(160 * 3);
    for (let i = 0; i < 160; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#C9A96E" transparent opacity={active ? 0.55 : 0.1} sizeAttenuation />
    </points>
  );
}

function ShowcaseScene({ progress }) {
  return (
    <>
      <ambientLight intensity={1.2} color="#FAFAF7" />
      <directionalLight position={[0, 8, 4]} intensity={1.0} color="#F5EDD6" castShadow />
      <SceneParticles active={getPhase(progress) === 4} />
      <ShowcaseShirt progress={progress} />
    </>
  );
}

function PhasePanel({ phase, visible }) {
  const isCenter = phase.side === 'center';
  const isRight  = phase.side === 'right';

  return (
    <div
      className="absolute transition-all duration-700"
      style={{
        top:    isCenter ? 'auto' : '50%',
        bottom: isCenter ? '7%'   : 'auto',
        left:   isCenter ? '50%'  : isRight ? 'auto' : '4%',
        right:  isCenter ? 'auto' : isRight ? '4%'   : 'auto',
        transform: isCenter
          ? 'translateX(-50%)'
          : `translateY(-50%) translateX(${visible ? '0px' : isRight ? '48px' : '-48px'})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        maxWidth: isCenter ? '600px' : '360px',
        width:    isCenter ? '88%'   : '30%',
        textAlign: isCenter ? 'center' : 'left',
        zIndex: 20,
        ...(isCenter ? {
          background: 'rgba(250,250,247,0.88)',
          backdropFilter: 'blur(16px)',
          borderRadius: '20px',
          padding: '32px 36px',
          border: '1px solid rgba(229,224,213,0.8)',
        } : {
          background: 'rgba(250,250,247,0.82)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '28px 32px',
          border: '1px solid rgba(229,224,213,0.7)',
        }),
      }}
    >
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '9.5px',
          letterSpacing: '0.22em',
          color: '#C9A96E',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        {phase.num} / {phase.label}
      </p>

      <h2
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: isCenter ? 'clamp(28px, 3.5vw, 48px)' : 'clamp(22px, 2.8vw, 38px)',
          color: '#0C0C0A',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          marginBottom: '14px',
        }}
      >
        {phase.heading}
      </h2>

      <p
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '13.5px',
          lineHeight: 1.7,
          color: 'rgba(12,12,10,0.55)',
          marginBottom: '16px',
        }}
      >
        {phase.body}
      </p>

      {phase.chips && (
        <div className={`flex flex-wrap gap-2 ${isCenter ? 'justify-center' : ''}`}>
          {phase.chips.map(chip => (
            <span
              key={chip}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.06em',
                padding: '5px 12px',
                borderRadius: '50px',
                background: '#F2EFE8',
                border: '1px solid #E5E0D5',
                color: '#A07840',
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {phase.id === 4 && (
        <div className="mt-7 flex justify-center">
          <Link
            to="/studio"
            style={{
              background: '#0C0C0A',
              color: '#FAFAF7',
              border: '1.5px solid #0C0C0A',
              borderRadius: '50px',
              padding: '13px 32px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            START DESIGNING NOW →
          </Link>
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
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: '#FAFAF7' }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5.2], fov: 44 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ShowcaseScene progress={progress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Side vignettes — very subtle on light bg */}
      <div
        className="absolute inset-y-0 left-0 w-1/4 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(250,250,247,0.92), transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(250,250,247,0.92), transparent)' }}
      />

      {/* Phase panels */}
      {phases.map((phase, i) => (
        <PhasePanel key={phase.id} phase={phase} visible={currentPhase === i} />
      ))}

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {phases.map((_, i) => (
          <div
            key={i}
            className="h-[2px] rounded-full transition-all duration-500"
            style={{
              width: currentPhase === i ? '28px' : '8px',
              background: currentPhase === i ? '#C9A96E' : 'rgba(12,12,10,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
