'use client'

import GalaxyScene from '@/components/canvas/GalaxyScene'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { useState, useEffect } from 'react'
import LandingOverlay from '@/components/dom/LandingOverlay'
import NavigationBar from '@/components/dom/NavigationBar'
export default function Page() {
  let notRendered = true;
  return (
    <>
      <NavigationBar />
      <Canvas
        className="canvas"
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color('#020207'))
        }}
      >
        {notRendered && <GalaxyScene />}
      </Canvas>
      {notRendered = false}
      <LandingOverlay></LandingOverlay>
    </>

  )
}
