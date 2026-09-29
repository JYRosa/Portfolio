import skillGroups from '../data/skills.js'

function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <p className="section-label">SKILLS</p>
        <h2 id="skills-title">Technical Skills</h2>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article key={group.category} className="skill-group">
              <h3>{group.category}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
