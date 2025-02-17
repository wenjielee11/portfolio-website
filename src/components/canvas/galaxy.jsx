"use client"
import * as THREE from 'three'
import { Suspense, useEffect, useState } from 'react';
import { ARMS, ARM_X_DIST, ARM_X_MEAN, ARM_Y_DIST, ARM_Y_MEAN, CORE_X_DIST, CORE_Y_DIST, GALAXY_THICKNESS, HAZE_RATIO, NUM_STARS, OUTER_CORE_X_DIST, OUTER_CORE_Y_DIST } from '../../helpers/config/galaxyConfig';
import { gaussianRandom, spiral } from '../../helpers/utils.js';
import dynamic from 'next/dynamic';

const StarField = dynamic(() => import('./starField').then(mod => mod.default), {
  ssr: false,
});

const Haze = dynamic(() => import('./haze').then(mod => mod.default), {
  ssr: false,
});

const generateStars = () => {
  //stdev: standard deviation
  let stars = []

  // Render the inner core of star clusters
  for (let i = 0; i < NUM_STARS / 4; i++) {
    let pos = new THREE.Vector3(gaussianRandom(0, CORE_X_DIST), gaussianRandom(0, CORE_Y_DIST), gaussianRandom(0, GALAXY_THICKNESS))

    stars.push(pos)
  }

  // Render the outer core of star clusters, adds more blending between the arms
  for (let i = 0; i < NUM_STARS / 4; i++) {
    let pos = new THREE.Vector3(gaussianRandom(0, OUTER_CORE_X_DIST), gaussianRandom(0, OUTER_CORE_Y_DIST), gaussianRandom(0, GALAXY_THICKNESS))
    stars.push(pos)
  }

  // Render the spiral
  for (let j = 0; j < ARMS; j++) {
    for (let i = 0; i < NUM_STARS / 4; i++) {
      let pos = spiral(gaussianRandom(ARM_X_MEAN, ARM_X_DIST), gaussianRandom(ARM_Y_MEAN, ARM_Y_DIST), gaussianRandom(0, GALAXY_THICKNESS), j * 2 * Math.PI / ARMS)
      stars.push(pos)
    }
  }
  return stars
}
const generateHaze = () => {
  //stdev: standard deviation
  let hazes = []

  // Render the inner core of star clusters
  for (let i = 0; i < NUM_STARS * HAZE_RATIO / 4; i++) {
    let pos = new THREE.Vector3(gaussianRandom(0, CORE_X_DIST), gaussianRandom(0, CORE_Y_DIST), gaussianRandom(0, GALAXY_THICKNESS))

    hazes.push(pos)
  }

  // Render the outer core of star clusters, adds more blending between the arms
  for (let i = 0; i < NUM_STARS * HAZE_RATIO / 4; i++) {
    let pos = new THREE.Vector3(gaussianRandom(0, OUTER_CORE_X_DIST), gaussianRandom(0, OUTER_CORE_Y_DIST), gaussianRandom(0, GALAXY_THICKNESS))
    hazes.push(pos)
  }

  // Render the spiral
  for (let j = 0; j < ARMS; j++) {
    for (let i = 0; i < NUM_STARS * HAZE_RATIO / 4; i++) {
      let pos = spiral(gaussianRandom(ARM_X_MEAN, ARM_X_DIST), gaussianRandom(ARM_Y_MEAN, ARM_Y_DIST), gaussianRandom(0, GALAXY_THICKNESS), j * 2 * Math.PI / ARMS)
      hazes.push(pos)
    }
  }
  return hazes
}
const Galaxy = () => {
  const [stars, setStars] = useState([]);
  const [haze, setHaze] = useState([]);
  
  useEffect(() => {
    setStars(generateStars());
    setHaze(generateHaze());
  }, [])
  return (
    <Suspense fallback={null}>
      {stars.length > 0 && <StarField positions={stars} />}
      {haze.length > 0 && haze.map((pos, index) => (
        <Haze position={pos} key={index} />
      ))}
    </Suspense>
  );
};

export default Galaxy;
