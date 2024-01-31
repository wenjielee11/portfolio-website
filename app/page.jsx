'use client'

import GalaxyScene from '@/components/canvas/GalaxyScene'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { useState, useEffect } from 'react'
import LandingOverlay from '@/components/dom/LandingOverlay'
export default function Page() {

  return (
    <>
  
      <Canvas
        className="canvas"
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color('#020207'))
        }}
      >
        <GalaxyScene />
      </Canvas>
      <LandingOverlay></LandingOverlay>
      </>
    
  )
}
