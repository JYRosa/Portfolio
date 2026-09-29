import HeroGraph from './HeroGraph.jsx'

const featuredSkills = [
  'React',
  'Spring Boot',
  'FastAPI',
  'Python',
  'Docker',
  'RAG',
  'LLM',
]

function Hero() {
  return (
    <section id="home" className="section hero" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-content">
          <p className="section-label">NAME</p>
          <h1 id="hero-title">양재영</h1>
          <p className="hero-role">AI SYSTEM DEVELOPER</p>
          <p className="hero-introduction">
            AI 서비스를 기획하고,
            <br />웹 · 데이터 · AI 기술을 활용해 구현합니다.
          </p>

          <div aria-labelledby="featured-skills-title">
            <h2 id="featured-skills-title" className="subheading">
              Representative Skills
            </h2>
            <ul className="tag-list">
              {featuredSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="button-group">
            <a className="button" href="#projects">
              View Projects
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/JYRosa"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a className="button button-secondary" href="/resume.pdf">
              Resume
            </a>
          </div>
        </div>

        <HeroGraph skills={featuredSkills} />
      </div>
    </section>
  )
}

export default Hero
