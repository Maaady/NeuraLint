import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import AnalysisResults from '../components/AnalysisResults';
import { CodeAnalysisResult } from '../types';
import { sampleCode } from '../mockData';
import { Code, Play, RefreshCw } from 'lucide-react';
import { analyzeCode } from '../services/api';

const CodeAnalysisPage: React.FC = () => {
  const [code, setCode] = useState(sampleCode.javascript);
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [results, setResults] = useState<CodeAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as 'javascript' | 'python';
    setLanguage(newLanguage);
    setCode(sampleCode[newLanguage]);
    setResults(null);
    setError(null);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setError(null);
  };

  const analyzeCodeHandler = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeCode(code, language);
      setResults(result);
    } catch (err) {
      setError('Failed to analyze code. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI-Powered Code Analysis</h1>
        <p className="mt-2 text-gray-600">
          Submit your code for real-time AI analysis to detect security vulnerabilities, performance issues, and best practices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Code className="h-5 w-5 text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Code Editor</h2>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
              <button
                onClick={analyzeCodeHandler}
                disabled={isAnalyzing}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Analyze Code
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="h-[600px]">
            <CodeEditor
              initialCode={code}
              language={language}
              onCodeChange={handleCodeChange}
            />
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
          </div>
          <AnalysisResults results={results} isLoading={isAnalyzing} />
        </div>
      </div>
    </div>
  );
};

export default CodeAnalysisPage