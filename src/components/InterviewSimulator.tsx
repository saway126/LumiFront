import React, { useState, useCallback } from 'react';
import type { InterviewQuestion, InterviewAnswer, InterviewSession } from '../types/interview';
import { interviewQuestions, getRandomQuestions } from '../data/questions';
import QuestionDisplay from './QuestionDisplay';
import AnswerInput from './AnswerInput';
import ProgressBar from './ProgressBar';
import Timer from './Timer';
import Results from './Results';
import './InterviewSimulator.css';

interface InterviewSimulatorProps {
  questionCount?: number;
  selectedCategories?: string[];
}

const InterviewSimulator: React.FC<InterviewSimulatorProps> = ({
  questionCount = 5,
  selectedCategories = []
}) => {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [debugMode, setDebugMode] = useState(false); // 디버그 모드 상태 추가

  const startInterview = () => {
    let questions: InterviewQuestion[];
    
    if (selectedCategories.length > 0) {
      questions = interviewQuestions.filter(q => 
        selectedCategories.includes(q.category)
      ).slice(0, questionCount);
    } else {
      questions = getRandomQuestions(questionCount);
    }

    const newSession: InterviewSession = {
      id: `interview-${Date.now()}`,
      startTime: new Date(),
      questions,
      currentQuestionIndex: 0,
      answers: [],
      overallScore: 0
    };

    setSession(newSession);
    setTimeSpent(0);
    setIsComplete(false);
  };

  const submitAnswer = async () => {
    if (!session || !currentAnswer.trim()) return;

    const currentQuestion = session.questions[session.currentQuestionIndex];
    
    // Simple scoring algorithm (in real app, this would be more sophisticated)
    const score = calculateScore(currentAnswer, currentQuestion);
    
    const answer: InterviewAnswer = {
      questionId: currentQuestion.id,
      answer: currentAnswer.trim(),
      timeSpent,
      score,
      feedback: generateFeedback(currentAnswer, currentQuestion, score),
      keyPointsCovered: getKeyPointsCovered(currentAnswer, currentQuestion),
      missingPoints: getMissingPoints(currentAnswer, currentQuestion)
    };

    const updatedAnswers = [...session.answers, answer];
    
    if (session.currentQuestionIndex < session.questions.length - 1) {
      // Move to next question
      setSession({
        ...session,
        currentQuestionIndex: session.currentQuestionIndex + 1,
        answers: updatedAnswers
      });
      setCurrentAnswer('');
      setTimeSpent(0);
    } else {
      // Interview complete
      const overallScore = Math.round(
        updatedAnswers.reduce((sum, ans) => sum + ans.score, 0) / updatedAnswers.length
      );
      
      setSession({
        ...session,
        endTime: new Date(),
        answers: updatedAnswers,
        overallScore
      });
      setIsComplete(true);
    }
  };

  const calculateScore = (answer: string, question: InterviewQuestion): number => {
    const words = answer.toLowerCase().split(/\s+/);
    const expectedTopics = question.expectedTopics.map(topic => topic.toLowerCase());
    
    let topicMatches = 0;
    expectedTopics.forEach(topic => {
      const topicWords = topic.split(/\s+/);
      const hasMatch = topicWords.some(word => 
        words.some(answerWord => answerWord.includes(word) || word.includes(answerWord))
      );
      if (hasMatch) topicMatches++;
    });

    const topicScore = (topicMatches / expectedTopics.length) * 60;
    const lengthScore = Math.min((answer.length / 200) * 20, 20);
    const timeBonus = timeSpent < question.timeLimit ? 20 : Math.max(0, 20 - (timeSpent - question.timeLimit) / 10);
    
    return Math.min(100, Math.round(topicScore + lengthScore + timeBonus));
  };

  const generateFeedback = (_answer: string, _question: InterviewQuestion, score: number): string => {
    if (score >= 80) {
      return "Excellent answer! You covered the key topics well and demonstrated good understanding.";
    } else if (score >= 60) {
      return "Good answer! You covered some important points. Consider elaborating on technical details.";
    } else if (score >= 40) {
      return "Decent attempt! Try to include more specific technical concepts and examples.";
    } else {
      return "Your answer needs more depth. Focus on the key technical concepts and provide concrete examples.";
    }
  };

  const getKeyPointsCovered = (answer: string, question: InterviewQuestion): string[] => {
    const words = answer.toLowerCase();
    return question.expectedTopics.filter(topic => 
      words.includes(topic.toLowerCase()) || 
      topic.toLowerCase().split(' ').some(word => words.includes(word))
    );
  };

  const getMissingPoints = (answer: string, question: InterviewQuestion): string[] => {
    const covered = getKeyPointsCovered(answer, question);
    return question.expectedTopics.filter(topic => !covered.includes(topic));
  };

  const handleTimeUpdate = useCallback((time: number) => {
    setTimeSpent(time);
  }, []);

  const resetInterview = () => {
    setSession(null);
    setCurrentAnswer('');
    setTimeSpent(0);
    setIsRecording(false);
    setIsComplete(false);
  };

  if (!session) {
    return (
      <div className="interview-container">
        <div className="welcome-screen">
          <h1>🎙️ Frontend Interview Simulator</h1>
          <p>Practice your technical interview skills with real-world questions</p>
          <button onClick={startInterview} className="start-button">
            Start Interview
          </button>
          
          {/* 디버그 모드 토글 버튼 추가 */}
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={debugMode}
                onChange={(e) => setDebugMode(e.target.checked)}
                style={{ width: '20px', height: '20px' }}
              />
              <span>🔍 음성 인식 디버그 모드 활성화</span>
            </label>
            {debugMode && (
              <div style={{ 
                marginTop: '10px', 
                padding: '10px', 
                background: '#fff3cd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                ⚠️ 디버그 모드가 활성화되면 콘솔에 상세한 로그가 표시됩니다.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return <Results session={session} onRestart={resetInterview} />;
  }

  const currentQuestion = session.questions[session.currentQuestionIndex];

  return (
    <div className="interview-container">
      <div className="interview-header">
        <ProgressBar 
          current={session.currentQuestionIndex + 1} 
          total={session.questions.length} 
        />
        <Timer 
          timeLimit={currentQuestion.timeLimit}
          onTimeUpdate={handleTimeUpdate}
          isActive={!isComplete}
        />
      </div>

      <div className="interview-content">
        <QuestionDisplay 
          question={currentQuestion}
          questionNumber={session.currentQuestionIndex + 1}
          totalQuestions={session.questions.length}
        />
        
        <AnswerInput
          value={currentAnswer}
          onChange={setCurrentAnswer}
          onSubmit={submitAnswer}
          isRecording={isRecording}
          onRecordingChange={setIsRecording}
          placeholder="Type your answer here or use voice input..."
          debugMode={debugMode} // 디버그 모드 전달
        />
      </div>

      <div className="interview-actions">
        <button 
          onClick={submitAnswer}
          disabled={!currentAnswer.trim()}
          className="submit-button"
        >
          {session.currentQuestionIndex < session.questions.length - 1 
            ? 'Next Question' 
            : 'Finish Interview'}
        </button>
        
        {/* 인터뷰 중에도 디버그 모드 토글 가능 */}
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginLeft: 'auto',
          fontSize: '14px'
        }}>
          <input 
            type="checkbox" 
            checked={debugMode}
            onChange={(e) => setDebugMode(e.target.checked)}
          />
          <span>🔍 디버그</span>
        </label>
      </div>
    </div>
  );
};

export default InterviewSimulator;
