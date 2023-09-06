import { Suspense, useRef, useState } from 'react'
import { Canvas, Camera, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

const CustomCanvas = () => {
  const cameraRef = useRef < Camera > null

  return (
    <Canvas>
      <ambientLight />
      <directionalLight />
      {/* 카메라와 컨트롤러 */}
      <PerspectiveCamera ref={cameraRef} makeDefault={true} position={[0, 0, 50]} />
      <OrbitControls camera={cameraRef.current} makeDefault={true} enableZoom={false} />
      <Suspense fallback={null}>
        <WolfMesh position={[0, 0, -10]} />
      </Suspense>
    </Canvas>
  )
}

function WolfMesh({ mesh }) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // load GLTF
  const gltf = useLoader(GLTFLoader, '<GLTF_URI>')

  // handle 3d model
  useFrame((state, delta, frame) => {
    const mesh = gltf.scene.children[0]
    mesh.rotation.y = mesh.rotation.z += 0.01
    mesh.rotation.x = state.clock.getElapsedTime()
  })

  return (
    <>
      <primitive
        object={gltf.scene}
        scale={0.01}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        onClick={(e) => window.open('https://sketchfab.com/anthonyjamesgirdler')}
      />
    </>
  )
}

export default CustomCanvas
