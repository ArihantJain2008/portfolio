import { startTransition, useState } from "react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import {
  getSharedProjectsBetweenTechnologies,
  getTechNodeById,
  techNodes,
} from "../../data/techStack";
import ArihantAI from "../ArihantAI/ArihantAI";
import Character from "../Character/Character";
import type { HoveredTechNode } from "../Character/Scene";
import TechInfo from "../TechInfo/TechInfo";
import TechLabel from "../TechLabel/TechLabel";
import "./Hero.css";

function Hero() {
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<HoveredTechNode | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

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
    <section id="home" className="hero">
      <div className="hero-left">
  <h3>Hello, I'm</h3>
  <h1>Arihant Jain</h1>

  <p>Full Stack Developer</p>

  <div className="social-links">
    <a
      href="https://github.com/ArihantJain2008?tab=overview&from=2026-06-01&to=2026-06-09"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <FaGithub />
    </a>

    <a
      href="https://www.linkedin.com/in/arihant-jain-348501215/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <FaLinkedin />
    </a>
  </div>
</div>

      <div className="hero-center">
        <Character
          techNodes={techNodes}
          onNodeSelect={handleNodeSelect}
          onNodeHover={handleNodeHover}
          onCoreActivate={() => setIsAiOpen(true)}
        />
        <TechLabel hoveredNode={hoveredNode} />
        <ArihantAI isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      </div>
      <div className="hero-right">
        <p className="hero-copy">
          Building futuristic web experiences using React, Three.js, and AI.
          Hover the graph to inspect the stack, click a node to lock project
          context, or click the AI Core to ask Arihant directly.
        </p>

        {selectedTechNode ? (
          <TechInfo
            techNode={selectedTechNode}
            hoveredTechNode={hoveredTechNode}
            highlightedProjects={highlightedProjects}
            onClose={() => setSelectedTechId(null)}
          />
        ) : null}
      </div>
    </section>
  );
}

export default Hero;
