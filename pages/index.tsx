import { NextPage } from "next";
import { useRef, useState } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";

const Box = ({ position }: { position: number[] }) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<MeshProps>();

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(() => {
    const obj = ref.current;

    if (!obj) return;

    obj.rotation.x += 0.01;
  });

  return (
    <mesh
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      position={position}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default Home;
