import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main id="main-content" className="page-message container">
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>입력한 주소를 다시 확인해 주세요.</p>
      <Link className="button" to="/">
        홈으로 돌아가기
      </Link>
    </main>
  )
}

export default NotFound
