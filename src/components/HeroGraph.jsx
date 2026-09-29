import { useState } from 'react'
import { Link } from 'react-router-dom'
import projects from '../data/projects.js'

// 그래프 좌표(px). sections.css의 .hero-graph 크기(480×440)와 같아야 합니다.
const GRAPH_WIDTH = 480
const GRAPH_HEIGHT = 440
const SKILL_X = 92
const PROJECT_X = 208
const NODE_TOP = 50
const NODE_BOTTOM = 410
const SKILL_RADIUS = 5
const PROJECT_RADIUS = 7

// count개의 노드를 세로 중앙 기준으로 gap 간격(최대 maxGap)으로 배치합니다.
function distribute(count, maxGap) {
  const center = (NODE_TOP + NODE_BOTTOM) / 2
  if (count <= 1) return [center]

  const gap = Math.min(maxGap, (NODE_BOTTOM - NODE_TOP) / (count - 1))
  return Array.from(
    { length: count },
    (_, index) => center + (index - (count - 1) / 2) * gap,
  )
}

function edgePath(skillY, projectY) {
  const startX = SKILL_X + SKILL_RADIUS
  const endX = PROJECT_X - PROJECT_RADIUS
  const bend = (endX - startX) / 2

  return `M ${startX} ${skillY} C ${startX + bend} ${skillY}, ${endX - bend} ${projectY}, ${endX} ${projectY}`
}

function HeroGraph({ skills }) {
  // { type: 'skill' | 'project', id }
  const [active, setActive] = useState(null)

  const skillYs = distribute(skills.length, 60)
  const projectYs = distribute(projects.length, 120)

  // 모든 기술 × 프로젝트를 잇는 선(완전 연결층)을 그리고, techStack에 있는 연결만 실제 연결로 표시합니다.
  const edges = skills.flatMap((skill, skillIndex) =>
    projects.map((project, projectIndex) => ({
      key: `${skill}-${project.id}`,
      skill,
      projectId: project.id,
      isLinked: project.techStack.includes(skill),
      d: edgePath(skillYs[skillIndex], projectYs[projectIndex]),
    })),
  )

  const isEdgeLit = (edge) => {
    if (!active || !edge.isLinked) return false
    return active.type === 'project'
      ? edge.projectId === active.id
      : edge.skill === active.id
  }

  const litEdges = edges.filter(isEdgeLit)
  const litSkills = new Set(litEdges.map((edge) => edge.skill))
  const litProjects = new Set(litEdges.map((edge) => edge.projectId))
  if (active?.type === 'skill') litSkills.add(active.id)
  if (active?.type === 'project') litProjects.add(active.id)

  const activate = (type, id) => setActive({ type, id })
  const deactivate = (id) =>
    setActive((current) => (current?.id === id ? null : current))

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') setActive(null)
  }

  return (
    <div
      className={active ? 'hero-graph has-active' : 'hero-graph'}
      onKeyDown={handleKeyDown}
    >
      <svg
        className="graph-edges"
        viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
        width={GRAPH_WIDTH}
        height={GRAPH_HEIGHT}
        aria-hidden="true"
        focusable="false"
      >
        {edges.map((edge, index) => {
          const classNames = ['graph-edge']
          if (edge.isLinked) classNames.push('is-linked')
          if (isEdgeLit(edge)) classNames.push('is-lit')

          return (
            <path
              key={edge.key}
              className={classNames.join(' ')}
              d={edge.d}
              pathLength="1"
              style={{ '--i': index }}
            />
          )
        })}
        {edges
          .filter((edge) => edge.isLinked)
          .map((edge, index) => (
            <path
              key={`${edge.key}-signal`}
              className={
                isEdgeLit(edge) ? 'graph-signal is-lit' : 'graph-signal'
              }
              d={edge.d}
              pathLength="1"
              style={{ '--i': index }}
            />
          ))}
      </svg>

      <span className="graph-caption graph-caption-skills" aria-hidden="true">
        SKILLS
      </span>
      <span className="graph-caption graph-caption-projects" aria-hidden="true">
        PROJECTS
      </span>

      {/* 왼쪽 대표 기술 칩과 같은 내용이라 보조기기에서는 숨깁니다. */}
      <ul className="graph-skills" aria-hidden="true">
        {skills.map((skill, index) => (
          <li
            key={skill}
            className={litSkills.has(skill) ? 'graph-skill is-lit' : 'graph-skill'}
            style={{ '--x': `${SKILL_X}px`, '--y': `${skillYs[index]}px` }}
            onPointerEnter={() => activate('skill', skill)}
            onPointerLeave={() => deactivate(skill)}
          >
            <span className="graph-dot" />
            <span className="graph-skill-label">{skill}</span>
          </li>
        ))}
      </ul>

      <ul className="graph-projects" aria-label="대표 프로젝트">
        {projects.map((project, index) => {
          const isOpen = active?.type === 'project' && active.id === project.id
          const classNames = ['graph-project']
          if (litProjects.has(project.id)) classNames.push('is-lit')
          if (isOpen) classNames.push('is-open')

          const titleId = `hero-graph-${project.id}-title`
          const summaryId = `hero-graph-${project.id}-summary`
          const anchor = projects.length > 1 ? index / (projects.length - 1) : 0.5

          return (
            <li
              key={project.id}
              className={classNames.join(' ')}
              style={{
                '--x': `${PROJECT_X}px`,
                '--y': `${projectYs[index]}px`,
                '--anchor': anchor,
              }}
            >
              <Link
                className="graph-project-link"
                to={`/projects/${project.id}`}
                aria-labelledby={titleId}
                aria-describedby={summaryId}
                onPointerEnter={() => activate('project', project.id)}
                onPointerLeave={() => deactivate(project.id)}
                onFocus={() => activate('project', project.id)}
                onBlur={() => deactivate(project.id)}
              >
                <span className="graph-dot" aria-hidden="true" />
                <span className="graph-project-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span id={titleId} className="graph-project-title">
                  {project.title}
                </span>

                {/* 미리보기 카드: 링크 안에 있어 카드 위로 마우스를 옮겨도 유지되고, 클릭하면 상세로 이동합니다. */}
                <span className="graph-card" aria-hidden="true">
                  <span className="graph-card-title">{project.title}</span>
                  <span id={summaryId} className="graph-card-summary">
                    {project.summary}
                  </span>
                  <span className="graph-card-tags">
                    {project.techStack.map((technology) => (
                      <span
                        key={technology}
                        className={
                          skills.includes(technology) ? 'is-match' : undefined
                        }
                      >
                        {technology}
                      </span>
                    ))}
                  </span>
                  <span className="graph-card-cta">View Project</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default HeroGraph
