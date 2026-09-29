import { Link } from 'react-router-dom'

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div
        className="image-placeholder"
        role="img"
        aria-label={`${project.title} 이미지가 들어갈 영역`}
      >
        Project Image Placeholder
      </div>
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label={`${project.title} 기술 스택`}>
          {project.techStack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="button-group">
          <Link className="button" to={`/projects/${project.id}`}>
            View Project
          </Link>
          {project.links.github && (
            <a
              className="button button-secondary"
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          {project.links.demo && (
            <a
              className="button button-secondary"
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
