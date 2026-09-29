import { Route, Routes } from 'react-router-dom'
import InteractionEffects from './components/InteractionEffects.jsx'
import Navbar from './components/Navbar.jsx'
import ScrollToHash from './components/ScrollToHash.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'

function App() {
  return (
    <>
      <ScrollToHash />
      <InteractionEffects />
      <a className="skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
