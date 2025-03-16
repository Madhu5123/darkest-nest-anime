
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  className?: string;
}

const ThreeDScene = ({ className = "" }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Create building shapes
    const buildingGroup = new THREE.Group();
    
    // Main building
    const buildingGeometry = new THREE.BoxGeometry(1, 2, 1);
    const buildingMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x444444,
      specular: 0x111111,
      shininess: 30,
      transparent: true,
      opacity: 0.9
    });
    
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    buildingGroup.add(building);
    
    // Second building
    const building2Geometry = new THREE.BoxGeometry(0.8, 1.5, 0.8);
    const building2 = new THREE.Mesh(building2Geometry, buildingMaterial);
    building2.position.set(-1.2, -0.25, 0.2);
    buildingGroup.add(building2);
    
    // Third building
    const building3Geometry = new THREE.BoxGeometry(0.7, 1.8, 0.7);
    const building3 = new THREE.Mesh(building3Geometry, buildingMaterial);
    building3.position.set(1.2, -0.1, -0.2);
    buildingGroup.add(building3);
    
    // Generate windows
    const addWindows = (building: THREE.Mesh, rows: number, cols: number, depth: number) => {
      const geo = building.geometry as THREE.BoxGeometry;
      const width = geo.parameters.width;
      const height = geo.parameters.height;
      
      const windowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff99, transparent: true, opacity: 0.8 });
      const windowSize = 0.05;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const windowGeo = new THREE.BoxGeometry(windowSize, windowSize, windowSize);
          const windowMesh = new THREE.Mesh(windowGeo, windowMaterial);
          
          // Position on front face
          const x = -width/2 + width * (c + 1)/(cols + 1);
          const y = -height/2 + height * (r + 1)/(rows + 1);
          windowMesh.position.set(x, y, depth/2 + 0.01);
          
          building.add(windowMesh);
          
          // Add to back face
          const backWindow = windowMesh.clone();
          backWindow.position.z = -depth/2 - 0.01;
          building.add(backWindow);
          
          // For the sides if building is wide enough
          if (width > 0.6) {
            const sideWindow = windowMesh.clone();
            sideWindow.position.set(depth/2 + 0.01, y, x);
            sideWindow.rotation.y = Math.PI/2;
            building.add(sideWindow);
            
            const sideWindow2 = windowMesh.clone();
            sideWindow2.position.set(-depth/2 - 0.01, y, -x);
            sideWindow2.rotation.y = Math.PI/2;
            building.add(sideWindow2);
          }
        }
      }
    };
    
    addWindows(building, 6, 3, 1);
    addWindows(building2, 4, 2, 0.8);
    addWindows(building3, 5, 2, 0.7);
    
    // Position the buildings towards the right side
    buildingGroup.position.x = 2;
    scene.add(buildingGroup);
    
    // Add a circular platform
    const platformGeometry = new THREE.CylinderGeometry(3, 3, 0.1, 32);
    const platformMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -1.05;
    platform.position.x = 2;
    scene.add(platform);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0x8080ff, 0.5);
    light2.position.set(-5, 5, -5);
    scene.add(light2);
    
    // Add subtle point lights for a city glow effect
    const cityGlow1 = new THREE.PointLight(0xff8844, 0.5, 10);
    cityGlow1.position.set(3, 1, 3);
    scene.add(cityGlow1);
    
    const cityGlow2 = new THREE.PointLight(0x4488ff, 0.5, 10);
    cityGlow2.position.set(-3, 1, -3);
    scene.add(cityGlow2);
    
    // Add subtle fog for depth
    scene.fog = new THREE.FogExp2(0x000000, 0.05);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gently bob the buildings up and down at different rates
      const time = Date.now() * 0.001;
      building.position.y = Math.sin(time * 0.5) * 0.05;
      building2.position.y = -0.25 + Math.sin(time * 0.3 + 1) * 0.05;
      building3.position.y = -0.1 + Math.sin(time * 0.4 + 2) * 0.05;
      
      // Rotate the city lights for dynamic illumination
      cityGlow1.position.x = 3 * Math.cos(time * 0.2);
      cityGlow1.position.z = 3 * Math.sin(time * 0.2);
      
      cityGlow2.position.x = 3 * Math.cos(time * 0.2 + Math.PI);
      cityGlow2.position.z = 3 * Math.sin(time * 0.2 + Math.PI);
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={mountRef} className={`absolute inset-0 -z-10 ${className}`} />;
};

export default ThreeDScene;
