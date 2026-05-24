import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Procedural shirt geometry built from primitives
function ShirtMesh({ color = '#FFFFFF', decalTexture = null, roughness = 0.88 }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  const shirtColor = new THREE.Color(color);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: shirtColor,
    roughness: roughness,
    metalness: 0.02,
  }), [color, roughness]);

  return (
    <group ref={groupRef} scale={[1.2, 1.2, 1.2]} position={[0, -0.2, 0]}>
      {/* Body */}
      <mesh material={material} castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.0, 0.18, 8, 12, 4]} />
      </mesh>

      {/* Left Sleeve */}
      <mesh
        material={material}
        position={[-1.05, 0.55, 0]}
        rotation={[0, 0, -Math.PI / 6]}
        castShadow
      >
        <cylinderGeometry args={[0.28, 0.32, 0.9, 12]} />
      </mesh>

      {/* Right Sleeve */}
      <mesh
        material={material}
        position={[1.05, 0.55, 0]}
        rotation={[0, 0, Math.PI / 6]}
        castShadow
      >
        <cylinderGeometry args={[0.28, 0.32, 0.9, 12]} />
      </mesh>

      {/* Collar */}
      <mesh material={material} position={[0, 1.08, 0]} castShadow>
        <torusGeometry args={[0.3, 0.08, 8, 24, Math.PI * 2]} />
      </mesh>

      {/* Shoulder seam L */}
      <mesh
        material={new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.85), roughness: 0.9 })}
        position={[-0.65, 0.88, 0.09]}
        rotation={[0, 0, -0.22]}
      >
        <boxGeometry args={[0.6, 0.04, 0.04]} />
      </mesh>

      {/* Shoulder seam R */}
      <mesh
        material={new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.85), roughness: 0.9 })}
        position={[0.65, 0.88, 0.09]}
        rotation={[0, 0, 0.22]}
      >
        <boxGeometry args={[0.6, 0.04, 0.04]} />
      </mesh>

      {/* Shadow catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[4, 4]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
}

function Particles({ count = 300 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#A78BFA"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ShirtCanvas({ color = '#FFFFFF', showParticles = true, autoRotate = true, decal = null }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} color="#C4B5FD" />
      <directionalLight
        position={[-3, 4, 2]}
        intensity={1.8}
        color="#3B82F6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[3, -2, 2]} intensity={0.8} color="#A78BFA" />
      <pointLight position={[0, 5, 3]} intensity={0.5} color="#EEF2FF" />

      {showParticles && <Particles />}

      <ShirtMesh color={color} decalTexture={decal} />

      {!autoRotate && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.7}
        />
      )}
    </Canvas>
  );
}
