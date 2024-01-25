"use client"
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { BASE_LAYER, BLOOM_LAYER, HAZE_MAX, HAZE_MIN, HAZE_OPACITY } from '../../helpers/config/renderConfig';
import { clamp } from '../../helpers/utils';
import * as THREE from 'three';

const Haze = ({ position }) => {
  const spriteRef = useRef();
  const { camera, scene } = useThree();
    const hazeTexture = new THREE.TextureLoader().load("/textures/feathered60.png")
    const hazeSprite = new THREE.SpriteMaterial({map: hazeTexture, color: 0x0082ff, opacity: HAZE_OPACITY, depthTest: false, depthWrite: false})

  useEffect(() => {
    const sprite = new THREE.Sprite(hazeSprite);
    sprite.layers.set(BASE_LAYER);
    spriteRef.current = sprite; // Store a reference to the sprite for useFrame updates
    sprite.position.copy(position)
    // Different sizes of dust clouds
    sprite.scale.multiplyScalar(clamp(HAZE_MAX*Math.random(), HAZE_MIN, HAZE_MAX))
    scene.add(sprite)
  }, [scene]);
  
  useFrame(() => {
    if (spriteRef.current) {
   
    // The clouds should be visible from distance, as the blue light from stars gets refracted.
    // Zooming in, the clouds should be transparent, as upclose the lights from the stars dont get dissipated
    let dist = position.distanceTo(camera.position) / 250
    spriteRef.current.material.opacity = clamp(HAZE_OPACITY*Math.pow(dist/2.5, 2), 0, HAZE_OPACITY)
    spriteRef.current.material.needsUpdate = true
    }
  });

  return (
    <></>
  );
};

export default Haze;