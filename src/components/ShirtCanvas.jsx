import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
    steps: 1,
    depth: 0.09,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.014,
    bevelSegments: 4,
  });

  geo.computeBoundingBox();
  const c = new THREE.Vector3();
  geo.boundingBox.getCenter(c);
  geo.translate(-c.x, -c.y, -c.z);
  return geo;
}

function ShirtMesh({ color = '#1A1A1A', roughness = 0.82 }) {
  const meshRef = useRef();
  const geometry = useMemo(() => createShirtGeometry(), []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={[1.35, 1.35, 1.35]} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={0.04}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Particles({ count = 180 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.016} color="#C9A96E" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function ShadowPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
      <planeGeometry args={[8, 8]} />
      <shadowMaterial opacity={0.1} />
    </mesh>
  );
}

export default function ShirtCanvas({ color = '#1A1A1A', showParticles = true }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 4.8], fov: 46 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.4} color="#FAFAF7" />
      <directionalLight
        position={[-2, 4, 3]}
        intensity={1.6}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[3, -2, 2]} intensity={0.7} color="#C9A96E" />
      <pointLight position={[0, 2, -3]} intensity={0.4} color="#F5F0E8" />

      {showParticles && <Particles />}
      <ShirtMesh color={color} />
      <ShadowPlane />
    </Canvas>
  );
}
