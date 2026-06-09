import { startTransition, useState } from "react";

import {
  getSharedProjectsBetweenTechnologies,
  getTechNodeById,
  techNodes,
} from "../../data/techStack";
import Character from "../Character/Character";
import type { HoveredTechNode } from "../Character/Scene";
import TechInfo from "../TechInfo/TechInfo";
import TechLabel from "../TechLabel/TechLabel";
import "./Hero.css";

function Hero() {
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<HoveredTechNode | null>(null);

  const selectedTechNode = selectedTechId
    ? getTechNodeById(selectedTechId) ?? null
    : null;

  const hoveredTechNode = hoveredNode
    ? getTechNodeById(hoveredNode.id) ?? null
    : null;

  const highlightedProjects =
    selectedTechId && hoveredNode
      ? getSharedProjectsBetweenTechnologies(selectedTechId, hoveredNode.id)
      : [];

  const handleNodeSelect = (nodeId: string) => {
    startTransition(() => {
      setSelectedTechId(nodeId);
    });
  };

  const handleNodeHover = (node: HoveredTechNode | null) => {
    setHoveredNode((current) => {
      if (!node) {
        return current ? null : current;
      }

      if (
        current &&
        current.id === node.id &&
        Math.abs(current.x - node.x) < 0.75 &&
        Math.abs(current.y - node.y) < 0.75
      ) {
        return current;
      }

      return node;
    });
  };

  return (
    <section className="hero">
      <div className="hero-left">
        <h3>Hello, I'm</h3>
        <h1>Arihant Jain</h1>
        <p>Full Stack Developer</p>
      </div>

      <div className="hero-center">
        <Character
          techNodes={techNodes}
          onNodeSelect={handleNodeSelect}
          onNodeHover={handleNodeHover}
        />
        <TechLabel hoveredNode={hoveredNode} />
      </div>

      <div className="hero-right">
        <p className="hero-copy">
          Building futuristic web experiences using React, Three.js, and AI.
          Hover the graph to inspect the stack, then click a node to lock in its
          project context.
        </p>

        <TechInfo
          techNode={selectedTechNode}
          hoveredTechNode={hoveredTechNode}
          highlightedProjects={highlightedProjects}
          onClose={() => setSelectedTechId(null)}
        />
      </div>
    </section>
  );
}

export default Hero;
