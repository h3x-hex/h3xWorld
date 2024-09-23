import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAtom } from "jotai";
import { Experience } from "../components/Spaces/Experience";
import { SocketManager } from "../components/Spaces/SocketManager";
import { UI, shopModeAtom } from "../components/Spaces/UI";

export default function Spaces () {
    const [shopMode] = useAtom(shopModeAtom);
    return (
      <>
      <SocketManager />
      <div className="h-screen">
        <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
          <color attach="background" args={["#ececec"]} />
          <ScrollControls pages={shopMode ? 4 : 0}>
            <Experience />
          </ScrollControls>
        </Canvas>
        <UI />
      </div>
      </>
      
    );
}