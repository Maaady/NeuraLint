import React from 'react';
import { CodeAnalysisResult } from '../types';
import { AlertTriangle, AlertCircle, Zap, BookOpen, CheckCircle } from 'lucide-react';

interface AnalysisResultsProps {
  results: CodeAnalysisResult | null;
  isLoading: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-600">Analyzing your code with AI...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <AlertCircle className="h-12 w-12 mb-4" />
        <p>Submit your code to see analysis results</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Analysis Results</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Overall Score:</span>
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${
              results.overallScore >= 80 ? 'bg-green-100 text-green-800' :
              results.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {results.overallScore}/100
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Security Issues */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-red-50 p-3 border-b border-red-100 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <h4 className="font-medium text-red-800">Security Issues ({results.securityIssues.length})</h4>
            </div>
            <div className="p-3 max-h-60 overflow-y-auto">
              {results.securityIssues.length === 0 ? (
                <p className="text-sm text-gray-500">No security issues found</p>
              ) : (
                <ul className="space-y-3">
                  {results.securityIssues.map(issue => (
                    <li key={issue.id} className="text-sm border-l-4 border-red-400 pl-3 py-1">
                      <div className="flex items-start">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mr-2 ${
                          issue.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          issue.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {issue.severity}
                        </span>
                        <div>
                          <p className="font-medium">{issue.type} at line {issue.line}</p>
                          <p className="mt-1">{issue.message}</p>
                          <pre className="mt-1 bg-gray-100 p-2 rounded text-xs overflow-x-auto">{issue.codeSnippet}</pre>
                          <p className="mt-1 text-green-600 font-medium">Suggested fix:</p>
                          <pre className="mt-1 bg-green-50 p-2 rounded text-xs overflow-x-auto">{issue.suggestedFix}</pre>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Performance Issues */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-yellow-50 p-3 border-b border-yellow-100 flex items-center">
              <Zap className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="font-medium text-yellow-800">Performance Issues ({results.performanceIssues.length})</h4>
            </div>
            <div className="p-3 max-h-60 overflow-y-auto">
              {results.performanceIssues.length === 0 ? (
                <p className="text-sm text-gray-500">No performance issues found</p>
              ) : (
                <ul className="space-y-3">
                  {results.performanceIssues.map(issue => (
                    <li key={issue.id} className="text-sm border-l-4 border-yellow-400 pl-3 py-1">
                      <div className="flex items-start">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mr-2 ${
                          issue.impact === 'high' ? 'bg-orange-100 text-orange-800' :
                          issue.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {issue.impact}
                        </span>
                        <div>
                          <p className="font-medium">Line {issue.line}</p>
                          <p className="mt-1">{issue.message}</p>
                          <pre className="mt-1 bg-gray-100 p-2 rounded text-xs overflow-x-auto">{issue.codeSnippet}</pre>
                          <p className="mt-1 text-green-600 font-medium">Suggested fix:</p>
                          <pre className="mt-1 bg-green-50 p-2 rounded text-xs overflow-x-auto">{issue.suggestedFix}</pre>
                          {issue.estimatedImprovement && (
                            <p className="mt-1 text-blue-600 text-xs">Estimated improvement: {issue.estimatedImprovement}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Best Practices */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-3 border-b border-blue-100 flex items-center">
              <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-medium text-blue-800">Best Practices ({results.bestPractices.length})</h4>
            </div>
            <div className="p-3 max-h-60 overflow-y-auto">
              {results.bestPractices.length === 0 ? (
                <p className="text-sm text-gray-500">No best practice suggestions</p>
              ) : (
                <ul className="space-y-3">
                  {results.bestPractices.map(practice => (
                    <li key={practice.id} className="text-sm border-l-4 border-blue-400 pl-3 py-1">
                      <div>
                        <p className="font-medium">Line {practice.line}</p>
                        <p className="mt-1">{practice.message}</p>
                        <pre className="mt-1 bg-gray-100 p-2 rounded text-xs overflow-x-auto">{practice.codeSnippet}</pre>
                        <p className="mt-1 text-green-600 font-medium">Suggested fix:</p>
                        <pre className="mt-1 bg-green-50 p-2 rounded text-xs overflow-x-auto">{practice.suggestedFix}</pre>
                        {practice.reference && (
                          <p className="mt-1 text-xs">
                            <a href={practice.reference} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Learn more
                            </a>
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* General Suggestions */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-indigo-50 p-3 border-b border-indigo-100 flex items-center">
              <CheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
              <h4 className="font-medium text-indigo-800">Suggestions ({results.suggestions.length})</h4>
            </div>
            <div className="p-3 max-h-60 overflow-y-auto">
              {results.suggestions.length === 0 ? (
                <p className="text-sm text-gray-500">No suggestions found</p>
              ) : (
                <ul className="space-y-3">
                  {results.suggestions.map(suggestion => (
                    <li key={suggestion.id} className="text-sm border-l-4 border-indigo-400 pl-3 py-1">
                      <div className="flex items-start">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mr-2 ${
                          suggestion.severity === 'error' ? 'bg-red-100 text-red-800' :
                          suggestion.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {suggestion.severity}
                        </span>
                        <div>
                          <p className="font-medium">Line {suggestion.line}</p>
                          <p className="mt-1">{suggestion.message}</p>
                          <pre className="mt-1 bg-gray-100 p-2 rounded text-xs overflow-x-auto">{suggestion.codeSnippet}</pre>
                          <p className="mt-1 text-green-600 font-medium">Suggested fix:</p>
                          <pre className="mt-1 bg-green-50 p-2 rounded text-xs overflow-x-auto">{suggestion.suggestedFix}</pre>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;