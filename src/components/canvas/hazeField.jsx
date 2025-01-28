'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { BASE_LAYER, HAZE_MAX, HAZE_MIN, HAZE_OPACITY } from '../../helpers/config/renderConfig'
import { clamp } from '../../helpers/utils'

const vertexShader = `
  attribute float opacity;
  varying float vOpacity;
  
  void main() {
    vOpacity = opacity;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`


const fragmentShader = `
  varying float vOpacity;
  uniform sampler2D texture;
  
  void main() {
  vec2 uv = gl_PointCoord;
  uv.y = 1.0 - uv.y; // Flip Y-axis if texture appears inverted
  vec4 texColor = texture2D(texture, uv);
  gl_FragColor = vec4(texColor.rgb, texColor.a * vOpacity);
}
`

const HazeField = ({ positions }) => {
  const meshRef = useRef()
  const { camera } = useThree()

  const texture = useMemo(() => 
    {const tex = new THREE.TextureLoader().load('/textures/feathered60.png')

    tex.minFilter = THREE.LinearFilter; // Disable mipmapping for sharp sprites
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 4; // Or renderer.capabilities.getMaxAnisotropy()
    return tex;
    }, [])
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const [scales, opacities] = useMemo(() => {
    const scales = new Float32Array(positions.length)
    const opacities = new Float32Array(positions.length)
    positions.forEach((_, i) => {
      scales[i] = clamp(HAZE_MAX * Math.random(), HAZE_MIN, HAZE_MAX)
      opacities[i] = HAZE_OPACITY
    })
    return [scales, opacities]
  }, [positions])

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(1, 1)
    geom.setAttribute('opacity', new THREE.InstancedBufferAttribute(opacities, 1))
    return geom
  }, [positions])

  useEffect(() => {
    if (!meshRef.current) return

    positions.forEach((pos, i) => {
      dummy.position.copy(pos)
      dummy.scale.setScalar(scales[i])
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    meshRef.current.layers.set(BASE_LAYER)
  }, [positions])

  useFrame(() => {
    if (!meshRef.current) return

    const attributes = meshRef.current.geometry.attributes

    positions.forEach((pos, i) => {
      const dist = pos.distanceTo(camera.position) / 250
      attributes.opacity.array[i] = clamp(HAZE_OPACITY * Math.pow(dist / 2.5, 2), 0, HAZE_OPACITY)

      dummy.position.copy(pos)
      dummy.scale.setScalar(scales[i])
      dummy.rotation.copy(camera.rotation)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })

    attributes.opacity.needsUpdate = true
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[geometry, null, positions.length]} frustumCulled={false}>
      <shaderMaterial
        uniforms={{ texture: { value: texture } }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}


export default HazeField
