import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./CatModel.css";

// Procedural 3D sleeping cat (no external GLB needed) with a slow breathing animation.
function Cat() {
  const group = useRef();
  const body = useRef();
  const fur = { color: "#d9924f", roughness: 0.95, metalness: 0 };
  const light = { color: "#f3d3a8", roughness: 0.95 };
  const pink = { color: "#f2a1a8", roughness: 0.6 };

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const breathe = 1 + Math.sin(t * 1.3) * 0.04;
    body.current.scale.set(1.3 * breathe, 0.8 * breathe, 0.9 * breathe);
    group.current.rotation.y = -0.55 + Math.sin(t * 0.3) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.35, -0.55, 0]} position={[0, -0.2, 0]}>
      <mesh ref={body}><sphereGeometry args={[1, 48, 48]} /><meshStandardMaterial {...fur} /></mesh>
      {/* belly patch */}
      <mesh position={[0, -0.35, 0.55]} scale={[1, 0.4, 0.5]}><sphereGeometry args={[0.9, 32, 32]} /><meshStandardMaterial {...light} /></mesh>
      {/* head */}
      <group position={[1.05, 0.0, 0.5]} rotation={[0, 0.4, -0.25]}>
        <mesh scale={[1, 0.85, 0.9]}><sphereGeometry args={[0.55, 40, 40]} /><meshStandardMaterial {...fur} /></mesh>
        <mesh position={[0, -0.18, 0.38]} scale={[0.7, 0.45, 0.4]}><sphereGeometry args={[0.5, 24, 24]} /><meshStandardMaterial {...light} /></mesh>
        {[-1, 1].map((s) => (
          <group key={s}>
            <mesh position={[s * 0.34, 0.45, 0]} rotation={[0, 0, -s * 0.35]}><coneGeometry args={[0.2, 0.38, 4]} /><meshStandardMaterial {...fur} /></mesh>
            <mesh position={[s * 0.34, 0.43, 0.06]} rotation={[0, 0, -s * 0.35]}><coneGeometry args={[0.11, 0.24, 4]} /><meshStandardMaterial {...pink} /></mesh>
            {/* closed, sleeping eyes */}
            <mesh position={[s * 0.2, 0.05, 0.47]} rotation={[0, 0, Math.PI]}><torusGeometry args={[0.07, 0.015, 8, 24, Math.PI]} /><meshStandardMaterial color="#3a2417" /></mesh>
          </group>
        ))}
        <mesh position={[0, -0.05, 0.52]}><sphereGeometry args={[0.045, 16, 16]} /><meshStandardMaterial {...pink} /></mesh>
      </group>
      {/* front paws tucked under the chin */}
      {[-0.18, 0.18].map((z, i) => (
        <mesh key={i} position={[0.85, -0.55, 0.75 + z]} scale={[1.2, 0.7, 0.8]}><sphereGeometry args={[0.22, 24, 24]} /><meshStandardMaterial {...light} /></mesh>
      ))}
      {/* tail wrapped around the body */}
      <mesh position={[-0.2, -0.55, 0]} rotation={[Math.PI / 2, 0, 0.6]}>
        <torusGeometry args={[1.05, 0.16, 20, 64, Math.PI * 1.25]} /><meshStandardMaterial {...fur} />
      </mesh>
      {/* tabby stripes */}
      {[-0.6, -0.2, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.62, 0.15]} rotation={[0, 0, 0.1 * i]} scale={[0.07, 0.25, 0.5]}><sphereGeometry args={[1, 12, 12]} /><meshStandardMaterial color="#9a5a25" roughness={1} /></mesh>
      ))}
    </group>
  );
}

export default function CatModel() {
  return (
    <div className="cat-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.8, 5.6], fov: 36 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.9} />
        <hemisphereLight args={["#fff1dd", "#6b5b8a", 0.7]} />
        <directionalLight position={[3, 4, 4]} intensity={1.8} />
        <pointLight position={[-3, 1, 2]} intensity={0.8} color="#ffb4c4" />
        <Cat />
      </Canvas>
      <span className="zzz z1">z</span><span className="zzz z2">Z</span><span className="zzz z3">z</span>
    </div>
  );
}
