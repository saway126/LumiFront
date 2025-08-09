export interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  expectedTopics: string[];
  timeLimit: number; // in seconds
  followUpQuestions?: string[];
}

export type QuestionCategory = 
  | 'technical' 
  | 'behavioral' 
  | 'project-experience' 
  | 'problem-solving'
  | 'frontend-specific'
  | 'javascript'
  | 'react'
  | 'css';

export interface InterviewSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  answers: InterviewAnswer[];
  overallScore: number;
}

export interface InterviewAnswer {
  questionId: string;
  answer: string;
  timeSpent: number; // in seconds
  score: number; // 0-100
  feedback: string;
  keyPointsCovered: string[];
  missingPoints: string[];
}

export interface FeedbackCriteria {
  clarity: number;
  technicalAccuracy: number;
  completeness: number;
  communication: number;
  confidence: number;
}
