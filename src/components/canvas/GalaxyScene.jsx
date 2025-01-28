'use client'
import React, { useRef, useEffect } from 'react'
import { useThree, extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

import { BASE_LAYER, BLOOM_LAYER, BLOOM_PARAMS, OVERLAY_LAYER } from '../../helpers/config/renderConfig'
import { CompositionShader } from '../../helpers/CompositionShader.js'

extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass })
extend({ OrbitControls })

import dynamic from 'next/dynamic'
const Galaxy = dynamic(() => import('./galaxy'), {
  ssr: false,
})

export const Controls = ({ onAttach = () => {}, ...props }) => {
  const { camera, size } = useThree()
  const controls = useRef()

  useFrame((delta) => {
    if (controls.current) {
      controls.current.update(delta)
    }
  })

  useEffect(() => {
    const width = size.width
    const height = size.height
    const containerWidth = 500
    camera.controls = controls.current
    // If you're intentionally setting a view offset, keep it. Otherwise remove it:
    camera.setViewOffset(width, height, -(containerWidth / 2), 0, width, height)
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)
    onAttach()
  }, [camera, size, onAttach])

  return (
    <>
      {/* Let React Three Fiber handle aspect ratio automatically by omitting the aspect prop */}
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 500]} near={0.01} far={10000} />
      <OrbitControls
        ref={controls}
        enableDamping
        autoRotate={true}
        dampingFactor={0.3}
        screenSpaceSpanning={false}
        minDistance={1}
        {...props}
      />
    </>
  )
}

const RendererSettings = () => {
  const { gl, size } = useThree()

  useEffect(() => {
    // Set correct pixel ratio (important on high-DPI displays)
    gl.setPixelRatio(window.devicePixelRatio || 1)
    // Ensure the renderer size matches the canvas size
    gl.setSize(size.width, size.height)
    // Color space and tone mapping
    gl.outputColorSpace = THREE.SRGBColorSpace
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 0.5
    gl.logarithmicDepthBuffer = true
  }, [gl, size])

  return null
}

const Bloom = () => {
  const { gl, scene, camera, size } = useThree()

  const bloomComposer = new EffectComposer(gl, new THREE.WebGLRenderTarget(size.width, size.height))
  const overlayComposer = new EffectComposer(gl, new THREE.WebGLRenderTarget(size.width, size.height))
  const baseComposer = new EffectComposer(gl, new THREE.WebGLRenderTarget(size.width, size.height))

  const renderScene = new RenderPass(scene, camera)
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 1.5, 0.4, 0.85)
  bloomPass.threshold = BLOOM_PARAMS.bloomThreshold
  bloomPass.strength = BLOOM_PARAMS.bloomStrength
  bloomPass.radius = BLOOM_PARAMS.bloomRadius

  useEffect(() => {
    bloomComposer.renderToScreen = false
    bloomComposer.addPass(renderScene)
    bloomComposer.addPass(bloomPass)

    overlayComposer.renderToScreen = false
    overlayComposer.addPass(renderScene)

    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
          overlayTexture: { value: overlayComposer.renderTarget2.texture },
        },
        vertexShader: CompositionShader.vertex,
        fragmentShader: CompositionShader.fragment,
      }),
      'baseTexture',
    )

    finalPass.needsSwap = true
    baseComposer.addPass(renderScene)
    baseComposer.addPass(finalPass)
  }, [camera, bloomComposer, overlayComposer, baseComposer, renderScene, bloomPass])

  useFrame(() => {
    // Render objects in layers separately
    camera.layers.set(BLOOM_LAYER)
    bloomComposer.render()

    camera.layers.set(OVERLAY_LAYER)
    overlayComposer.render()

    camera.layers.set(BASE_LAYER)
    baseComposer.render()
  }, 1)

  return null
}

export default function GalaxyScene() {
  return (
    <>
      <RendererSettings />
      <scene>
        <fogExp2 color={0xebe2db} density={0.00003} />
        <Controls onAttach={() => {}} enableDamping={true} enableRotate={true} rotateSpeed={0.3} dampingFactor={0.1} />
        <ambientLight intensity={0.15} color='white' />
      </scene>
      <Galaxy />
      <Bloom />
    </>
  )
}
