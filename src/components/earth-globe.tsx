"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function EarthGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeRef = useRef<THREE.Object3D | null>(null);
  const logoMeshRef = useRef<THREE.Mesh | null>(null);
  const logoMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    // Dynamic imports to avoid SSR issues
    const initGlobe = async () => {
      const THREE = await import('three');
      const ThreeGlobe = (await import('three-globe')).default;

      const container = mountRef.current;
      if (!container) return;
      
      const width = 320;
      const height = 320;

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 300;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      // Clear container and add renderer
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // Create globe
      const globe = new ThreeGlobe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');

      globeRef.current = globe;
      scene.add(globe);

      // Load and create Akash VPN logo
      const textureLoader = new THREE.TextureLoader();
      const logoTexture = textureLoader.load('/akash_vpn_dark.png');
      
      // Create logo plane with proper aspect ratio (logo is roughly 3:1 ratio)
      const logoGeometry = new THREE.PlaneGeometry(100, 33);
      const logoMaterial = new THREE.MeshBasicMaterial({
        map: logoTexture,
        transparent: true,
        opacity: 0.9,
        alphaTest: 0.1,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending
      });
      
      const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
      
      // Position logo to overlay the center of the globe (globe radius is ~100)
      logoMesh.position.set(0, 0, 105);
      logoMesh.rotation.x = 0; // Face the camera directly
      
      // Store references for animation
      logoMeshRef.current = logoMesh;
      logoMaterialRef.current = logoMaterial;
      
      scene.add(logoMesh);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      // Add some atmospheric glow
      const atmosphereGeometry = new THREE.SphereGeometry(102, 64, 64);
      const atmosphereMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
          }
        `
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);

      // Animation loop
      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        
        // Rotate globe
        if (globe) {
          globe.rotation.y += 0.005;
        }
        
        // Rotate atmosphere slightly differently for effect
        if (atmosphere) {
          atmosphere.rotation.y += 0.003;
        }

        // Animate logo with subtle overlay effects
        if (logoMeshRef.current && logoMaterialRef.current) {
          const time = Date.now() * 0.001;
          
          // Gentle rotation to follow globe rotation but slightly offset
          logoMeshRef.current.rotation.z = Math.sin(time * 0.2) * 0.02;
          
          // Subtle opacity pulsing for brand prominence
          logoMaterialRef.current.opacity = 0.85 + Math.sin(time * 0.6) * 0.1;
        }

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        if (renderer && camera) {
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        window.removeEventListener('resize', handleResize);
        
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        
        if (renderer) {
          renderer.dispose();
        }
        
        if (scene) {
          scene.clear();
        }
      };
    };

    initGlobe();
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="w-80 h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative w-80 h-80 mx-auto">
      <div 
        ref={mountRef} 
        className="w-full h-full rounded-full overflow-hidden shadow-2xl"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, transparent 70%)'
        }}
      />
      
    </div>
  );
}
