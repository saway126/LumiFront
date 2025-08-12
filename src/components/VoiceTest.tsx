import React, { useState, useEffect } from 'react';

const VoiceTest: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
    console.log(`🔍 ${message}`);
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'ko-KR'; // 한국어로 설정
      
      addLog('음성 인식 초기화 완료');
      
      recognitionInstance.onstart = () => {
        addLog('🟢 녹음 시작됨');
      };
      
      recognitionInstance.onspeechstart = () => {
        addLog('🗣️ 음성 감지됨');
      };
      
      recognitionInstance.onspeechend = () => {
        addLog('🔇 음성 종료됨');
      };
      
      recognitionInstance.onresult = (event: any) => {
        let finalText = '';
        let interimText = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (event.results[i].isFinal) {
            finalText += transcript;
            addLog(`✅ 최종 인식: "${transcript}" (신뢰도: ${(confidence * 100).toFixed(1)}%)`);
          } else {
            interimText += transcript;
          }
        }
        
        if (finalText) {
          setTranscript(prev => prev + finalText);
        }
        setInterimTranscript(interimText);
      };
      
      recognitionInstance.onerror = (event: any) => {
        addLog(`❌ 에러 발생: ${event.error}`);
        setIsRecording(false);
      };
      
      recognitionInstance.onend = () => {
        addLog('🔴 녹음 종료됨');
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      addLog('⚠️ 브라우저가 음성 인식을 지원하지 않습니다');
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition) return;
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      addLog('⏹️ 녹음 중지 요청');
    } else {
      recognition.start();
      setIsRecording(true);
      addLog('▶️ 녹음 시작 요청');
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
    addLog('📝 텍스트 초기화됨');
  };

  const testMicrophone = async () => {
    try {
      addLog('🎤 마이크 권한 요청 중...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      addLog('✅ 마이크 권한 획득 성공');
      
      // 오디오 레벨 체크
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      microphone.connect(analyser);
      
      let checkCount = 0;
      const checkAudioLevel = () => {
        if (checkCount++ < 50) {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          if (average > 10) {
            addLog(`🔊 오디오 레벨: ${average.toFixed(1)}`);
          }
          setTimeout(checkAudioLevel, 100);
        } else {
          stream.getTracks().forEach(track => track.stop());
          audioContext.close();
          addLog('🎤 마이크 테스트 완료');
        }
      };
      checkAudioLevel();
      
    } catch (error) {
      addLog(`❌ 마이크 권한 오류: ${error}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🎤 음성 인식 테스트 페이지</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {/* 왼쪽: 컨트롤 패널 */}
        <div>
          <div style={{ 
            padding: '20px', 
            background: '#f5f5f5', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h2>컨트롤 패널</h2>
            
            <div style={{ marginTop: '15px' }}>
              <div>브라우저 지원: {isSupported ? '✅ 지원됨' : '❌ 지원 안됨'}</div>
              <div>녹음 상태: {isRecording ? '🔴 녹음 중' : '⚪ 대기 중'}</div>
            </div>
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={toggleRecording}
                disabled={!isSupported}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  background: isRecording ? '#ff4444' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isSupported ? 'pointer' : 'not-allowed'
                }}
              >
                {isRecording ? '⏹️ 녹음 중지' : '▶️ 녹음 시작'}
              </button>
              
              <button 
                onClick={clearTranscript}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🗑️ 텍스트 초기화
              </button>
              
              <button 
                onClick={testMicrophone}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  background: '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🎤 마이크 테스트
              </button>
            </div>
          </div>
          
          {/* 인식된 텍스트 */}
          <div style={{ 
            padding: '20px', 
            background: '#e3f2fd', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>인식된 텍스트</h3>
            <div style={{
              minHeight: '100px',
              padding: '10px',
              background: 'white',
              borderRadius: '4px',
              marginTop: '10px',
              whiteSpace: 'pre-wrap'
            }}>
              {transcript || '(여기에 인식된 텍스트가 표시됩니다)'}
            </div>
            
            {interimTranscript && (
              <div style={{
                marginTop: '10px',
                padding: '10px',
                background: '#fff3e0',
                borderRadius: '4px',
                fontStyle: 'italic',
                color: '#666'
              }}>
                📝 인식 중: {interimTranscript}
              </div>
            )}
            
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              글자 수: {transcript.length} | 단어 수: {transcript.split(/\s+/).filter(w => w).length}
            </div>
          </div>
        </div>
        
        {/* 오른쪽: 로그 패널 */}
        <div>
          <div style={{ 
            padding: '20px', 
            background: '#263238', 
            color: '#aed581',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            height: '500px',
            overflow: 'auto'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#fff' }}>📋 실시간 로그</h3>
            {logs.length === 0 ? (
              <div style={{ color: '#666' }}>로그가 여기에 표시됩니다...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ 
                  marginBottom: '5px',
                  opacity: 1 - (index * 0.02)
                }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* 사용 안내 */}
      <div style={{ 
        marginTop: '20px',
        padding: '20px', 
        background: '#fff9c4', 
        borderRadius: '8px'
      }}>
        <h3>💡 사용 방법</h3>
        <ol>
          <li>먼저 "마이크 테스트" 버튼을 클릭하여 마이크가 제대로 작동하는지 확인하세요.</li>
          <li>"녹음 시작" 버튼을 클릭하고 마이크에 대고 말하세요.</li>
          <li>말하는 동안 임시 텍스트(주황색)가 표시되고, 말을 끝내면 최종 텍스트가 추가됩니다.</li>
          <li>오른쪽 로그 패널에서 실시간으로 음성 인식 과정을 확인할 수 있습니다.</li>
          <li>개발자 도구(F12) 콘솔에서도 상세한 로그를 확인할 수 있습니다.</li>
        </ol>
        
        <h3 style={{ marginTop: '20px' }}>⚠️ 주의사항</h3>
        <ul>
          <li>Chrome, Edge, Safari 등 최신 브라우저를 사용하세요.</li>
          <li>HTTPS 연결이 필요합니다 (localhost는 예외).</li>
          <li>처음 사용 시 브라우저가 마이크 권한을 요청합니다.</li>
          <li>조용한 환경에서 테스트하면 더 정확한 결과를 얻을 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
};

// Window 인터페이스 확장
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default VoiceTest;