import projects from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <p className="section-label">PROJECTS</p>
        <h2 id="projects-title">Featured Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
