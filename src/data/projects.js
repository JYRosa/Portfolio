const placeholderText =
  '프로젝트의 실제 내용에 맞게 이후 구체적인 설명을 추가할 예정입니다.'

const projects = [
  {
    id: 'aegis-prop',
    title: 'Aegis-Prop',
    summary:
      '부동산 전·월세 계약서의 특약사항을 OCR로 추출하고, RAG와 LLM을 이용해 위험도를 분석하는 AI 서비스',
    overview:
      '계약서 이미지에서 텍스트를 추출하고 관련 법률·계약 정보를 검색하여 특약사항의 위험 요소를 설명하는 서비스입니다.',
    problem: placeholderText,
    goals: [
      '계약서 이미지에서 특약사항을 정확하게 추출합니다.',
      '검색된 근거를 바탕으로 위험 요소를 이해하기 쉽게 제공합니다.',
    ],
    features: [
      '계약서 이미지 업로드',
      'PaddleOCR 기반 텍스트 추출',
      'RAG 기반 관련 정보 검색',
      'LLM 기반 위험도 분석 및 설명',
    ],
    architecture:
      'React 클라이언트, Node.js API 서버, FastAPI AI 서버, 벡터 데이터베이스로 구성할 예정입니다.',
    techStack: [
      'React',
      'Node.js',
      'FastAPI',
      'PaddleOCR',
      'RAG',
      'LLM',
      'Docker',
    ],
    role: placeholderText,
    implementations: [placeholderText],
    challenges: [placeholderText],
    solutions: [placeholderText],
    results: [placeholderText],
    improvements: [placeholderText],
    links: {
      github: 'https://github.com/username/aegis-prop',
      demo: 'https://example.com/aegis-prop',
    },
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis Project',
    summary:
      '데이터 수집, 전처리, 분석 및 시각화를 통해 의미 있는 인사이트를 도출하는 데이터 분석 프로젝트',
    overview:
      '분석 목적에 맞는 데이터를 수집하고 정제한 뒤 탐색적 분석과 시각화를 수행하는 프로젝트입니다.',
    problem: placeholderText,
    goals: [placeholderText],
    features: [
      '데이터 수집 및 정제',
      '탐색적 데이터 분석',
      '분석 결과 시각화',
    ],
    architecture:
      '데이터 수집, 전처리, 분석, 시각화 단계로 구성된 분석 파이프라인입니다.',
    techStack: ['Python', 'Pandas', 'Matplotlib'],
    role: placeholderText,
    implementations: [placeholderText],
    challenges: [placeholderText],
    solutions: [placeholderText],
    results: [placeholderText],
    improvements: [placeholderText],
    links: {
      github: 'https://github.com/username/data-analysis',
      demo: 'https://example.com/data-analysis',
    },
  },
  {
    id: 'spring-blog',
    title: 'Spring Boot Blog',
    summary: 'Spring Boot 기반으로 구현한 웹 애플리케이션',
    overview:
      '게시글과 사용자 데이터를 관리하는 기본적인 블로그 기능을 구현한 웹 애플리케이션입니다.',
    problem: placeholderText,
    goals: [placeholderText],
    features: [
      '게시글 작성, 조회, 수정, 삭제',
      '사용자 인증 및 권한 관리',
      '데이터베이스 기반 콘텐츠 관리',
    ],
    architecture:
      'Spring Boot MVC 구조와 Spring Data JPA를 사용해 애플리케이션과 데이터베이스를 연결합니다.',
    techStack: [
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      'MariaDB',
      'Thymeleaf',
    ],
    role: placeholderText,
    implementations: [placeholderText],
    challenges: [placeholderText],
    solutions: [placeholderText],
    results: [placeholderText],
    improvements: [placeholderText],
    links: {
      github: 'https://github.com/username/spring-blog',
      demo: 'https://example.com/spring-blog',
    },
  },
]

export const getProjectById = (projectId) =>
  projects.find((project) => project.id === projectId)

export default projects
