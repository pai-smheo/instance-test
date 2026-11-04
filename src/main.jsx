import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import './guide-overrides.css'

const docs = 'https://devopen.jntp-ax.or.kr/docs/'

function CopyCode({ children, label = '복사' }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="code-block">
      <code>{children}</code>
      <button onClick={copy} aria-label={`${label} 명령어 복사`}>{copied ? '복사됨' : '복사'}</button>
    </div>
  )
}

function SectionTitle({ number, label, title, text }) {
  return (
    <div className="section-title">
      <div className="section-kicker"><span>{number}</span>{label}</div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Devstream 시작"><span className="brand-mark"><i /><i /><i /></span>devstream<span className="brand-guide">FIELD MANUAL</span></a>
        <nav aria-label="페이지 목차">
          <a href="#connect">SSH 접속</a>
          <a href="#codex">Codex 연결</a>
          <a href="#github">GitHub 연동</a>
          <a href="#ports">포트 개방</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> 인스턴스 첫 설정 가이드 <span className="eyebrow-line" /></div>
            <h1>내 개발 서버에<br /><em>Codex와 GitHub</em> 연결하기</h1>
            <p className="hero-lede">SSH 접속부터 코드 push, 웹 화면 공개까지.<br />처음 설정하는 순서대로 따라오면 됩니다.</p>
            <a className="primary-button" href="#connect">시작하기 <span>↓</span></a>
            <div className="hero-meta"><span className="meta-lock">✳</span> 서버 비밀번호 대신 개인 키를 사용합니다 <span className="meta-sep">·</span> 약 10분</div>
          </div>
          <div className="hero-art" aria-label="SSH 연결 상태 예시">
            <div className="terminal-window">
              <div className="terminal-bar"><div className="traffic"><i /><i /><i /></div><span>서버 연결</span><span className="terminal-lock">⌑</span></div>
              <div className="terminal-content">
                <div className="terminal-command"><span className="prompt">$</span> ssh 내-서버-별칭</div>
                <div className="terminal-muted">Welcome to Ubuntu 24.04 LTS</div>
                <div className="terminal-muted">개발 환경이 준비되었습니다.</div>
                <div className="terminal-command terminal-path"><span className="user">ubuntu@devstream</span>:<span className="path">/data</span>$ <span className="cursor" /></div>
              </div>
              <div className="connected"><span /> 연결됨 <small>SSH · 안전한 개인 키 인증</small></div>
            </div>
            <div className="hero-float float-top"><span className="float-icon">⌘</span><div><b>Codex</b><small>서버에서 함께 작업</small></div><span className="float-check">✓</span></div>
            <div className="hero-float float-bottom"><span className="git-icon">↗</span><div><b>GitHub</b><small>변경 사항 push</small></div><span className="float-check">✓</span></div>
            <div className="art-ring ring-one" /><div className="art-ring ring-two" />
          </div>
          <div className="hero-bottom"><span>01 — CONNECT</span><span>02 — BUILD</span><span>03 — SHARE</span><span>04 — PUBLISH</span><div className="hero-progress"><i /></div></div>
        </section>

        <section className="prep section-wrap">
          <div className="prep-heading"><span className="mini-label">먼저 준비해 주세요</span><h2>접속에 필요한 것, 세 가지</h2></div>
          <div className="prep-items">
            <article className="prep-item"><span className="prep-no">01</span><div><b>서버 접속 안내 메일</b><p>서버 별칭과 접속 명령 확인</p></div><span className="prep-arrow">↗</span></article>
            <article className="prep-item"><span className="prep-no">02</span><div><b>PEM 키 파일</b><p>메일 첨부 파일을 내 컴퓨터에 저장</p></div><span className="prep-arrow">↗</span></article>
            <article className="prep-item"><span className="prep-no">03</span><div><b>ChatGPT 계정</b><p>Codex 로그인과 앱 연결에 사용</p></div><span className="prep-arrow">↗</span></article>
          </div>
        </section>

        <section id="connect" className="guide-section connect-section">
          <div className="section-wrap guide-grid">
            <div className="guide-aside"><SectionTitle number="01" label="CONNECT" title="먼저 서버에 접속해요" text="SSH는 내 컴퓨터에서 원격 서버로 안전하게 들어가는 연결 방식입니다. 메일에 적힌 접속 정보를 그대로 사용하세요." /><div className="aside-note"><span>TIP</span><p>PEM 키는 서버 열쇠입니다. 팀원 외에는 공유하지 말고, 분실하면 운영진에게 재발급을 요청하세요.</p></div></div>
            <div className="guide-content">
              <article className="instruction-card">
                <div className="instruction-heading"><span className="step-badge">A</span><div><h3>Windows에서 접속하기</h3><p>PowerShell을 열고 다운로드 폴더에서 진행합니다.</p></div><span className="os-label">WINDOWS</span></div>
                <div className="instruction-body">
                  <div className="plain-note"><b>필요 프로그램</b><span>Windows에서는 SSH가 사용하는 OpenSSL을 위해 <strong>Git for Windows</strong>를 기본 경로로 설치해 주세요.</span></div>
                  <p className="step-line"><b>1</b> 시작 메뉴에서 PowerShell을 열어요. 관리자 권한은 필요하지 않습니다.</p>
                  <p className="step-line"><b>2</b> 다운로드 폴더로 이동하고 PEM 키의 권한을 내 계정만 읽을 수 있게 바꿔요. 명령의 <code>eduhack-키파일명.pem</code>은 실제 파일명으로 바꿔 입력하세요.</p>
                  <CopyCode>cd $HOME\Downloads</CopyCode>
                  <CopyCode>{'icacls.exe .\\eduhack-키파일명.pem /inheritance:r'}</CopyCode>
                  <CopyCode>{'icacls.exe .\\eduhack-키파일명.pem /grant:r "${env:USERNAME}:(R)"'}</CopyCode>
                  <p className="step-line"><b>3</b> 접속 안내 메일의 <strong>③ 서버 등록 + SSH 접속</strong> 명령을 통째로 붙여넣고 Enter를 눌러요. 처음 연결할 때 확인 질문이 나오면 <code>yes</code>를 입력합니다.</p>
                  <div className="inline-terminal"><span>PS C:\Users\me&gt;</span> ssh 내-서버-별칭 <small>← 메일의 서버 별칭으로 바꿔 입력</small></div>
                </div>
                <div className="card-footnote"><span>✓</span> <code>Welcome to Ubuntu</code>와 <code>ubuntu@…</code> 프롬프트가 보이면 접속 성공</div>
              </article>
              <article className="instruction-card compact-card">
                <div className="instruction-heading"><span className="step-badge">B</span><div><h3>Mac에서 접속하기</h3><p>터미널 앱에서 메일의 Mac용 명령을 사용합니다.</p></div><span className="os-label">MACOS</span></div>
                <div className="instruction-body"><p className="step-line"><b>1</b> Spotlight에서 ‘터미널’을 열고, 접속 안내 메일의 <strong>Mac 명령</strong>을 복사해 실행해요.</p><p className="step-line"><b>2</b> 처음 연결할 때 <code>yes</code>를 입력해요. <code>Welcome to Ubuntu</code>가 나오면 준비 완료입니다.</p></div>
                <div className="card-footnote"><span>i</span> 메일에 적힌 서버 주소와 PEM 파일 경로를 사용하세요. 예시 이름을 그대로 입력하지 마세요.</div>
              </article>
            </div>
          </div>
        </section>

        <section id="codex" className="guide-section codex-section">
          <div className="section-wrap guide-grid">
            <div className="guide-aside"><SectionTitle number="02" label="CODEX" title="Codex를 설치하고 연결해요" text="Codex가 서버의 작업 폴더에서 파일을 읽고, 만들고, 수정할 수 있도록 준비합니다." /><div className="aside-note dark-note"><span>계정 확인</span><p>서버 Codex와 ChatGPT 데스크톱 앱은 같은 ChatGPT 계정으로 로그인하세요.</p></div></div>
            <div className="guide-content">
              <article className="instruction-card codex-card">
                <div className="instruction-heading"><span className="step-badge step-violet">01</span><div><h3>서버에 Codex CLI 설치</h3><p>SSH로 접속한 서버 터미널에서 실행합니다.</p></div><span className="time-label">약 1분</span></div>
                <div className="instruction-body"><CopyCode>curl -fsSL https://chatgpt.com/codex/install.sh | sh</CopyCode><p className="step-line"><b>1</b> 설치가 끝나면 실행 여부를 묻는 질문에 <code>y</code>를 입력합니다.</p><p className="step-line"><b>2</b> 셸 설정을 읽고 설치 버전을 확인해요.</p><CopyCode>source ~/.bashrc</CopyCode><CopyCode>codex --version</CopyCode></div>
              </article>
              <article className="instruction-card codex-card">
                <div className="instruction-heading"><span className="step-badge step-violet">02</span><div><h3>기기 코드로 로그인</h3><p>서버에는 브라우저가 없어도 괜찮아요.</p></div><span className="time-label">코드 15분 유효</span></div>
                <div className="instruction-body"><CopyCode>codex login --device-auth</CopyCode><div className="device-flow"><div><span>1</span><b>서버 터미널</b><small>안내된 URL과 9자리 코드 확인</small></div><i>→</i><div><span>2</span><b>내 브라우저</b><small>URL을 열고 같은 ChatGPT 계정으로 로그인</small></div><i>→</i><div><span>3</span><b>코드 입력</b><small>코드 입력 후 로그인 완료 확인</small></div></div><div className="alert-box"><span>!</span><p>로그인 코드는 15분 뒤 만료됩니다. 다른 사람에게 코드를 알려주지 마세요. 만료되면 위 명령을 다시 실행하면 됩니다.</p></div></div>
              </article>
              <article className="instruction-card app-card">
                <div className="instruction-heading"><span className="step-badge step-blue">03</span><div><h3>ChatGPT 앱에서 SSH 서버 추가</h3><p>PC용 앱을 열고 한 번만 연결 정보를 등록합니다.</p></div><span className="os-label">CHATGPT APP</span></div>
                <div className="app-steps"><div><b>설정 열기</b><span>설정 → 연결 → SSH → 추가 → 수동으로 추가</span></div><div><b>서버 정보 입력</b><span>호스트 이름은 메일의 ③ 명령에서 <code>ssh</code> 뒤 이름</span></div><div><b>키 선택</b><span>포트 22 · PEM 인증 키 파일 선택 후 저장</span></div><div><b>폴더 열기</b><span>연결됨을 확인하고 <code>/data/hackathon</code> 열기</span></div></div>
                <div className="card-footnote"><span>✓</span> 프로젝트에 <code>SSH</code> 표시가 보이면 서버 폴더에서 Codex 작업 준비 완료</div>
              </article>
            </div>
          </div>
        </section>

        <section id="github" className="guide-section github-section">
          <div className="section-wrap guide-grid">
            <div className="guide-aside"><SectionTitle number="03" label="GIT + GITHUB" title="저장소를 연결하고 push해요" text="Git은 파일 변경 기록을 관리하고, GitHub는 그 기록을 저장·공유하는 온라인 공간입니다." /><div className="aside-note green-note"><span>저장 위치</span><p>각 인스턴스의 영구 storage는 <code>/data</code>입니다. 저장소는 이 경로 아래에 clone하세요.</p></div></div>
            <div className="guide-content">
              <article className="instruction-card github-card">
                <div className="instruction-heading"><span className="step-badge step-green">01</span><div><h3>Git과 GitHub CLI 설치</h3><p>SSH 접속 후 서버에서 실행합니다.</p></div><span className="os-label">UBUNTU</span></div>
                <div className="instruction-body"><CopyCode>sudo apt install -y git gh</CopyCode><div className="plain-note"><b>무엇이 설치되나요?</b><span><code>git</code>은 변경 내역 관리 도구, <code>gh</code>는 터미널에서 GitHub에 로그인하는 도구입니다.</span></div></div>
              </article>
              <article className="instruction-card github-card">
                <div className="instruction-heading"><span className="step-badge step-green">02</span><div><h3>GitHub 계정 인증</h3><p>브라우저는 내 컴퓨터에서 열면 됩니다.</p></div></div>
                <div className="instruction-body"><CopyCode>gh auth login</CopyCode><div className="choice-grid"><div><span>01</span><b>GitHub.com 선택</b></div><div><span>02</span><b>HTTPS 선택</b></div><div><span>03</span><b>웹 브라우저 로그인 선택</b></div></div><div className="alert-box"><span>!</span><p>서버에는 브라우저가 없으므로 자동으로 열리지 않습니다. 터미널이 안내하는 URL을 내 컴퓨터 브라우저에서 직접 열고, 화면에 나온 일회용 코드를 입력해 인증하세요.</p></div><CopyCode>gh auth status</CopyCode><p className="step-line"><b>✓</b> 계정이 표시되면 인증 완료입니다.</p></div>
              </article>
              <article className="instruction-card github-card">
                <div className="instruction-heading"><span className="step-badge step-green">03</span><div><h3>저장소를 /data에 clone</h3><p>아래 주소는 예시입니다. 사용할 저장소 주소로 바꿔 주세요.</p></div></div>
                <div className="instruction-body"><CopyCode>cd /data</CopyCode><CopyCode>git clone https://github.com/OWNER/REPOSITORY.git</CopyCode><CopyCode>cd REPOSITORY</CopyCode><div className="alert-box"><span>i</span><p>공개 저장소는 바로 clone할 수 있습니다. 비공개 저장소는 내 GitHub 계정에 접근 권한이 있어야 합니다.</p></div></div>
              </article>
              <article className="instruction-card github-card">
                <div className="instruction-heading"><span className="step-badge step-green">04</span><div><h3>작성자 정보 설정 후 push</h3><p>이름과 이메일은 GitHub 커밋 기록에 표시됩니다.</p></div></div>
                <div className="instruction-body"><CopyCode>git config user.name "내 이름"</CopyCode><CopyCode>git config user.email "내 이메일"</CopyCode><div className="command-sequence"><span>파일 변경을 저장소에 올리기</span><CopyCode>git add .</CopyCode><CopyCode>git commit -m "변경 내용 요약"</CopyCode><CopyCode>git push -u origin main</CopyCode></div><div className="card-footnote"><span>i</span> 이후 같은 브랜치로 올릴 때는 <code>git push</code>만 실행하면 됩니다.</div></div>
              </article>
            </div>
          </div>
        </section>

        <section id="ports" className="guide-section port-section">
          <div className="section-wrap guide-grid">
            <div className="guide-aside"><SectionTitle number="04" label="NETWORK" title="포트를 요청하고 도메인으로 연결해요" text="Streamlit은 기본 포트로 바로 사용하고, 다른 앱에 포트가 더 필요하면 멘토에게 요청하세요." /><div className="aside-note port-note"><span>앱 실행 전 확인</span><p>앱 서버가 <code>0.0.0.0</code>에 바인딩되어야 외부 요청을 받을 수 있습니다.</p></div><a className="docs-link" href={`${docs}user-guide/create-instance/`} target="_blank" rel="noreferrer">공식 문서: 네트워크 옵션 <span>↗</span></a></div>
            <div className="guide-content">
              <article className="instruction-card port-card">
                <div className="instruction-heading"><span className="step-badge step-orange">01</span><div><h3>Streamlit은 8501 포트를 사용해요</h3><p>Streamlit용 8501 포트는 모든 인스턴스에서 개방되어 있습니다.</p></div><span className="open-label">OPEN</span></div>
                <div className="port-console"><div><span className="console-dot" /><span className="console-dot" /><span className="console-dot" /><small>기본 개방 포트</small></div><p><b>Streamlit</b><strong>0.0.0.0:8501</strong></p><span className="console-foot">사전 제공받은 8501용 도메인을 적용하여 실행하면 가능해요.</span></div>
                <div className="streamlit-run"><span>실행 예시 · 발급받은 base URL 경로를 넣어 주세요</span><CopyCode>streamlit run app.py --server.port 8501 --server.baseUrlPath "/&lt;8501-base-url-path&gt;"</CopyCode><small>전체 도메인 주소가 아닌, 도메인에 연결된 base URL 경로를 설정합니다.</small></div>
              </article>
              <article className="instruction-card port-card current-site-card"><div className="current-site-example"><span className="current-site-label">현재 이 사이트의 실제 설정 · React + Vite · 포트 3000</span><a href="https://devopen.jntp-ax.or.kr/i/zYusWVViM9PWkQEw/" target="_blank" rel="noreferrer">https://devopen.jntp-ax.or.kr/i/zYusWVViM9PWkQEw/ <span>↗</span></a><div><small>도메인</small><code>devopen.jntp-ax.or.kr</code><small>base path</small><code>/i/zYusWVViM9PWkQEw/</code></div><pre>React 실행 명령: npm run dev
Vite 설정: base: '/i/zYusWVViM9PWkQEw/'
서버 설정: host '0.0.0.0', port 3000</pre></div></article>
              <article className="instruction-card port-card">
                <div className="instruction-heading"><span className="step-badge step-orange">02</span><div><h3>다른 앱은 허성민 멘토에게 요청</h3><p>포트를 직접 추가하지 말고, 필요한 정보를 멘토에게 전달하세요.</p></div></div>
                <div className="port-flow"><div><span>1</span><b>인스턴스 확인</b><small>이름 또는 ID</small></div><i>→</i><div><span>2</span><b>포트 전달</b><small>예: 3000</small></div><i>→</i><div><span>3</span><b>도메인 받기</b><small>허성민 멘토에게</small></div><i>→</i><div><span>4</span><b>앱에 연결</b><small>도메인 + base URL</small></div></div>
                <div className="request-grid"><div><span>요청할 인스턴스</span><b>인스턴스 이름 또는 ID</b></div><div><span>개방할 포트</span><b>앱이 사용하는 번호</b></div><div><span>함께 알려주면 좋아요</span><b>앱 이름과 사용 목적</b></div></div>
                <div className="mentor-callout"><span>추가 포트 개방 안내</span><strong>추가 포트가 필요하면 허성민 멘토에게 어느 인스턴스의 어느 포트를 열어야 하는지 전달하세요. 멘토에게 도메인을 받은 뒤 앱의 base URL로 연결하면 됩니다.</strong></div>
                <div className="base-url-note"><b>base URL(하위 경로) 설정을 지원하는 프레임워크 예시</b><p>앱에서 base URL을 지정할 수 있으면, 허성민 멘토에게 받은 도메인의 하위 경로로 연결해 사용할 수 있습니다.</p><div className="base-examples"><a href="https://docs.streamlit.io/develop/api-reference/configuration/config.toml" target="_blank" rel="noreferrer"><b>Streamlit</b><code>server.baseUrlPath</code><span>공식 문서 ↗</span></a><a href="https://gradio.app/main/docs/gradio/interface" target="_blank" rel="noreferrer"><b>Gradio</b><code>root_path</code><span>공식 문서 ↗</span></a><a href="https://vite.dev/config/shared-options#base" target="_blank" rel="noreferrer"><b>Vite</b><code>base</code><span>공식 문서 ↗</span></a><a href="https://fastapi.tiangolo.com/advanced/behind-a-proxy/" target="_blank" rel="noreferrer"><b>FastAPI</b><code>--root-path</code><span>공식 문서 ↗</span></a></div></div>
                <div className="card-footnote"><span>✓</span> 포트 개방은 멘토에게 요청하고, 받은 도메인을 앱 설정에 연결합니다.</div>
              </article>
            </div>
          </div>
        </section>

        <section className="finish-section">
          <div className="finish-orbit orbit-a" /><div className="finish-orbit orbit-b" />
          <div className="finish-inner"><div className="finish-kicker"><span /> READY TO BUILD</div><h2>이제 서버가<br /><em>내 작업 공간</em>입니다.</h2><p>Codex로 만들고, GitHub에 저장하고,<br />필요한 앱은 포트를 열어 팀과 공유하세요.</p><div className="finish-actions"><a href="#connect" className="finish-button">처음부터 다시 보기 <span>↑</span></a></div></div>
          <div className="finish-mark" aria-hidden="true"><span>SSH</span><i>→</i><span>CODE</span><i>→</i><span>SHIP</span></div>
        </section>
      </main>
      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><i /><i /><i /></span>devstream</a><a href="#top">BACK TO TOP ↑</a></footer>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
