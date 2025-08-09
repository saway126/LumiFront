import type { InterviewQuestion } from '../types/interview';

export const interviewQuestions: InterviewQuestion[] = [
  // Technical Questions
  {
    id: 'tech-1',
    category: 'technical',
    difficulty: 'beginner',
    question: "Can you explain what React is and why you would choose it for a frontend project?",
    expectedTopics: ['Component-based architecture', 'Virtual DOM', 'Reusability', 'Performance', 'Ecosystem'],
    timeLimit: 180,
    followUpQuestions: [
      "What are the main differences between React and other frameworks like Vue or Angular?",
      "Can you explain the Virtual DOM concept?"
    ]
  },
  {
    id: 'tech-2',
    category: 'javascript',
    difficulty: 'intermediate',
    question: "Explain the difference between let, const, and var in JavaScript. When would you use each?",
    expectedTopics: ['Block scope', 'Function scope', 'Hoisting', 'Immutability', 'Temporal dead zone'],
    timeLimit: 150,
    followUpQuestions: [
      "What happens when you try to reassign a const variable?",
      "Can you give an example of hoisting with var?"
    ]
  },
  {
    id: 'tech-3',
    category: 'react',
    difficulty: 'intermediate',
    question: "What are React Hooks and how do they differ from class components?",
    expectedTopics: ['useState', 'useEffect', 'Functional components', 'State management', 'Lifecycle methods'],
    timeLimit: 200,
    followUpQuestions: [
      "Can you explain the dependency array in useEffect?",
      "What are some rules of hooks?"
    ]
  },
  {
    id: 'tech-4',
    category: 'css',
    difficulty: 'beginner',
    question: "Explain the CSS box model and how margin, padding, and border work together.",
    expectedTopics: ['Content', 'Padding', 'Border', 'Margin', 'Box-sizing'],
    timeLimit: 120,
    followUpQuestions: [
      "What's the difference between box-sizing: border-box and content-box?",
      "How do margins collapse?"
    ]
  },
  {
    id: 'tech-5',
    category: 'frontend-specific',
    difficulty: 'advanced',
    question: "How would you optimize a React application's performance?",
    expectedTopics: ['React.memo', 'useMemo', 'useCallback', 'Code splitting', 'Lazy loading', 'Bundle optimization'],
    timeLimit: 240,
    followUpQuestions: [
      "When would you use React.memo vs useMemo?",
      "How do you implement code splitting in React?"
    ]
  },

  // Behavioral Questions
  {
    id: 'behav-1',
    category: 'behavioral',
    difficulty: 'beginner',
    question: "Tell me about a challenging frontend project you worked on. What made it challenging and how did you overcome the difficulties?",
    expectedTopics: ['Problem identification', 'Solution approach', 'Team collaboration', 'Learning experience', 'Results'],
    timeLimit: 300,
    followUpQuestions: [
      "What would you do differently if you had to do it again?",
      "How did you communicate the challenges to your team?"
    ]
  },
  {
    id: 'behav-2',
    category: 'behavioral',
    difficulty: 'intermediate',
    question: "Describe a time when you had to learn a new technology quickly for a project. How did you approach it?",
    expectedTopics: ['Learning strategy', 'Resource utilization', 'Time management', 'Application', 'Outcome'],
    timeLimit: 240,
    followUpQuestions: [
      "What resources do you typically use to learn new technologies?",
      "How do you balance learning with project deadlines?"
    ]
  },

  // Project Experience Questions
  {
    id: 'proj-1',
    category: 'project-experience',
    difficulty: 'intermediate',
    question: "Walk me through your process of building a responsive web application from start to finish.",
    expectedTopics: ['Planning', 'Design system', 'Mobile-first approach', 'Testing', 'Deployment', 'Performance'],
    timeLimit: 300,
    followUpQuestions: [
      "How do you ensure cross-browser compatibility?",
      "What tools do you use for responsive design testing?"
    ]
  },
  {
    id: 'proj-2',
    category: 'project-experience',
    difficulty: 'advanced',
    question: "Describe how you would architect a large-scale frontend application with multiple teams working on it.",
    expectedTopics: ['Micro-frontends', 'Component library', 'State management', 'Build system', 'Code standards', 'Team coordination'],
    timeLimit: 360,
    followUpQuestions: [
      "How would you handle shared state between different parts of the application?",
      "What strategies would you use for maintaining code quality across teams?"
    ]
  },

  // Problem Solving Questions
  {
    id: 'prob-1',
    category: 'problem-solving',
    difficulty: 'intermediate',
    question: "You notice that your React application is re-rendering too frequently, causing performance issues. How would you debug and fix this?",
    expectedTopics: ['React DevTools', 'Re-render causes', 'Memoization', 'State structure', 'Performance profiling'],
    timeLimit: 240,
    followUpQuestions: [
      "What tools would you use to identify unnecessary re-renders?",
      "How do you decide between useMemo and useCallback?"
    ]
  },
  {
    id: 'prob-2',
    category: 'problem-solving',
    difficulty: 'advanced',
    question: "A user reports that the application works fine on desktop but breaks on mobile devices. How would you investigate and resolve this issue?",
    expectedTopics: ['Mobile debugging', 'Responsive design', 'Touch events', 'Performance on mobile', 'Browser differences'],
    timeLimit: 200,
    followUpQuestions: [
      "What are some common mobile-specific issues you've encountered?",
      "How do you test on actual mobile devices?"
    ]
  }
];

export const getQuestionsByCategory = (category: string) => {
  return interviewQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: string) => {
  return interviewQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number) => {
  const shuffled = [...interviewQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
