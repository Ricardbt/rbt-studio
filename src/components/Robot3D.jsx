import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'

function RobotMesh({ mouse }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#2E7D5A" wireframe />
        </mesh>
        
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#1A1D1B" />
        </mesh>

        <mesh position={[-0.3, 0.5, 0.5]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={hovered ? "#4CAF50" : "#2E7D5A"} emissive={hovered ? "#4CAF50" : "#2E7D5A"} emissiveIntensity={0.5} />
        </mesh>
        
        <mesh position={[0.3, 0.5, 0.5]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={hovered ? "#4CAF50" : "#2E7D5A"} emissive={hovered ? "#4CAF50" : "#2E7D5A"} emissiveIntensity={0.5} />
        </mesh>

        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 0.3, 8]} />
          <meshStandardMaterial color="#2E7D5A" wireframe />
        </mesh>
      </Float>
    </group>
  )
}

function Particles() {
  const count = 50
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#2E7D5A" transparent opacity={0.6} />
    </points>
  )
}

export default function Robot3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2E7D5A" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4CAF50" />
        
        <RobotMesh />
        <Particles />
        
        <gridHelper args={[20, 20, '#2E7D5A', '#1A1D1B']} position={[0, -2, 0]} />
      </Canvas>
    </div>
  )
}