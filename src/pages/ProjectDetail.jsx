import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { getProjectById } from '../data/projects.js'
import useScrollSpy from '../hooks/useScrollSpy.js'

// 좌측 목차 (넓은 화면에서만 표시)
const tocItems = [
  { id: 'overview', title: '프로젝트 개요' },
  { id: 'problem', title: '문제 정의' },
  { id: 'goals', title: '프로젝트 목표' },
  { id: 'features', title: '주요 기능' },
  { id: 'architecture', title: '시스템 아키텍처' },
  { id: 'tech-stack', title: '기술 스택' },
  { id: 'role', title: '담당 역할' },
  { id: 'implementations', title: '핵심 구현 내용' },
  { id: 'challenges', title: '개발 과정에서 발생한 문제' },
  { id: 'solutions', title: '해결 과정' },
  { id: 'results', title: '결과' },
  { id: 'improvements', title: '개선할 점' },
  { id: 'project-links', title: '프로젝트 링크' },
]

const tocIds = tocItems.map((item) => item.id)

function DetailSection({ id, title, children }) {
  return (
    <section id={id} className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function TextList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>{item}</li>
      ))}
    </ul>
  )
}

function ProjectDetail() {
  const { projectId } = useParams()
  const project = getProjectById(projectId)
  const activeSectionId = useScrollSpy(tocIds, {
    enabled: Boolean(project),
    offset: 0.3,
  })

  if (!project) {
    return (
      <main id="main-content" className="page-message container">
        <h1>프로젝트를 찾을 수 없습니다.</h1>
        <p>요청한 프로젝트가 없거나 주소가 변경되었습니다.</p>
        <Link className="button" to="/#projects">
          프로젝트 목록으로 돌아가기
        </Link>
      </main>
    )
  }

  return (
    <>
      <main id="main-content" className="project-detail">
        <header className="detail-header">
          <div className="container">
            <p className="section-label">PROJECT DETAIL</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
        </header>

        <div className="container detail-content">
          <div
            className="image-placeholder image-placeholder-large"
            role="img"
            aria-label={`${project.title} 대표 이미지가 들어갈 영역`}
          >
            Project Detail Image Placeholder
          </div>

          <div className="detail-layout">
            <nav className="detail-toc" aria-label="프로젝트 상세 목차">
              <ol className="toc-list">
                {tocItems.map((item) => {
                  const isActive = activeSectionId === item.id

                  return (
                    <li key={item.id}>
                      <a
                        className={isActive ? 'is-active' : undefined}
                        href={`#${item.id}`}
                        aria-current={isActive ? 'location' : undefined}
                      >
                        {item.title}
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>

            <div className="detail-body">
              <DetailSection id="overview" title="프로젝트 개요">
                <p>{project.overview}</p>
              </DetailSection>
              <DetailSection id="problem" title="문제 정의">
                <p>{project.problem}</p>
              </DetailSection>
              <DetailSection id="goals" title="프로젝트 목표">
                <TextList items={project.goals} />
              </DetailSection>
              <DetailSection id="features" title="주요 기능">
                <TextList items={project.features} />
              </DetailSection>
              <DetailSection id="architecture" title="시스템 아키텍처">
                <div
                  className="architecture-placeholder"
                  role="img"
                  aria-label="시스템 아키텍처 이미지가 들어갈 영역"
                >
                  System Architecture Image Placeholder
                </div>
                <p>{project.architecture}</p>
              </DetailSection>
              <DetailSection id="tech-stack" title="기술 스택">
                <ul className="tag-list">
                  {project.techStack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </DetailSection>
              <DetailSection id="role" title="담당 역할">
                <p>{project.role}</p>
              </DetailSection>
              <DetailSection id="implementations" title="핵심 구현 내용">
                <TextList items={project.implementations} />
              </DetailSection>
              <DetailSection id="challenges" title="개발 과정에서 발생한 문제">
                <TextList items={project.challenges} />
              </DetailSection>
              <DetailSection id="solutions" title="해결 과정">
                <TextList items={project.solutions} />
              </DetailSection>
              <DetailSection id="results" title="결과">
                <TextList items={project.results} />
              </DetailSection>
              <DetailSection id="improvements" title="개선할 점">
                <TextList items={project.improvements} />
              </DetailSection>

              <section
                id="project-links"
                className="detail-section"
                aria-labelledby="project-links-title"
              >
                <h2 id="project-links-title">프로젝트 링크</h2>
                <div className="button-group">
                  <a
                    className="button"
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    className="button button-secondary"
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo
                  </a>
                </div>
              </section>

              <Link className="back-link" to="/#projects">
                ← 메인 프로젝트 목록으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ProjectDetail
