"use client"
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { starTypes } from '../../helpers/config/starDistribution.js';
import { BLOOM_LAYER, STAR_MAX, STAR_MIN } from '../../helpers/config/renderConfig.js'
import { clamp } from '../../helpers/utils.js';

const StarField = ({ positions }) => {
  const groupRef = useRef();
  const { camera, scene } = useThree();
  
  const texture = useMemo(() => new THREE.TextureLoader().load("/textures/sprite120.png"), []);
  const starGroups = useRef([]);
  
  const starTypeArray = useMemo(() => {
    return positions.map(() => {
      let num = Math.random() * 100.0;
      let pct = starTypes.percentage;
      for (let i = 0; i < pct.length; i++) {
        num -= pct[i];
        if (num < 0) return i;
      }
      return 0;
    });
  }, [positions]);

  useEffect(() => {
    // Create materials for each star type
    const materials = starTypes.color.map(color => 
      new THREE.SpriteMaterial({ 
        map: texture, 
        color: color,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    );

    // Group stars by type
    const starsByType = positions.reduce((acc, pos, index) => {
      const type = starTypeArray[index];
      if (!acc[type]) acc[type] = [];
      acc[type].push({ pos, type });
      return acc;
    }, {});

    // Create sprites for each star type
    Object.entries(starsByType).forEach(([type, stars]) => {
      const group = new THREE.Group();
      stars.forEach(({ pos }) => {
        const sprite = new THREE.Sprite(materials[type]);
        sprite.position.copy(pos);
        sprite.scale.setScalar(starTypes.size[type]);
        sprite.layers.set(BLOOM_LAYER);
        group.add(sprite);
      });
      scene.add(group);
      starGroups.current[type] = group;
    });

    return () => {
      starGroups.current.forEach(group => scene.remove(group));
    };
  }, [positions, scene, texture]);

  useFrame(() => {
    starGroups.current.forEach((group, typeIndex) => {
      if (!group) return;
      group.children.forEach((sprite) => {
        const dist = sprite.position.distanceTo(camera.position) / 250;
        const starSize = clamp(dist * starTypes.size[typeIndex], STAR_MIN, STAR_MAX);
        sprite.scale.setScalar(starSize);
      });
    });
  });

  return null;
};

export default StarField;
