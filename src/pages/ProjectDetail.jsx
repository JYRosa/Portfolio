import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { getProjectById } from '../data/projects.js'
import useScrollSpy from '../hooks/useScrollSpy.js'

// 좌측 목차 (넓은 화면에서만 표시)
// key는 projects.js의 필드명이며, 내용이 없는 섹션은 목차와 본문에서 모두 생략합니다.
const tocItems = [
  { id: 'overview', key: 'overview', title: '프로젝트 개요' },
  { id: 'problem', key: 'problem', title: '문제 정의' },
  { id: 'goals', key: 'goals', title: '프로젝트 목표' },
  { id: 'features', key: 'features', title: '주요 기능' },
  { id: 'architecture', key: 'architecture', title: '시스템 아키텍처' },
  { id: 'tech-stack', key: 'techStack', title: '기술 스택' },
  { id: 'role', key: 'role', title: '담당 역할' },
  { id: 'implementations', key: 'implementations', title: '핵심 구현 내용' },
  { id: 'challenges', key: 'challenges', title: '개발 과정에서 발생한 문제' },
  { id: 'solutions', key: 'solutions', title: '해결 과정' },
  { id: 'results', key: 'results', title: '결과' },
  { id: 'improvements', key: 'improvements', title: '개선할 점' },
]

const hasContent = (value) =>
  Array.isArray(value) ? value.length > 0 : Boolean(value)

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
  const visibleTocItems = project
    ? tocItems.filter((item) => hasContent(project[item.key]))
    : []
  const activeSectionId = useScrollSpy(
    visibleTocItems.map((item) => item.id),
    {
      enabled: Boolean(project),
      useScrollMargin: true,
    },
  )

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

  const has = (key) => hasContent(project[key])
  const hasLinks = project.links.github || project.links.link

  return (
    <>
      <main id="main-content" className="project-detail">
        <header className="detail-header">
          <div className="container">
            <p className="section-label">PROJECT DETAIL</p>
            <h1>{project.title}</h1>
            <p className="detail-summary">{project.summary}</p>
            {hasLinks && (
              <div className="button-group">
                {project.links.github && (
                  <a
                    className="button"
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {project.links.link && (
                  <a
                    className="button button-secondary"
                    href={project.links.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LINK
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="container detail-content">
          {project.image ? (
            <figure className="detail-image">
              <img
                src={`${import.meta.env.BASE_URL}${project.image}`}
                alt={project.imageAlt ?? `${project.title} 메인 화면`}
              />
            </figure>
          ) : (
            <div
              className="image-placeholder image-placeholder-large"
              role="img"
              aria-label={`${project.title} 대표 이미지가 들어갈 영역`}
            >
              Project Detail Image Placeholder
            </div>
          )}

          <div className="detail-layout">
            <nav className="detail-toc" aria-label="프로젝트 상세 목차">
              <ol className="toc-list">
                {visibleTocItems.map((item) => {
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
              {has('overview') && (
                <DetailSection id="overview" title="프로젝트 개요">
                  <p>{project.overview}</p>
                </DetailSection>
              )}
              {has('problem') && (
                <DetailSection id="problem" title="문제 정의">
                  <p>{project.problem}</p>
                </DetailSection>
              )}
              {has('goals') && (
                <DetailSection id="goals" title="프로젝트 목표">
                  <TextList items={project.goals} />
                </DetailSection>
              )}
              {has('features') && (
                <DetailSection id="features" title="주요 기능">
                  <TextList items={project.features} />
                </DetailSection>
              )}
              {has('architecture') && (
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
              )}
              {has('techStack') && (
                <DetailSection id="tech-stack" title="기술 스택">
                  <ul className="tag-list">
                    {project.techStack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </DetailSection>
              )}
              {has('role') && (
                <DetailSection id="role" title="담당 역할">
                  <p>{project.role}</p>
                </DetailSection>
              )}
              {has('implementations') && (
                <DetailSection id="implementations" title="핵심 구현 내용">
                  <TextList items={project.implementations} />
                </DetailSection>
              )}
              {has('challenges') && (
                <DetailSection id="challenges" title="개발 과정에서 발생한 문제">
                  <TextList items={project.challenges} />
                </DetailSection>
              )}
              {has('solutions') && (
                <DetailSection id="solutions" title="해결 과정">
                  <TextList items={project.solutions} />
                </DetailSection>
              )}
              {has('results') && (
                <DetailSection id="results" title="결과">
                  <TextList items={project.results} />
                </DetailSection>
              )}
              {has('improvements') && (
                <DetailSection id="improvements" title="개선할 점">
                  <TextList items={project.improvements} />
                </DetailSection>
              )}

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
