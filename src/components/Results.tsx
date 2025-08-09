import React from 'react';
import type { InterviewSession } from '../types/interview';

interface ResultsProps {
  session: InterviewSession;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ session, onRestart }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const formatDuration = (start: Date, end: Date) => {
    const duration = Math.floor((end.getTime() - start.getTime()) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  const averageTimePerQuestion = session.answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / session.answers.length;

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Interview Complete! 🎉</h1>
        <div className="overall-score">
          <div className="score-circle" style={{ borderColor: getScoreColor(session.overallScore) }}>
            <span className="score-number">{session.overallScore}</span>
            <span className="score-max">/100</span>
          </div>
          <div className="score-grade">
            <span style={{ color: getScoreColor(session.overallScore) }}>
              {getScoreGrade(session.overallScore)}
            </span>
          </div>
        </div>
      </div>

      <div className="results-summary">
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-label">Total Time:</span>
            <span className="stat-value">
              {session.endTime && formatDuration(session.startTime, session.endTime)}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Questions Answered:</span>
            <span className="stat-value">{session.answers.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Average Time per Question:</span>
            <span className="stat-value">{Math.round(averageTimePerQuestion)}s</span>
          </div>
        </div>
      </div>

      <div className="results-breakdown">
        <h2>Question Breakdown</h2>
        {session.answers.map((answer, index) => {
          const question = session.questions.find(q => q.id === answer.questionId);
          if (!question) return null;

          return (
            <div key={answer.questionId} className="question-result">
              <div className="question-result-header">
                <div className="question-info">
                  <span className="question-number">Q{index + 1}</span>
                  <span className="question-category">{question.category}</span>
                  <span className="question-difficulty">{question.difficulty}</span>
                </div>
                <div className="question-score" style={{ color: getScoreColor(answer.score) }}>
                  {answer.score}/100
                </div>
              </div>

              <div className="question-text">
                {question.question}
              </div>

              <div className="answer-analysis">
                <div className="feedback">
                  <h4>Feedback:</h4>
                  <p>{answer.feedback}</p>
                </div>

                {answer.keyPointsCovered.length > 0 && (
                  <div className="covered-points">
                    <h4>✅ Key Points Covered:</h4>
                    <ul>
                      {answer.keyPointsCovered.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {answer.missingPoints.length > 0 && (
                  <div className="missing-points">
                    <h4>❌ Points to Improve:</h4>
                    <ul>
                      {answer.missingPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="answer-stats">
                  <span>Time spent: {answer.timeSpent}s</span>
                  <span>Time limit: {question.timeLimit}s</span>
                  <span>Words: {answer.answer.split(/\s+/).length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="results-recommendations">
        <h2>Recommendations for Improvement</h2>
        <div className="recommendations">
          {session.overallScore < 70 && (
            <div className="recommendation">
              <h3>📚 Study Technical Concepts</h3>
              <p>Focus on understanding core frontend technologies like React, JavaScript ES6+, and CSS fundamentals.</p>
            </div>
          )}
          
          <div className="recommendation">
            <h3>💬 Practice Communication</h3>
            <p>Work on explaining technical concepts clearly and concisely. Practice speaking about your projects and experience.</p>
          </div>

          <div className="recommendation">
            <h3>🏗️ Build Projects</h3>
            <p>Create more portfolio projects to gain hands-on experience with different technologies and frameworks.</p>
          </div>

          <div className="recommendation">
            <h3>⏱️ Time Management</h3>
            <p>Practice answering questions within time limits. Aim for comprehensive but concise responses.</p>
          </div>
        </div>
      </div>

      <div className="results-actions">
        <button onClick={onRestart} className="primary-button">
          Start New Interview
        </button>
        <button 
          onClick={() => window.print()} 
          className="secondary-button"
        >
          Print Results
        </button>
      </div>
    </div>
  );
};

export default Results;
