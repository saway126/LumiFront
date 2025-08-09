import React, { useState, useRef, useEffect } from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isRecording: boolean;
  onRecordingChange: (isRecording: boolean) => void;
  placeholder?: string;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  onChange,
  onSubmit,
  isRecording,
  onRecordingChange,
  placeholder = "Type your answer here..."
}) => {
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          onChange(value + finalTranscript);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        onRecordingChange(false);
      };

      recognitionInstance.onend = () => {
        onRecordingChange(false);
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
      onRecordingChange(false);
    } else {
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
        
        {isRecording && (
          <div className="recording-indicator">
            <div className="pulse-dot"></div>
            <span>Listening...</span>
          </div>
        )}
      </div>

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
