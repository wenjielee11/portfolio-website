"use client"
import React, { useRef, useEffect} from 'react';
import { useThree, extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';


import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { BASE_LAYER, BLOOM_LAYER, BLOOM_PARAMS, OVERLAY_LAYER } from '../../helpers/config/renderConfig';
import { CompositionShader } from '../../helpers/CompositionShader.js';
extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass });
extend({ OrbitControls });

import dynamic from 'next/dynamic';

const Galaxy = dynamic(() => import('./galaxy'), {
  ssr: false,
});

export const Controls = ({ onAttach = () => { }, cameraProps, ...props }) => {
  const { camera } = useThree()
  const controls = useRef()


  useFrame((delta) => {

    if (controls.current) {
      controls.current.update(delta)
    }
  })

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const containerWidth = 500
    camera.controls = controls.current
    camera.setViewOffset(width, height, -(containerWidth / 2), 0, width, height)
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
    onAttach()
  }, [camera])


  return (
    <>
      <PerspectiveCamera

        makeDefault
        fov={60}
        position={[0, 0, 500]}
        aspect={window.innerWidth / window.innerHeight}
        near={0.01}
        far={10000}
      />
      <OrbitControls enableDamping
        autoRotate={true}
        dampingFactor={0.1}
        screenSpaceSpanning={false}
        minDistance={1}
      />

    </>
  )
}
const RendererSettings = () => {
  const { gl } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.max(window.devicePixelRatio, 2));
    gl.setSize(window.innerWidth, window.innerHeight);
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.5;
    gl.logarithmicDepthBuffer = true;
  })
}


const Bloom = ({ children }) => {
  const { gl, scene, camera, size } = useThree();
  const bloomComposer = new EffectComposer(gl, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight));
  const overlayComposer = new EffectComposer(gl, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight));
  const baseComposer = new EffectComposer(gl, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight));
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 1.5, 0, 0.4);
  bloomPass.threshold = BLOOM_PARAMS.bloomThreshold
  bloomPass.strength = BLOOM_PARAMS.bloomStrength
  bloomPass.radius = BLOOM_PARAMS.bloomRadius
  useEffect(() => {

    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    overlayComposer.renderToScreen = false
    overlayComposer.addPass(renderScene);

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
      'baseTexture'
    );
    finalPass.needsSwap = true;
    baseComposer.addPass(renderScene);
    baseComposer.addPass(finalPass);
  }, [camera]);

  useFrame(() => {

    camera.layers.set(BLOOM_LAYER)
    bloomComposer.render();
    camera.layers.set(OVERLAY_LAYER)
    overlayComposer.render();
    camera.layers.set(BASE_LAYER)
    baseComposer.render();

  }, 1);

  return null;
};


export default function GalaxyScene() {
  

  return (
    <>
      <RendererSettings />
      <scene>
        <fogExp2 color={0xEBE2DB} density={0.00003} />
        <Controls
          onAttach={() => { }}
          enableDamping={true}
          enableRotate={true}
          rotateSpeed={0.3}
          dampingFactor={0.1}
        />
        <ambientLight intensity={0.15} color="white" />
      </scene>
      <Galaxy />
      <Bloom />
    </>
  )
}





