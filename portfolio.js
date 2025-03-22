import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import projectsData from "@/data/projects.json";

function Earth({ scrollProgress }) {
  const earthRef = useRef();

  useFrame(({ mouse }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
      earthRef.current.rotation.x = mouse.y * 0.1;
      earthRef.current.rotation.z = mouse.x * 0.1;
    }
  });

  return (
    <Sphere ref={earthRef} args={[1, 64, 64]} position={[0, 0, -5 - scrollProgress * 10]}>
      <meshStandardMaterial map={null} color="blue" />
    </Sphere>
  );
}

function Scene({ scrollProgress }) {
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Stars />
      <Earth scrollProgress={scrollProgress} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default function Portfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(window.scrollY / maxScroll);
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div className="relative h-screen text-white bg-black overflow-hidden">
      <Scene scrollProgress={scrollProgress} />
      <div className="relative z-10 flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">My 3D Portfolio</h1>
      </div>
      <div className="relative z-10 space-y-20 px-6">
        {projectsData.projects.map((project, index) => (
          <div key={index} className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-semibold">{project.name}</h2>
            <p className="text-gray-400">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
