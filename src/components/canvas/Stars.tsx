import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import { random } from 'maath';
import * as THREE from 'three';

const Stars = () => {
  const ref = useRef<THREE.Points>(null as unknown as THREE.Points);
  const [sphere] = useState<Float32Array>(
    () =>
      random.inSphere(new Float32Array(5000), { radius: 1.2 }) as Float32Array
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ preserveDrawingBuffer: false }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
