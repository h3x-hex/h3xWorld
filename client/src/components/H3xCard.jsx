import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function H3xCard(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('models/h3xCard.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Cube"
          position={[0.092, 0, -0.026]}
          rotation={[0, 0, 0]}
          scale={[-9.978, -6.21, -0.149]}>
          <mesh
            name="Cube001"
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials['Brushed black metal brass']}
          />
          <mesh
            name="Cube001_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials['Material.001']}
          />
          <mesh
            name="Cube001_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials['Material.004']}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models/h3xCard.glb')
