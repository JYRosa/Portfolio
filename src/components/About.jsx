const aboutItems = [
  {
    title: '관심 분야',
    content: 'AI System Development, Backend Development, Web Development',
  },
  {
    title: '현재 학습 분야',
    content: '데이터 분석, OCR, RAG, LLM 기반 서비스 개발',
  },
  {
    title: '개발 방향',
    content: '기술을 실제 사용 가능한 서비스 형태로 연결하는 개발',
  },
]

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <p className="section-label">ABOUT</p>
        <h2 id="about-title">About Me</h2>
        <div className="prose">
          <p>
            AI 시스템 기획과 개발을 공부하고 있으며, 웹 애플리케이션과 AI
            기술을 연결하여 실제 서비스 형태로 구현하는 과정에 관심이
            있습니다.
          </p>
          <p>
            현재 웹 개발, 데이터 분석, OCR, RAG, LLM 등을 활용한 프로젝트를
            진행하고 있습니다.
          </p>
        </div>

        <dl className="info-grid">
          {aboutItems.map((item) => (
            <div key={item.title} className="info-item">
              <dt>{item.title}</dt>
              <dd>{item.content}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default About
