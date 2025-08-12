import React, { useState, useRef, useEffect } from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isRecording: boolean;
  onRecordingChange: (isRecording: boolean) => void;
  placeholder?: string;
  debugMode?: boolean; // 디버그 모드 추가
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  onChange,
  onSubmit,
  isRecording,
  onRecordingChange,
  placeholder = "Type your answer here...",
  debugMode = false // 기본값은 false
}) => {
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [interimText, setInterimText] = useState(''); // 임시 텍스트 상태 추가
  const [debugInfo, setDebugInfo] = useState<{
    status: string;
    lastTranscript: string;
    confidence: number;
    timestamp: string;
  }>({
    status: 'idle',
    lastTranscript: '',
    confidence: 0,
    timestamp: ''
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      // 디버그 로그 추가
      if (debugMode) {
        console.log('🎤 Speech Recognition initialized:', {
          continuous: recognitionInstance.continuous,
          interimResults: recognitionInstance.interimResults,
          lang: recognitionInstance.lang
        });
      }

      recognitionInstance.onstart = () => {
        if (debugMode) {
          console.log('🟢 Speech recognition started');
        }
        setDebugInfo(prev => ({
          ...prev,
          status: 'listening',
          timestamp: new Date().toLocaleTimeString()
        }));
      };

      recognitionInstance.onspeechstart = () => {
        if (debugMode) {
          console.log('🗣️ Speech detected');
        }
      };

      recognitionInstance.onspeechend = () => {
        if (debugMode) {
          console.log('🔇 Speech ended');
        }
      };

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (debugMode) {
            console.log(`📝 Recognition result [${i}]:`, {
              transcript: transcript,
              isFinal: event.results[i].isFinal,
              confidence: confidence || 'N/A',
              alternatives: Array.from(event.results[i]).map((alt: any) => ({
                transcript: alt.transcript,
                confidence: alt.confidence
              }))
            });
          }

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setDebugInfo(prev => ({
              ...prev,
              lastTranscript: transcript,
              confidence: confidence || 0,
              timestamp: new Date().toLocaleTimeString()
            }));
          } else {
            interimTranscript += transcript;
          }
        }

        // 임시 텍스트 업데이트
        setInterimText(interimTranscript);

        if (finalTranscript) {
          const newValue = value + finalTranscript;
          if (debugMode) {
            console.log('✅ Final transcript added:', {
              finalTranscript,
              previousValue: value,
              newValue
            });
          }
          onChange(newValue);
          setInterimText(''); // 최종 텍스트가 추가되면 임시 텍스트 초기화
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('❌ Speech recognition error:', event.error, {
          message: event.message,
          type: event.type
        });
        setDebugInfo(prev => ({
          ...prev,
          status: `error: ${event.error}`,
          timestamp: new Date().toLocaleTimeString()
        }));
        onRecordingChange(false);
      };

      recognitionInstance.onend = () => {
        if (debugMode) {
          console.log('🔴 Speech recognition ended');
        }
        setDebugInfo(prev => ({
          ...prev,
          status: 'stopped',
          timestamp: new Date().toLocaleTimeString()
        }));
        onRecordingChange(false);
        setInterimText(''); // 녹음 종료 시 임시 텍스트 초기화
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      if (debugMode) {
        console.warn('⚠️ Speech Recognition API not supported in this browser');
      }
    }
  }, [debugMode, value, onChange, onRecordingChange]);

  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      if (debugMode) {
        console.log('⏹️ Stopping recording...');
      }
      recognition.stop();
      onRecordingChange(false);
    } else {
      if (debugMode) {
        console.log('▶️ Starting recording...');
      }
      recognition.start();
      onRecordingChange(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  return (
    <div className="answer-input">
      <div className="input-header">
        <h3>Your Answer</h3>
        <div className="input-controls">
          {isSupported && (
            <button
              type="button"
              onClick={toggleRecording}
              className={`voice-button ${isRecording ? 'recording' : ''}`}
              title={isRecording ? 'Stop recording' : 'Start voice input'}
            >
              {isRecording ? '🔴' : '🎤'}
              {isRecording ? ' Recording...' : ' Voice Input'}
            </button>
          )}
        </div>
      </div>

      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="answer-textarea"
          rows={6}
        />
        
        {/* 임시 텍스트 표시 */}
        {isRecording && interimText && (
          <div className="interim-text" style={{
            padding: '10px',
            background: '#f0f0f0',
            borderRadius: '4px',
            marginTop: '10px',
            fontStyle: 'italic',
            color: '#666'
          }}>
            📝 인식 중: {interimText}
          </div>
        )}
        
        {isRecording && (
          <div className="recording-indicator">
            <div className="pulse-dot"></div>
            <span>Listening...</span>
          </div>
        )}
      </div>

      {/* 디버그 패널 */}
      {debugMode && (
        <div className="debug-panel" style={{
          marginTop: '15px',
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace',
          border: '1px solid #ddd'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🔍 음성 인식 디버그 정보</h4>
          <div style={{ display: 'grid', gap: '5px' }}>
            <div>상태: <span style={{ 
              color: debugInfo.status === 'listening' ? 'green' : 
                     debugInfo.status.startsWith('error') ? 'red' : 'gray',
              fontWeight: 'bold'
            }}>{debugInfo.status}</span></div>
            <div>마지막 인식 텍스트: "{debugInfo.lastTranscript}"</div>
            <div>신뢰도: {(debugInfo.confidence * 100).toFixed(1)}%</div>
            <div>타임스탬프: {debugInfo.timestamp}</div>
            <div>브라우저 지원: {isSupported ? '✅ 지원됨' : '❌ 지원 안됨'}</div>
            <div>현재 임시 텍스트: "{interimText}"</div>
          </div>
          <div style={{ marginTop: '10px', padding: '10px', background: '#fff', borderRadius: '4px' }}>
            <strong>💡 테스트 방법:</strong>
            <ol style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>F12로 개발자 도구 콘솔 열기</li>
              <li>마이크 버튼 클릭하여 녹음 시작</li>
              <li>말하면서 콘솔과 디버그 패널 확인</li>
              <li>임시 텍스트가 실시간으로 표시되는지 확인</li>
              <li>말을 끝내면 최종 텍스트가 추가되는지 확인</li>
            </ol>
          </div>
        </div>
      )}

      <div className="input-footer">
        <div className="word-count">
          Words: {value.trim().split(/\s+/).filter(word => word.length > 0).length}
        </div>
        <div className="input-hint">
          💡 Tip: Press Ctrl+Enter to submit
        </div>
      </div>
    </div>
  );
};

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default AnswerInput;
