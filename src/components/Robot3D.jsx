import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingRings() {
  const rings = useMemo(() => {
    return [
      { radius: 2.2, tube: 0.008, opacity: 0.15, speed: 0.2 },
      { radius: 1.6, tube: 0.006, opacity: 0.25, speed: -0.15 },
      { radius: 1.0, tube: 0.004, opacity: 0.35, speed: 0.25 },
    ]
  }, [])

  return (
    <group>
      {rings.map((ring, i) => (
        <AnimatedRing key={i} {...ring} />
      ))}
    </group>
  )
}

function AnimatedRing({ radius, tube, opacity, speed }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.1
    }
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshBasicMaterial 
        color="#1A5D43" 
        transparent 
        opacity={opacity} 
        wireframe 
      />
    </mesh>
  )
}

function FloatingPoints() {
  const count = 40
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 0.8 + Math.random() * 1.5
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.04} 
        color="#1A5D43" 
        transparent 
        opacity={0.5} 
        sizeAttenuation
      />
    </points>
  )
}

function CenterSphere() {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      ref.current.scale.set(s, s, s)
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshBasicMaterial 
        color="#1A5D43" 
        transparent 
        opacity={0.8} 
      />
    </mesh>
  )
}

function ConnectingLines() {
  const linesRef = useRef()
  const count = 12
  
  const positions = useMemo(() => {
    const points = []
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2
      const r = 0.4 + Math.random() * 0.3
      points.push({
        start: [0, 0, 0],
        end: [
          Math.cos(theta) * r,
          (Math.random() - 0.5) * 0.5,
          Math.sin(theta) * r
        ]
      })
    }
    return points
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={linesRef}>
      {positions.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...line.start, ...line.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1A5D43" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  )
}

export default function Robot3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Float 
          speed={1.5} 
          rotationIntensity={0.1} 
          floatIntensity={0.3}
        >
          <FloatingRings />
          <CenterSphere />
          <ConnectingLines />
          <FloatingPoints />
        </Float>
      </Canvas>
    </div>
  )
}