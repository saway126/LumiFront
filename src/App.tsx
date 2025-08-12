import { useState } from 'react'
import InterviewSimulator from './components/InterviewSimulator'
import VoiceTest from './components/VoiceTest'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<'interview' | 'voicetest'>('interview')
  
  return (
    <div className="App">
      {/* 네비게이션 바 */}
      <div style={{
        padding: '10px 20px',
        background: '#1976d2',
        color: 'white',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: 0, marginRight: '30px' }}>🎙️ Interview Simulator</h3>
        <button
          onClick={() => setCurrentPage('interview')}
          style={{
            padding: '8px 16px',
            background: currentPage === 'interview' ? 'white' : 'transparent',
            color: currentPage === 'interview' ? '#1976d2' : 'white',
            border: '1px solid white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: currentPage === 'interview' ? 'bold' : 'normal'
          }}
        >
          인터뷰 시뮬레이터
        </button>
        <button
          onClick={() => setCurrentPage('voicetest')}
          style={{
            padding: '8px 16px',
            background: currentPage === 'voicetest' ? 'white' : 'transparent',
            color: currentPage === 'voicetest' ? '#1976d2' : 'white',
            border: '1px solid white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: currentPage === 'voicetest' ? 'bold' : 'normal'
          }}
        >
          🔍 음성 인식 테스트
        </button>
      </div>
      
      {/* 페이지 컨텐츠 */}
      <div style={{ marginTop: '20px' }}>
        {currentPage === 'interview' ? (
          <InterviewSimulator />
        ) : (
          <VoiceTest />
        )}
      </div>
    </div>
  )
}

export default App
