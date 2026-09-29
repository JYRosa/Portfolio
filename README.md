# Developer Portfolio

React, Vite, JavaScript, CSS, React Router로 구성한 개인 개발자 포트폴리오입니다. 스타일은 외부 UI 라이브러리 없이 순수 CSS와 디자인 토큰(CSS 변수)으로 작성했으며, 라이트/다크 모드와 `prefers-reduced-motion`을 지원합니다.

## 실행 방법

Node.js 20.19 이상 또는 22.12 이상과 npm이 필요합니다.

```bash
npm install
npm run dev
```

프로덕션 빌드 확인:

```bash
npm run build
npm run preview
```

## 라우팅

- `/`: 긴 스크롤 형태의 메인 포트폴리오
- `/projects/aegis-prop`: Aegis-Prop 상세 페이지
- `/projects/data-analysis`: Data Analysis Project 상세 페이지
- `/projects/spring-blog`: Spring Boot Blog 상세 페이지

프로젝트 상세 페이지는 `src/data/projects.js`의 데이터를 `/projects/:projectId` 경로에서 공통 컴포넌트로 렌더링합니다.

## 폴더 구조

```text
src/
├── components/        # 섹션, 카드, 내비게이션, 공통 컴포넌트
├── data/              # 프로젝트 및 기술 데이터
├── hooks/             # 스크롤 위치 추적(useScrollSpy)
├── pages/             # 홈, 프로젝트 상세, 404 페이지
├── styles/            # global.css(진입점) → tokens / base / components / sections
├── App.jsx            # 라우트 구성
└── main.jsx           # React 진입점
public/
└── _redirects         # Netlify SPA fallback
vercel.json            # Vercel SPA fallback
```

## 콘텐츠 수정 위치

- 이름, 직무, 소개, 대표 기술: `src/components/Hero.jsx`
- 자기소개: `src/components/About.jsx`
- 프로젝트 목록 및 상세 정보: `src/data/projects.js`
- 분야별 기술: `src/data/skills.js`
- 연락처: `src/components/Contact.jsx`
- 색·폰트·간격 등 디자인 토큰: `src/styles/tokens.css`
- 섹션별 레이아웃과 반응형: `src/styles/sections.css`
- 스크롤 페이드업·커서 효과: `src/components/InteractionEffects.jsx`
- 히어로 기술→프로젝트 그래프: `src/components/HeroGraph.jsx` (대표 기술은 `Hero.jsx`의 `featuredSkills`, 연결선은 `projects.js`의 `techStack`으로 자동 생성, 1100px 이상에서만 표시)

`Resume` 버튼은 `/resume.pdf`를 가리킵니다. 실제 이력서를 사용할 때 `public/resume.pdf` 파일을 추가하세요. GitHub와 Demo 주소는 현재 placeholder이므로 실제 주소로 교체해야 합니다.

## 배포 시 새로고침 처리

React Router의 직접 URL 접근을 위해 서버가 모든 경로를 `index.html`로 전달해야 합니다. Netlify용 `public/_redirects`와 Vercel용 `vercel.json`을 포함했습니다. 다른 호스팅 서비스를 사용한다면 해당 서비스에서 SPA history fallback 또는 rewrite를 설정하세요.
