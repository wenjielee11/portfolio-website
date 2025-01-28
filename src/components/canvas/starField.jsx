'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { starTypes } from '../../helpers/config/starDistribution.js'
import { BLOOM_LAYER, STAR_MAX, STAR_MIN } from '../../helpers/config/renderConfig.js'
import { clamp } from '../../helpers/utils.js'

const StarField = ({ positions }) => {
  const meshRefs = useRef([])
  const { camera } = useThree()

  const texture = useMemo(() => new THREE.TextureLoader().load('/textures/sprite120.png'), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const starsByType = useMemo(() => {
    const groups = Array(starTypes.color.length)
      .fill()
      .map(() => [])
    const typeCounts = new Array(starTypes.color.length).fill(0)

    positions.forEach((pos) => {
      let num = Math.random() * 100.0
      for (let i = 0; i < starTypes.percentage.length; i++) {
        num -= starTypes.percentage[i]
        if (num < 0) {
          groups[i].push(pos)
          typeCounts[i]++
          break
        }
      }
    })
    return groups
  }, [positions])

  useEffect(() => {
    meshRefs.current.forEach((mesh) => {
      if (mesh) {
        mesh.layers.set(BLOOM_LAYER)
        mesh.frustumCulled = false
      }
    })
  }, [])

  useFrame(() => {
    meshRefs.current.forEach((mesh, typeIndex) => {
      if (!mesh || !starsByType[typeIndex]) return

      const baseSize = starTypes.size[typeIndex]
      const positions = starsByType[typeIndex]

      positions.forEach((pos, i) => {
        const dist = pos.distanceTo(camera.position) / 250
        const starSize = clamp(dist * baseSize, STAR_MIN, STAR_MAX)

        dummy.position.copy(pos)
        dummy.scale.setScalar(starSize)
        dummy.rotation.copy(camera.rotation)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      })

      mesh.instanceMatrix.needsUpdate = true
    })
  })

  return (
    <>
      {starsByType.map(
        (positions, index) =>
          positions.length > 0 && (
            <instancedMesh
              key={index}
              ref={(el) => (meshRefs.current[index] = el)}
              args={[new THREE.PlaneGeometry(1, 1), null, positions.length]}
            >
              <meshBasicMaterial
                map={texture}
                color={starTypes.color[index]}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </instancedMesh>
          ),
      )}
    </>
  )
}

export default StarField
