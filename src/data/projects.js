const placeholderText =
  '프로젝트의 실제 내용에 맞게 이후 구체적인 설명을 추가할 예정입니다.'

const projects = [
  {
    id: 'aegis-prop',
    title: 'Aegis-Prop',
    summary:
      '임대차계약서 이미지에서 특약을 추출하고 판례 검색과 LLM 분석으로 위험도·근거·수정 권고를 제공하는 풀스택 AI 서비스',
    image: 'images/aegis-prop-main.png',
    overview:
      '사용자가 전·월세 계약서 이미지를 업로드하면 PaddleOCR로 특약사항만 추출하고, 주택 임대차 판례를 검색해 LLM이 위험도를 분석합니다. 분석 결과는 위험도, 판단 근거, 관련 법률·판례, 수정 권고사항으로 구조화하며 사용자별 이력으로 저장합니다.',
    problem:
      '임대차계약서 특약은 촬영 상태와 자유로운 문서 형식 때문에 OCR 블록 순서와 띄어쓰기가 쉽게 깨지고, 법률 지식이 없는 사용자는 추출된 문장만으로 독소조항 여부를 판단하기 어렵습니다. 단순 LLM 질의는 근거가 부족하거나 출력 형식이 흔들릴 수 있어, 특약 구간을 정확히 분리하고 관련 판례를 근거로 일관된 결과를 만드는 파이프라인이 필요했습니다.',
    goals: [
      '계약서 이미지 업로드부터 특약 추출, 근거 검색, 위험도 분석까지 한 번의 요청으로 처리합니다.',
      '국내 주택 임대차 판례와 법령을 근거로 위험 요소를 설명하고 수정 방향을 제안합니다.',
      '인증, 분석 이력, 커뮤니티를 포함한 실제 사용 가능한 웹 서비스로 통합합니다.',
      '입력 이미지와 OCR 전체 원문은 저장하지 않고 분석에 필요한 특약과 결과만 사용자별로 관리합니다.',
    ],
    features: [
      'JPG, PNG, WebP, HEIC 계약서 이미지 업로드 및 특약 영역 자동 추출',
      'PaddleOCR 블록 좌표 기반 읽기 순서 복원과 한국어 오탈자·띄어쓰기 보정',
      'Chroma 벡터 검색과 BM25를 결합한 하이브리드 검색 및 Cross-Encoder 리랭킹',
      '국가법령정보센터 판례 API를 활용한 최신 근거 보강',
      '위험도 Level 1~5, 판단 근거, 관련 법률·판례, 수정 권고사항 제공',
      'JWT 인증, 사용자별 분석 이력 조회, 게시글·댓글 커뮤니티',
    ],
    architecture:
      'React 클라이언트가 JWT와 함께 Express API로 계약서 이미지를 전송하고, Express는 multipart 스트림을 FastAPI AI 서버로 전달합니다. FastAPI는 PaddleOCR로 특약을 추출한 뒤 RAG 파이프라인을 거쳐, 국가법령정보센터 API로 판례를 보강해 LLM을 호출합니다. Express는 최종 특약과 분석 결과를 Prisma·PostgreSQL에 사용자별로 저장합니다.',
    techStack: [
      'React',
      'Express',
      'FastAPI',
      'PostgreSQL',
      'Prisma',
      'PaddleOCR',
      'ChromaDB',
      'LangChain',
      'LLM',
    ],
    role:
      '단독 개발자로서 React 화면과 사용자 흐름, Express 기반 인증·커뮤니티·분석 이력 API, Prisma 데이터 모델, FastAPI 기반 OCR·RAG·LLM 분석 파이프라인과 서비스 간 연동을 설계하고 구현했습니다.',
    implementations: [
      'Express가 업로드 파일을 별도 저장하거나 재파싱하지 않고 multipart 스트림 그대로 FastAPI에 전달하도록 구성하고, 180초 타임아웃과 400·422·502·504 오류 응답을 구분했습니다.',
      'PaddleOCR를 싱글턴으로 사전 로드하고 이미지 크기를 보정한 뒤, OCR 좌표의 수직 겹침과 x축 위치를 이용해 문장 읽기 순서를 복원했습니다.',
      '특약 제목을 퍼지 매칭하고 서명·임대인·임차인 영역을 종료 지점으로 판단한 뒤, 용어 사전과 혼동 문자 규칙으로 추출된 특약만 정규화했습니다.',
      'Chroma 의미 검색과 BM25 키워드 검색을 0.5:0.5로 결합하고, 중복·상가 임대차 판례를 제거한 뒤 한국어 Cross-Encoder로 상위 3건을 재정렬했습니다.',
      '위험 신호가 있는 특약을 우선 선별해 검색 질의를 만들고, 판례 컨텍스트와 구조화된 특약을 LLM에 한 번 전달한 뒤 네 개의 결과 섹션으로 조립했습니다.',
      '분석 결과에서 Level 1~5를 추출해 특약, 판례 컨텍스트와 함께 저장하고, 마이페이지에서 과거 결과를 재조회하도록 구현했습니다.',
    ],
    challenges: [
      'OCR 결과가 시각적 읽기 순서와 다르게 반환되고 계약서 촬영 품질에 따라 특약 제목, 조항 번호, 법률 용어가 깨지는 문제가 있었습니다.',
      '벡터 검색만으로는 정확한 법률 키워드를 놓치고, 판례 코퍼스에 섞인 상가 임대차 자료나 중복 문서가 검색 품질을 떨어뜨렸습니다.',
      'LLM이 매 요청마다 다른 형식으로 응답하거나 근거 없이 판단·권고 문구를 생성할 가능성이 있었습니다.',
      'OCR, 검색, 외부 법령 API, GPU LLM을 순차 호출하면서 처리 시간이 길어지고 장애 원인을 구분하기 어려웠습니다.',
      '초기 CPU 중심 분석 파이프라인은 OCR과 리랭킹 병목으로 계약서 한 건 처리에 약 100초가 걸려 실제 서비스 사용성을 떨어뜨렸습니다.',
    ],
    solutions: [
      '블록 좌표 기반 줄 묶기와 정렬, 특약 제목 퍼지 매칭, 종료 라벨 감지, 용어·혼동 문자 사전을 조합해 특약 구간과 문장 형태를 복원했습니다.',
      'BM25와 임베딩 검색을 결합하고 문서 중복 제거, 도메인 필터, Cross-Encoder 통합 리랭킹을 적용했으며 국가법령정보센터 판례를 보조 근거로 사용했습니다.',
      '규칙 기반 위험 후보 선별과 구조화된 입력을 사용하고, LLM 출력 중 위험도·법률 근거를 검증 가능한 섹션으로 추출한 뒤 판단 근거와 권고사항을 결정적 로직으로 조립했습니다.',
      '특약을 찾지 못하면 RAG와 LLM을 호출하지 않고 422로 종료했으며, 모델 사전 로드·단계별 처리 시간 기록·헬스체크·서비스별 타임아웃으로 운영 문제를 추적할 수 있게 했습니다.',
      '단계별 벤치마크로 병목을 분리한 뒤 PaddleOCR와 Cross-Encoder 리랭커를 GPU에서 실행하고, 모델 싱글턴 사전 로드·위험 후보 특약 선별·상위 3개 문서 리랭킹·LLM 단일 호출로 연산량을 줄였습니다.',
    ],
    results: [
      '계약서 이미지 한 장에서 특약 추출, 판례 검색, 위험도 분석, 결과 저장까지 이어지는 엔드투엔드 웹 흐름을 완성했습니다.',
      '분석 결과를 위험도 Level 1~5, 판단 근거, 관련 법률·판례, 수정 권고사항으로 일관되게 제공하고 추출된 특약과 참고 판례를 함께 확인할 수 있게 했습니다.',
      'JWT 인증과 소유자 검증을 적용해 사용자별 분석 이력을 안전하게 재조회하고, 회원·게시글·댓글 기능과 AI 분석을 하나의 서비스로 통합했습니다.',
      '특약 미검출 요청을 조기에 종료해 불필요한 판례 검색과 GPU LLM 호출을 방지했습니다.',
      'GPU 실행 환경의 벤치마크 기준 전체 분석 시간을 약 100초에서 30초대로 줄여, 기존 대비 대략 60~70% 단축했습니다.',
    ],
    improvements: [
      '동기 OCR·RAG·외부 HTTP 호출을 작업 큐 또는 비동기 실행 구조로 분리해 동시 요청 처리량과 장애 격리를 개선할 계획입니다.',
      '주택·상가 임대차 유형 메타데이터와 정답 판례 평가셋을 구축해 검색 Recall, 리랭킹 정확도, 최종 답변 근거성을 정량 평가할 필요가 있습니다.',
      '중첩 번호가 포함된 특약과 다양한 계약서 양식에 대한 OCR 경계 테스트를 늘리고, 다중 페이지 업로드 UX를 확장할 계획입니다.',
      'CORS 허용 범위, 토큰 무효화, 보관 기간 정책을 운영 환경에 맞게 강화하고 모니터링·재시도 체계를 추가할 예정입니다.',
    ],
    links: {
      github: 'https://github.com/JYRosa/Aegis-Prop',
      demo: 'https://aegisprop-ai.com',
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
