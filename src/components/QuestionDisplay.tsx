import React from 'react';
import type { InterviewQuestion } from '../types/interview';

interface QuestionDisplayProps {
  question: InterviewQuestion;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  questionNumber,
  totalQuestions
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#666';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return '⚙️';
      case 'behavioral': return '👥';
      case 'project-experience': return '📁';
      case 'problem-solving': return '🧩';
      case 'frontend-specific': return '🖥️';
      case 'javascript': return '🟨';
      case 'react': return '⚛️';
      case 'css': return '🎨';
      default: return '❓';
    }
  };

  return (
    <div className="question-display">
      <div className="question-header">
        <div className="question-meta">
          <span className="question-number">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="question-tags">
            <span className="category-tag">
              {getCategoryIcon(question.category)} {question.category}
            </span>
            <span 
              className="difficulty-tag"
              style={{ backgroundColor: getDifficultyColor(question.difficulty) }}
            >
              {question.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="question-content">
        <h2 className="question-text">{question.question}</h2>
        
        {question.expectedTopics && question.expectedTopics.length > 0 && (
          <div className="expected-topics">
            <h3>💡 Consider covering these topics:</h3>
            <ul>
              {question.expectedTopics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="question-info">
          <span className="time-limit">
            ⏱️ Suggested time: {Math.floor(question.timeLimit / 60)}:{(question.timeLimit % 60).toString().padStart(2, '0')} minutes
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
