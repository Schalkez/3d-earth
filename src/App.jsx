import { ContactShadows, Environment, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
// import { FaMapMarkerAlt } from 'react-icons/fa'
import * as THREE from 'three'

function Model(props) {
  const { nodes, materials } = useGLTF('/earth.gltf')
  return (
    <group rotation={[-Math.PI / 2, 0, Math.PI]} {...props} dispose={null}>
      <mesh geometry={nodes['URF-Height_Lampd_Ice_0'].geometry} material={materials.Lampd_Ice} />
      <mesh geometry={nodes['URF-Height_watr_0'].geometry} material={materials.watr} material-roughness={0} />
      <mesh geometry={nodes['URF-Height_Lampd_0'].geometry} material={materials.Lampd} material-color="lightgreen">
        <Marker rotation={[0, Math.PI / 2, 0]} position={[0, 1.3, 0]}>
          {/* Anything in here is regular HTML, these markers are from font-awesome */}
          <div style={{ color: 'orange', fontSize: 24 }}>mark 1</div>
        </Marker>
        <group position={[0, 0, 1.3]} rotation={[0, 0, Math.PI]}>
          <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
            <div style={{ position: 'absolute', fontSize: 10, letterSpacing: -0.5, left: 17.5 }}>north</div>
            <div style={{ color: 'red', fontSize: 24 }}>mark 2</div>
          </Marker>
        </group>
      </mesh>
    </group>
  )
}

Model.displayName = 'Model'

function Marker({ children, ...props }) {
  const ref = useRef()

  const [isOccluded, setOccluded] = useState()
  const [isInRange, setInRange] = useState()

  const isVisible = isInRange && !isOccluded
  const vec = new THREE.Vector3()

  useFrame((state) => {
    const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10
    if (range !== isInRange) setInRange(range)
  })

  return (
    <group ref={ref}>
      <Html
        // 3D-transform contents
        transform
        // Hide contents "behind" other meshes
        occlude
        // Tells us when contents are occluded (or not)
        onOcclude={setOccluded}
        // We just interpolate the visible state into css opacity and transforms
        style={{ transition: 'all 0.2s', opacity: isVisible ? 1 : 0, transform: `scale(${isVisible ? 1 : 0.25})` }}
        {...props}
      >
        {children}
      </Html>
    </group>
  )
}

Marker.displayName = 'Marker'

export default function Viewer() {
  return (
    <Canvas camera={{ position: [5, 0, 0], fov: 50 }} style={{ width: '100%', height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <Model position={[0, 0.25, 0]} />
      <Environment preset="sunset" />
      <ContactShadows frames={1} scale={5} position={[0, -1, 0]} far={1} blur={5} opacity={0.5} color="#204080" />
      <OrbitControls />
    </Canvas>
  )
}

Viewer.displayName = 'Viewer'
