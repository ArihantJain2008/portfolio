import type { HoveredTechNode } from "../Character/Scene";
import "./TechLabel.css";

interface TechLabelProps {
  hoveredNode: HoveredTechNode | null;
}

function TechLabel({ hoveredNode }: TechLabelProps) {
  if (!hoveredNode) {
    return null;
  }

  return (
    <div
      className="tech-label"
      style={{
        left: hoveredNode.x,
        top: hoveredNode.y,
        borderColor: `${hoveredNode.color}66`,
        boxShadow: `0 12px 32px ${hoveredNode.color}22`,
      }}
    >
      <span
        className="tech-label__dot"
        style={{ backgroundColor: hoveredNode.color }}
      />
      {hoveredNode.name}
    </div>
  );
}

export default TechLabel;
