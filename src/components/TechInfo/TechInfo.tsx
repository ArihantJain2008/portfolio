import type { TechNodeData } from "../../data/techStack";
import "./TechInfo.css";

interface TechInfoProps {
  techNode: TechNodeData;
  hoveredTechNode: TechNodeData | null;
  highlightedProjects: readonly string[];
  onClose?: () => void;
}

function TechInfo({
  techNode,
  hoveredTechNode,
  highlightedProjects,
  onClose,
}: TechInfoProps) {
  const activeHoverName =
    hoveredTechNode && hoveredTechNode.id !== techNode.id
      ? hoveredTechNode.name
      : null;
  const hasHighlightedProjects = highlightedProjects.length > 0;

  return (
    <aside className="tech-info" aria-live="polite">
      <div className="tech-info__header">
        <p className="tech-info__eyebrow">Technology Node</p>
        {onClose ? (
          <button
            type="button"
            className="tech-info__close"
            onClick={onClose}
            aria-label={`Close ${techNode.name} details`}
          >
            Close
          </button>
        ) : null}
      </div>

      <h2 className="tech-info__title">{techNode.name}</h2>

      {activeHoverName ? (
        <p className="tech-info__meta">
          Shared project overlap with <span>{activeHoverName}</span>
        </p>
      ) : null}

      <p className="tech-info__section-title">Projects</p>

      <ul className="tech-info__projects">
        {techNode.projects.map((project) => {
          const isHighlighted =
            !hasHighlightedProjects || highlightedProjects.includes(project);

          return (
            <li
              key={project}
              className={
                isHighlighted
                  ? "tech-info__project tech-info__project--highlighted"
                  : "tech-info__project tech-info__project--dimmed"
              }
            >
              {project}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default TechInfo;
