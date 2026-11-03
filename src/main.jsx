import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

function App() {
  const [count, setCount] = React.useState(0)

  return (
    <main className="page">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <section className="card">
        <div className="eyebrow"><span className="live-dot" /> REACT APP · PORT 3000</div>
        <div className="icon" aria-hidden="true">✦</div>
        <h1>준비 완료!</h1>
        <p className="intro">인스턴스에서 React 앱이 실행 중입니다.</p>
        <div className="status-row">
          <span className="status-label">상태</span>
          <span className="status-value"><span className="live-dot" /> 정상 작동 중</span>
        </div>
        <button className="counter" onClick={() => setCount((value) => value + 1)}>
          <span>클릭 테스트</span><strong>{count}</strong>
        </button>
        <p className="footnote">버튼을 눌러 React 상호작용을 확인해 보세요.</p>
      </section>
      <footer>INSTANCE TEST <span>•</span> BUILT WITH REACT</footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
