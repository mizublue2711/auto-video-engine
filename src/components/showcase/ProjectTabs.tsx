// src/components/showcase/ProjectTabs.tsx
import React from 'react';
import { SHOWCASE_PROJECTS } from '../../data/projects';
import { ProjectComprehensive } from '../../data/types';

interface ProjectTabsProps {
  activeProjectId: string;
  onSelectProject: (project: ProjectComprehensive) => void;
}

const getTabLabel = (project: ProjectComprehensive): string => {
  if (project.id === 'chai-meritz-2611') {
    return '🔥 Chai Communication (Joseon 2611)';
  }
  if (project.id === 'crabit-korea') {
    return '📱 Crabit Korea (3D Spatial)';
  }
  return project.title;
};

export const ProjectTabs: React.FC<ProjectTabsProps> = ({
  activeProjectId,
  onSelectProject,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
      {SHOWCASE_PROJECTS.map((project, index) => {
        const isActive = project.id === activeProjectId;
        return (
          <button
            key={project.id}
            onClick={() => onSelectProject(project)}
            style={{
              borderColor: isActive ? project.themeColor : undefined,
              boxShadow: isActive ? `0 0 24px ${project.themeColor}28` : undefined,
            }}
            className={`px-4 py-2.5 bg-[#0A0C14] border text-left transition-all font-mono cursor-pointer flex items-center gap-3 ${
              isActive
                ? 'text-white'
                : 'border-[#1F1F2E] text-[#8A8FA3] hover:border-slate-500 hover:text-white'
            }`}
          >
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 border"
              style={{
                color: project.themeColor,
                borderColor: `${project.themeColor}55`,
                backgroundColor: `${project.themeColor}14`,
              }}
            >
              0{index + 1} // {project.aspectRatio}
            </span>
            <div>
              <div className="text-xs font-bold tracking-wide">{getTabLabel(project)}</div>
              <div className="text-[10px] text-[#8A8FA3]">{project.categoryBadge}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
