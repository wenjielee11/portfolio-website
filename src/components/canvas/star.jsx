"use client"
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { starTypes} from '../../helpers/config/starDistribution.js';
import {BASE_LAYER, BLOOM_LAYER, OVERLAY_LAYER, STAR_MAX, STAR_MIN } from '../../helpers/config/renderConfig.js'
import { clamp } from '../../helpers/utils.js';


const Star = ({position}) => {
  const spriteRef = useRef();
  const { camera, scene } = useThree();
  const texture = new THREE.TextureLoader().load("/textures/sprite120.png");
  const materials = starTypes.color.map((color) => new THREE.SpriteMaterial({ map: texture, color: color} )
  );
  let starType; 

  const generateStarType = () =>{
    let num = Math.random()*100.0
        let pct = starTypes.percentage
        // Calculates the bin of which the star should be in. If the
        // Random num generated is within 0.7, it will go into that star type.
        for(let i=0;i<pct.length;i++){
            num-=pct[i]
            // Return the index of the star type.
            if(num<0) {return i}
        }
        return 0
  }
  useEffect(() => {
    starType = generateStarType(); // Adapt generateStarType method from your file
    const sprite = new THREE.Sprite(materials[starType]);
    sprite.layers.set(BLOOM_LAYER);
    sprite.scale.multiplyScalar(starTypes.size[starType])
    sprite.position.copy(position);
    spriteRef.current = sprite;
    scene.add(sprite);

  }, [materials, scene]);

  useFrame(() => {
    if (spriteRef.current) {
      let dist = position.distanceTo(camera.position) / 250;
      let starSize = clamp(dist * starTypes.size[starType], STAR_MIN, STAR_MAX); // Assuming starType 0 for simplicity
      spriteRef.current.scale.set(starSize, starSize, starSize);
    }
  });

  return null; // The sprite is directly added to the scene
};

export default Star;
