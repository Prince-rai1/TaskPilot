import ProjectCard, { type ProjectData } from './ProjectCard';

interface ProjectGridProps {
  projects: ProjectData[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="tf-projects-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
