import React from 'react';
import { mockAnalysisHistory } from '../mockData';
import { History, Code, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
        <p className="mt-2 text-gray-600">
          View your past code analysis sessions and results.
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {mockAnalysisHistory.map((item) => (
            <li key={item.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      item.language === 'javascript' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <Code className={`h-6 w-6 ${
                        item.language === 'javascript' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-indigo-600">
                        {item.language.charAt(0).toUpperCase() + item.language.slice(1)} Code Analysis
                      </div>
                      <div className="text-sm text-gray-500">
                        Score: <span className={`font-medium ${
                          item.result.overallScore >= 80 ? 'text-green-600' :
                          item.result.overallScore >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>{item.result.overallScore}/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-6 flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <span>
                        {new Date(item.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <Link
                      to={`/history/${item.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <div className="w-full max-w-2xl">
                        <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                          {item.codeSnippet.length > 100
                            ? `${item.codeSnippet.substring(0, 100)}...`
                            : item.codeSnippet}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.result.securityIssues.length > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {item.result.securityIssues.length} Security Issues
                    </span>
                  )}
                  {item.result.performanceIssues.length > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {item.result.performanceIssues.length} Performance Issues
                    </span>
                  )}
                  {item.result.bestPractices.length > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.result.bestPractices.length} Best Practices
                    </span>
                  )}
                  {item.result.suggestions.length > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {item.result.suggestions.length} Suggestions
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryPage;