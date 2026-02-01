import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import './WelcomeSection.css';

const WelcomeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<AsciiEffect | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    // Transparent background to show starfield
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 2000);
    camera.position.z = 600;

    // Lighting
    const pointLight1 = new THREE.PointLight(0xffffff, 4, 0, 0);
    pointLight1.position.set(600, 600, 600);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 2, 0, 0);
    pointLight2.position.set(-600, -600, -600);
    scene.add(pointLight2);

    // Create hexagonal prism (CylinderGeometry with 6 radial segments)
    // Thinner prism - reduced height from 160 to 60
    const hexGeometry = new THREE.CylinderGeometry(280, 280, 60, 6);
    const hexMaterial = new THREE.MeshPhongMaterial({
      flatShading: true,
      color: 0xc9a227 // Beryllium gold
    });
    const hexagon = new THREE.Mesh(hexGeometry, hexMaterial);
    // Rotate to show flat top initially
    hexagon.rotation.x = Math.PI / 2;
    scene.add(hexagon);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent
    rendererRef.current = renderer;

    // ASCII Effect - invert: false so dark areas (background) use spaces
    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: false });
    effect.setSize(width, height);
    effect.domElement.style.color = '#c9a227'; // Beryllium gold
    effect.domElement.style.backgroundColor = 'transparent';
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0';
    effect.domElement.style.left = '0';
    effect.domElement.style.width = '100%';
    effect.domElement.style.height = '100%';
    effect.domElement.style.pointerEvents = 'none';
    // Make the table transparent so starfield shows through
    effect.domElement.style.mixBlendMode = 'screen';
    effectRef.current = effect;

    container.appendChild(effect.domElement);

    const startTime = Date.now();

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      const elapsed = Date.now() - startTime;

      // Tumbling rotation
      hexagon.rotation.x = Math.PI / 2 + elapsed * 0.0005;
      hexagon.rotation.y = elapsed * 0.0003;
      hexagon.rotation.z = elapsed * 0.0002;

      // Gentle floating motion
      hexagon.position.y = Math.sin(elapsed * 0.001) * 30;

      effect.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      effect.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);

      if (effect.domElement && effect.domElement.parentNode) {
        effect.domElement.parentNode.removeChild(effect.domElement);
      }

      renderer.dispose();
      hexGeometry.dispose();
      hexMaterial.dispose();
    };
  }, []);

  return (
    <section className="welcome-section">
      <div className="welcome-content">
        <div className="ascii-container" ref={containerRef} />
        <div className="name-container">
          <h1 className="welcome-name">Brandon Sabino</h1>
          <p className="welcome-subtitle">Software Engineer</p>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
};

export default WelcomeSection;
