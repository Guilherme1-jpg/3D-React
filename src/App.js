import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Points, PointMaterial, Box } from '@react-three/drei';
import { SVGLoader } from 'three/addons/loaders/SVGLoader';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { a, useSpring  } from 'react-spring' 


function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{ background: 'black' }}>
      <ambientLight intensity={2.5} />
      <pointLight position={[10, 10, 50]} intensity={1} />
      <OrbitControls />
      <group>
      <AvatarModel />
      <AvatarModel2 position={[0, 0, 0]} scale={0.05}/> 
      </group>
      
      <Stars />
    </Canvas>
  );
}

function AvatarModel2({ position }) {
  const ref = useRef();
  const [hover, set] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const { nodes } = useLoader(GLTFLoader, '/avatar.glb'); 

  // useFrame((state, delta) => {
  //   ref.current.rotation.y += 0.005;
  // });

  return (
    <group ref={ref}  position={position} scale={[0.14, 0.14, 0.14]}>
      <group
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        onClick={() => setRotation([rotation[0], rotation[1] + Math.PI / 4, rotation[2]])}
      >
        <primitive object={nodes.Scene} />
        <meshBasicMaterial color={hover ? 'lightblue' : 'hotpink'} />
      </group>
    </group>
  );
}

function AvatarModel() {
  const ref = useRef();
  const [hover, set] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const { nodes } = useLoader(GLTFLoader, '/avatar3.glb');

  // useFrame((state, delta) => {
  //   // Adicionando rotação contínua ao redor do eixo y
  //   ref.current.rotation.y += 0.005;
  // });


  return (
    <group ref={ref} scale={[0.05, 0.05, 0.05]}>
      <group
        position={[0, 0, 0]}
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        onClick={() => setRotation([rotation[0], rotation[1] + Math.PI / 4, rotation[2]])}
      >
        <primitive object={nodes.Scene} />
        <meshBasicMaterial color={hover ? 'lightblue' : 'hotpink'} />
      </group>
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
      <PointMaterial transparent color="#ffffff" size={0.02} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

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
