import { useEffect, useEffectEvent, useRef } from "react";

import type { TechNodeData } from "../../data/techStack";
import { initScene, type HoveredTechNode } from "./Scene";

interface CharacterProps {
  techNodes: readonly TechNodeData[];
  onNodeSelect: (nodeId: string) => void;
  onNodeHover: (node: HoveredTechNode | null) => void;
  onCoreActivate: () => void;
}

function Character({
  techNodes,
  onNodeSelect,
  onNodeHover,
  onCoreActivate,
}: CharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNodeSelect = useEffectEvent((nodeId: string) => {
    onNodeSelect(nodeId);
  });

  const handleNodeHover = useEffectEvent((node: HoveredTechNode | null) => {
    onNodeHover(node);
  });

  const handleCoreActivate = useEffectEvent(() => {
    onCoreActivate();
  });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const cleanup = initScene(containerRef.current, {
      techNodes,
      onNodeSelect: handleNodeSelect,
      onNodeHover: handleNodeHover,
      onCoreActivate: handleCoreActivate,
    });

    return cleanup;
  }, [techNodes]);

  return <div ref={containerRef} className="character-scene" />;
}

export default Character;
