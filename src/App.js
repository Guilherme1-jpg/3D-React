import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { SVGLoader } from 'three/addons/loaders/SVGLoader';
import Thumb from './thumbnail.svg';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 50] }} style={{ background: 'black' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <TorusKnot />
      <Stars />
    </Canvas>
  );
}

function TorusKnot() {
  const ref = useRef();
  const [hover, set] = useState(false);

  const { paths } = useLoader(SVGLoader, Thumb);

  return (
    <group ref={ref}>
      {paths.map((path, index) => (
        <mesh
          scale={[0.05, -0.05, 0.05]}
          key={index}
          position={[0, 0, 0]}
          onPointerOver={() => set(true)}
          onPointerOut={() => set(false)}
        >
          <extrudeGeometry args={[path.toShapes(true), { depth: 2, bevelEnabled: false }]} />
          <meshBasicMaterial color={hover ? 'lightblue' : 'hotpink'} />
        </mesh>
      ))}
    </group>
  );
}

function Stars(props) {
  const ref = useRef();
  const positions = generateRandomStars(20000, 30);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
      <PointMaterial transparent color="#ffa0e0" size={0.02} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

// Função para gerar posições aleatórias uniformemente distribuídas
function generateRandomStars(count, radius) {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions.push(x, y, z);
  }

  return new Float32Array(positions);
}

export default App;
