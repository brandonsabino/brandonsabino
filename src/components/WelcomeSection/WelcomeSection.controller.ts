// WelcomeSection Controller - Three.js ASCII hexagon animation logic

import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { colors, layout } from '../../constants/theme';

export interface WelcomeSectionRefs {
  container: HTMLDivElement;
  effect: AsciiEffect | null;
  renderer: THREE.WebGLRenderer | null;
  frameId: number;
}

export interface WelcomeSectionCleanup {
  (): void;
}

/**
 * Initialize the Three.js ASCII hexagon scene
 */
export const initializeScene = (container: HTMLDivElement): {
  cleanup: WelcomeSectionCleanup;
  refs: Partial<WelcomeSectionRefs>;
} => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  const scene = new THREE.Scene();
  scene.background = null;

  // Camera
  const camera = new THREE.PerspectiveCamera(70, width / height, 1, 2000);
  camera.position.z = layout.welcome.cameraZ;

  // Lighting
  const lights = createLighting();
  lights.forEach((light) => scene.add(light));

  // Hexagon mesh
  const { mesh: hexagon, geometry, material } = createHexagonMesh();
  scene.add(hexagon);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  // ASCII Effect
  const effect = createAsciiEffect(renderer, width, height);
  container.appendChild(effect.domElement);

  // Animation
  const startTime = Date.now();
  let frameId = 0;

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const elapsed = Date.now() - startTime;
    updateHexagonAnimation(hexagon, elapsed);
    effect.render(scene, camera);
  };

  animate();

  // Resize handler
  const handleResize = () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
    effect.setSize(newWidth, newHeight);
  };

  window.addEventListener('resize', handleResize);

  // Cleanup function
  const cleanup = () => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(frameId);

    if (effect.domElement?.parentNode) {
      effect.domElement.parentNode.removeChild(effect.domElement);
    }

    renderer.dispose();
    geometry.dispose();
    material.dispose();
  };

  return {
    cleanup,
    refs: { effect, renderer, frameId },
  };
};

/**
 * Create scene lighting
 */
const createLighting = (): THREE.PointLight[] => {
  const light1 = new THREE.PointLight(0xffffff, 4, 0, 0);
  light1.position.set(600, 600, 600);

  const light2 = new THREE.PointLight(0xffffff, 2, 0, 0);
  light2.position.set(-600, -600, -600);

  return [light1, light2];
};

/**
 * Create the hexagonal prism mesh
 */
const createHexagonMesh = () => {
  const geometry = new THREE.CylinderGeometry(
    layout.welcome.hexRadius,
    layout.welcome.hexRadius,
    layout.welcome.hexHeight,
    6
  );

  const material = new THREE.MeshPhongMaterial({
    flatShading: true,
    color: colors.berylliumGoldHex,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2; // Flat-top orientation

  return { mesh, geometry, material };
};

/**
 * Create and configure ASCII effect
 */
const createAsciiEffect = (
  renderer: THREE.WebGLRenderer,
  width: number,
  height: number
): AsciiEffect => {
  const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: false });
  effect.setSize(width, height);

  const style = effect.domElement.style;
  style.color = colors.berylliumGold;
  style.backgroundColor = 'transparent';
  style.position = 'absolute';
  style.top = '0';
  style.left = '0';
  style.width = '100%';
  style.height = '100%';
  style.pointerEvents = 'none';
  style.mixBlendMode = 'screen';

  return effect;
};

/**
 * Update hexagon rotation and position per frame
 */
const updateHexagonAnimation = (hexagon: THREE.Mesh, elapsed: number): void => {
  // Tumbling rotation
  hexagon.rotation.x = Math.PI / 2 + elapsed * 0.0005;
  hexagon.rotation.y = elapsed * 0.0003;
  hexagon.rotation.z = elapsed * 0.0002;

  // Gentle floating motion
  hexagon.position.y = Math.sin(elapsed * 0.001) * 30;
};
