export interface CodeAnalysisResult {
  suggestions: Suggestion[];
  securityIssues: SecurityIssue[];
  performanceIssues: PerformanceIssue[];
  bestPractices: BestPractice[];
  overallScore: number;
}

export interface Suggestion {
  id: string;
  line: number;
  column: number;
  message: string;
  severity: 'info' | 'warning' | 'error';
  codeSnippet: string;
  suggestedFix: string;
}

export interface SecurityIssue {
  id: string;
  type: string;
  line: number;
  column: number;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  codeSnippet: string;
  suggestedFix: string;
  cwe?: string;
  owasp?: string;
}

export interface PerformanceIssue {
  id: string;
  line: number;
  column: number;
  message: string;
  impact: 'low' | 'medium' | 'high';
  codeSnippet: string;
  suggestedFix: string;
  estimatedImprovement?: string;
}

export interface BestPractice {
  id: string;
  line: number;
  column: number;
  message: string;
  codeSnippet: string;
  suggestedFix: string;
  reference?: string;
}

export interface AnalysisRequest {
  code: string;
  language: string;
  projectContext?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'developer' | 'admin';
  avatar: string;
}

export interface AnalysisHistory {
  id: string;
  userId: string;
  timestamp: string;
  codeSnippet: string;
  language: string;
  result: CodeAnalysisResult;
}